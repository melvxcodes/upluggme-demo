import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";

export function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // If already logged in, go home
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.href = "/";
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) window.location.href = "/";
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    setError(null);
    setStatus(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
  };

  const handleSignup = async () => {
    setError(null);
    setStatus(null);

    const emailRedirectTo = window.location.origin;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo },
    });

    if (error) {
      setError(error.message);
      return;
    }

    setStatus(
      "Account created. Please verify your email (check your inbox). After verification, you’ll be redirected back to the app.",
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    if (mode === "login") await handleLogin();
    else await handleSignup();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-[420px]">
        <Card className="p-6">
          <h1 className="text-xl font-semibold mb-1">
            {mode === "login" ? "Log in" : "Create account"}
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            {mode === "login"
              ? "Welcome back."
              : "Create an account, then verify your email to continue."}
          </p>

          {status && (
            <div className="text-sm mb-3 text-muted-foreground">{status}</div>
          )}
          {error && <div className="text-sm mb-3 text-red-600">{error}</div>}

          <form onSubmit={onSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
            />

            <Button type="submit" className="w-full">
              {mode === "login" ? "Log in" : "Create account"}
            </Button>
          </form>

          <div className="mt-4 text-sm text-muted-foreground">
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <button
                  className="text-primary font-medium"
                  onClick={() => {
                    setError(null);
                    setStatus(null);
                    setMode("signup");
                  }}
                >
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  className="text-primary font-medium"
                  onClick={() => {
                    setError(null);
                    setStatus(null);
                    setMode("login");
                  }}
                >
                  Log in
                </button>
              </>
            )}
          </div>

          <div className="mt-4 text-xs text-muted-foreground">
            Local dev email inbox:{" "}
            <span className="font-medium">http://127.0.0.1:54324</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
