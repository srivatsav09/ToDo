"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10 h-full">
      <div className="w-full max-w-md">
        <Card className="glass-card border-none shadow-2xl">
          <CardHeader className="flex flex-col gap-3 px-6 pt-6">
            <h1 className="text-4xl font-bold text-white text-center">
              Welcome Back
            </h1>
            <p className="text-white/80 text-center">
              Sign in to your account
            </p>
          </CardHeader>
          <CardBody className="gap-4 px-6 pb-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              <Input
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                classNames={{
                  input: "text-white placeholder:text-white/60",
                  inputWrapper: "glass-morphism border-white/30",
                  label: "text-white/90",
                }}
                required
                size="lg"
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                classNames={{
                  input: "text-white placeholder:text-white/60",
                  inputWrapper: "glass-morphism border-white/30",
                  label: "text-white/90",
                }}
                required
                size="lg"
              />

              <Button
                type="submit"
                size="lg"
                isLoading={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold mt-2"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="text-center mt-4">
                <p className="text-white/70">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-white font-semibold hover:underline"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}