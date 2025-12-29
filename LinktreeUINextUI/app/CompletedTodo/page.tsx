"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Input } from "@nextui-org/input";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface Todo {
  id: string;
  text: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: string;
  createdAt: number;
  completedAt?: number;
  dueDate?: string;
}

export default function CompletedTodosPage() {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortBy, setSortBy] = useState("completed");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const restoreTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: false, completedAt: undefined } : todo
      )
    );
  };

  const clearCompleted = () => {
    if (window.confirm("Are you sure you want to permanently delete all completed tasks?")) {
      setTodos(todos.filter((todo) => !todo.completed));
    }
  };

  const categories = ["All", "Personal", "Work", "Shopping", "Health", "Other"];
  const priorities = ["All", "low", "medium", "high"];

  let filteredTodos = todos.filter((todo) => todo.completed);

  if (filterCategory !== "All") {
    filteredTodos = filteredTodos.filter((todo) => todo.category === filterCategory);
  }

  if (filterPriority !== "All") {
    filteredTodos = filteredTodos.filter((todo) => todo.priority === filterPriority);
  }

  if (searchQuery) {
    filteredTodos = filteredTodos.filter((todo) =>
      todo.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (sortBy === "priority") {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    filteredTodos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  } else if (sortBy === "completed") {
    filteredTodos.sort((a, b) => (b.completedAt || b.createdAt) - (a.completedAt || a.createdAt));
  } else {
    filteredTodos.sort((a, b) => b.createdAt - a.createdAt);
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-gradient-to-r from-red-500 to-orange-500";
      case "medium": return "bg-gradient-to-r from-yellow-500 to-orange-500";
      case "low": return "bg-gradient-to-r from-blue-500 to-cyan-500";
      default: return "bg-gray-500";
    }
  };

  const getCategoryColor = (cat: string) => {
    const colors: { [key: string]: string } = {
      Personal: "bg-purple-500/20 text-purple-200 border-purple-400/30",
      Work: "bg-blue-500/20 text-blue-200 border-blue-400/30",
      Shopping: "bg-green-500/20 text-green-200 border-green-400/30",
      Health: "bg-red-500/20 text-red-200 border-red-400/30",
      Other: "bg-gray-500/20 text-gray-200 border-gray-400/30",
    };
    return colors[cat] || colors.Other;
  };

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center h-full">
        <div className="text-white text-xl">Loading...</div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className="flex flex-col items-center justify-start gap-6 py-4 md:py-6 min-h-screen">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-white mb-2">Completed Tasks</h1>
          <p className="text-white/70 text-lg">Your accomplished achievements</p>
        </div>

        {/* Filters & Search */}
        <Card className="glass-card border-none shadow-xl mb-6">
          <CardBody className="px-6 py-4">
            <div className="flex gap-3 flex-wrap items-center">
              <Input
                placeholder="Search completed tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                classNames={{
                  input: "text-white placeholder:text-white/60",
                  inputWrapper: "glass-morphism border-white/30",
                }}
                className="max-w-xs"
              />

              <Dropdown>
                <DropdownTrigger>
                  <Button className="glass-morphism border-white/30 text-white" size="sm">
                    Category: {filterCategory}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu onAction={(key: any) => setFilterCategory(key as string)}>
                  {categories.map((cat) => (
                    <DropdownItem key={cat}>{cat}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              <Dropdown>
                <DropdownTrigger>
                  <Button className="glass-morphism border-white/30 text-white" size="sm">
                    Priority: {filterPriority}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu onAction={(key: any) => setFilterPriority(key as string)}>
                  {priorities.map((p) => (
                    <DropdownItem key={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              <Dropdown>
                <DropdownTrigger>
                  <Button className="glass-morphism border-white/30 text-white" size="sm">
                    Sort: {sortBy === "completed" ? "Completion Date" : sortBy === "priority" ? "Priority" : "Created Date"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu onAction={(key: any) => setSortBy(key as string)}>
                  <DropdownItem key="completed">Completion Date</DropdownItem>
                  <DropdownItem key="priority">Priority</DropdownItem>
                  <DropdownItem key="date">Created Date</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <div className="ml-auto flex gap-3 items-center">
                <Chip className="glass-morphism text-white border-white/30">
                  {filteredTodos.length} Tasks
                </Chip>
                {filteredTodos.length > 0 && (
                  <Button
                    size="sm"
                    onClick={clearCompleted}
                    className="bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Completed Tasks List */}
        <div className="flex flex-col gap-3">
          {filteredTodos.length === 0 ? (
            <Card className="glass-card border-none shadow-xl">
              <CardBody className="p-12 text-center">
                <p className="text-white/60 text-lg">No completed tasks found. Complete some tasks to see them here!</p>
              </CardBody>
            </Card>
          ) : (
            filteredTodos.map((todo) => (
              <Card
                key={todo.id}
                className="glass-morphism border-white/30 hover:border-white/50 transition-all"
              >
                <CardBody className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`h-1 w-12 rounded-full ${getPriorityColor(todo.priority)} opacity-60`} />
                        <h3 className="text-white/70 text-xl font-semibold line-through">{todo.text}</h3>
                      </div>

                      {todo.description && (
                        <p className="text-white/50 mb-3 ml-15 line-through">{todo.description}</p>
                      )}

                      <div className="flex gap-2 flex-wrap ml-15">
                        <Chip size="sm" className={getCategoryColor(todo.category)} variant="bordered">
                          {todo.category}
                        </Chip>
                        <Chip size="sm" className="glass-morphism text-white/60 border-white/20">
                          Created: {new Date(todo.createdAt).toLocaleDateString()}
                        </Chip>
                        {todo.completedAt && (
                          <Chip size="sm" className="glass-morphism text-green-300/80 border-green-400/30">
                            Completed: {new Date(todo.completedAt).toLocaleDateString()}
                          </Chip>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => restoreTodo(todo.id)}
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold"
                      >
                        Restore
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
                        className="bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
