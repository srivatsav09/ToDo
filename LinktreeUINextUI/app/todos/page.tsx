"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Chip } from "@nextui-org/chip";
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

export default function TodosPage() {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [category, setCategory] = useState("Personal");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortBy, setSortBy] = useState("date");
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

  const addTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue,
      description: description,
      completed: false,
      priority: priority,
      category: category,
      createdAt: Date.now(),
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
    setDescription("");
    setPriority("medium");
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? Date.now() : undefined } : todo
      )
    );
  };

  const updatePriority = (id: string, newPriority: "low" | "medium" | "high") => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, priority: newPriority } : todo
      )
    );
  };

  const categories = ["All", "Personal", "Work", "Shopping", "Health", "Other"];
  const priorities = ["All", "low", "medium", "high"];

  let filteredTodos = todos.filter((todo) => !todo.completed);

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
          <h1 className="text-5xl font-bold text-white mb-2">My Todos</h1>
          <p className="text-white/70 text-lg">Welcome back, {user?.first_name || user?.username}!</p>
        </div>

        {/* Create New Todo Card */}
        <Card className="glass-card border-none shadow-2xl mb-6">
          <CardHeader className="px-6 pt-6">
            <h2 className="text-2xl font-bold text-white">Create New Task</h2>
          </CardHeader>
          <CardBody className="gap-4 px-6 pb-6">
            <Input
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) addTodo();
              }}
              classNames={{
                input: "text-white placeholder:text-white/60 text-lg",
                inputWrapper: "glass-morphism border-white/30 h-14",
              }}
              size="lg"
            />

            <Input
              placeholder="Add description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              classNames={{
                input: "text-white placeholder:text-white/60",
                inputWrapper: "glass-morphism border-white/30",
              }}
            />

            <div className="flex gap-3 flex-wrap">
              <Dropdown>
                <DropdownTrigger>
                  <Button className="glass-morphism border-white/30 text-white">
                    Priority: {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu onAction={(key: any) => setPriority(key as "low" | "medium" | "high")}>
                  <DropdownItem key="low">Low</DropdownItem>
                  <DropdownItem key="medium">Medium</DropdownItem>
                  <DropdownItem key="high">High</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown>
                <DropdownTrigger>
                  <Button className="glass-morphism border-white/30 text-white">
                    Category: {category}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu onAction={(key: any) => setCategory(key as string)}>
                  {categories.filter(c => c !== "All").map((cat) => (
                    <DropdownItem key={cat}>{cat}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              <Button
                onClick={addTodo}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold ml-auto"
                size="lg"
              >
                Add Task
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Filters & Search */}
        <Card className="glass-card border-none shadow-xl mb-6">
          <CardBody className="px-6 py-4">
            <div className="flex gap-3 flex-wrap items-center">
              <Input
                placeholder="Search tasks..."
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
                    Sort: {sortBy === "date" ? "Date" : "Priority"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu onAction={(key: any) => setSortBy(key as string)}>
                  <DropdownItem key="date">Date</DropdownItem>
                  <DropdownItem key="priority">Priority</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Chip className="glass-morphism text-white border-white/30 ml-auto">
                {filteredTodos.length} Tasks
              </Chip>
            </div>
          </CardBody>
        </Card>

        {/* Tasks List */}
        <div className="flex flex-col gap-3">
          {filteredTodos.length === 0 ? (
            <Card className="glass-card border-none shadow-xl">
              <CardBody className="p-12 text-center">
                <p className="text-white/60 text-lg">No tasks found. Create one to get started!</p>
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
                        <div className={`h-1 w-12 rounded-full ${getPriorityColor(todo.priority)}`} />
                        <h3 className="text-white text-xl font-semibold">{todo.text}</h3>
                      </div>

                      {todo.description && (
                        <p className="text-white/70 mb-3 ml-15">{todo.description}</p>
                      )}

                      <div className="flex gap-2 flex-wrap ml-15">
                        <Chip size="sm" className={getCategoryColor(todo.category)} variant="bordered">
                          {todo.category}
                        </Chip>
                        <Chip size="sm" className="glass-morphism text-white/80 border-white/20">
                          {new Date(todo.createdAt).toLocaleDateString()}
                        </Chip>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button size="sm" className="glass-morphism border-white/30 text-white min-w-24">
                            Priority
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu onAction={(key: any) => updatePriority(todo.id, key as "low" | "medium" | "high")}>
                          <DropdownItem key="low">Low</DropdownItem>
                          <DropdownItem key="medium">Medium</DropdownItem>
                          <DropdownItem key="high">High</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>

                      <Button
                        size="sm"
                        onClick={() => toggleComplete(todo.id)}
                        className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold"
                      >
                        Complete
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