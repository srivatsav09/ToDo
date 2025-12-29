"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.password2) {
      setError("Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      await register(formData);
    } catch (err: any) {
      let errorMessage = "Registration failed. Please try again.";
      try {
        const errorData = JSON.parse(err.message);
        if (errorData.username) {
          errorMessage = `Username: ${errorData.username[0]}`;
        } else if (errorData.email) {
          errorMessage = `Email: ${errorData.email[0]}`;
        } else if (errorData.password) {
          errorMessage = `Password: ${errorData.password[0]}`;
        }
      } catch {
        errorMessage = err.message || errorMessage;
      }
      setError(errorMessage);
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
              Create Account
            </h1>
            <p className="text-white/80 text-center">
              Join us to get started
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
                name="username"
                label="Username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                classNames={{
                  input: "text-white placeholder:text-white/60",
                  inputWrapper: "glass-morphism border-white/30",
                  label: "text-white/90",
                }}
                required
              />

              <Input
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                classNames={{
                  input: "text-white placeholder:text-white/60",
                  inputWrapper: "glass-morphism border-white/30",
                  label: "text-white/90",
                }}
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  name="first_name"
                  label="First Name"
                  placeholder="First name"
                  value={formData.first_name}
                  onChange={handleChange}
                  classNames={{
                    input: "text-white placeholder:text-white/60",
                    inputWrapper: "glass-morphism border-white/30",
                    label: "text-white/90",
                  }}
                />

                <Input
                  name="last_name"
                  label="Last Name"
                  placeholder="Last name"
                  value={formData.last_name}
                  onChange={handleChange}
                  classNames={{
                    input: "text-white placeholder:text-white/60",
                    inputWrapper: "glass-morphism border-white/30",
                    label: "text-white/90",
                  }}
                />
              </div>

              <Input
                name="password"
                type="password"
                label="Password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                classNames={{
                  input: "text-white placeholder:text-white/60",
                  inputWrapper: "glass-morphism border-white/30",
                  label: "text-white/90",
                }}
                required
              />

              <Input
                name="password2"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.password2}
                onChange={handleChange}
                classNames={{
                  input: "text-white placeholder:text-white/60",
                  inputWrapper: "glass-morphism border-white/30",
                  label: "text-white/90",
                }}
                required
              />

              <Button
                type="submit"
                size="lg"
                isLoading={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold mt-2"
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>

              <div className="text-center mt-4">
                <p className="text-white/70">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-white font-semibold hover:underline"
                  >
                    Sign in here
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