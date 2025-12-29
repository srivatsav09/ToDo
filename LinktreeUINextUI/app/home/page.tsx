"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { isAuthenticated, loading, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

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
    <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10 h-full">
      <div className="w-full max-w-3xl">
        <Card className="glass-card border-none shadow-2xl">
          <CardBody className="gap-6 px-8 py-12">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Welcome {user?.first_name || user?.username}!
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Your beautiful task management companion
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/todos">
                <Card className="glass-morphism border-white/30 hover:border-white/50 transition-all cursor-pointer h-full">
                  <CardBody className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Active Todos
                    </h3>
                    <p className="text-white/70">
                      View and manage your active tasks
                    </p>
                  </CardBody>
                </Card>
              </Link>

              <Link href="/CompletedTodo">
                <Card className="glass-morphism border-white/30 hover:border-white/50 transition-all cursor-pointer h-full">
                  <CardBody className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Completed
                    </h3>
                    <p className="text-white/70">
                      See your accomplished tasks
                    </p>
                  </CardBody>
                </Card>
              </Link>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <Link href="/todos" className="w-full">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold text-lg py-6"
                >
                  Get Started
                </Button>
              </Link>
              <Button
                size="lg"
                onClick={logout}
                className="w-full glass-morphism border-white/30 text-white font-bold"
              >
                Logout
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">📝</div>
                <h4 className="text-lg font-semibold text-white mb-1">
                  Easy to Use
                </h4>
                <p className="text-sm text-white/70">
                  Simple and intuitive interface
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">✨</div>
                <h4 className="text-lg font-semibold text-white mb-1">
                  Beautiful Design
                </h4>
                <p className="text-sm text-white/70">
                  Glass morphic aesthetic
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">🔐</div>
                <h4 className="text-lg font-semibold text-white mb-1">
                  Secure & Private
                </h4>
                <p className="text-sm text-white/70">
                  Your todos are protected
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}