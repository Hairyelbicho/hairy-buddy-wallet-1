import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  mode: "login" | "register";
  className?: string;
}

const AuthForm = ({ mode, className }: AuthFormProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, name });
    
    // Redirect to wallet page instead of home
    navigate("/wallet");
  };

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </CardTitle>
        <CardDescription className="text-center">
          {mode === "login"
            ? "Sign in to your Hairy Wallet account"
            : "Join the Hairy Wallet community today"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {mode === "login" && (
                <a
                  href="#"
                  className="text-xs text-hairy-primary hover:underline"
                >
                  Forgot password?
                </a>
              )}
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button type="submit" className="w-full bg-hairy-primary hover:bg-hairy-secondary">
            {mode === "login" ? "Sign In" : "Sign Up"}
          </Button>
          <div className="mt-4 text-center text-sm">
            {mode === "login" ? (
              <p>
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-hairy-primary hover:underline"
                >
                  Sign up
                </a>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-hairy-primary hover:underline"
                >
                  Sign in
                </a>
              </p>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AuthForm;
