import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";

const emailSchema = z.string().trim().email("Enter a valid email address").max(255);
const passwordSchema = z.string().min(8, "Use at least 8 characters").max(72);
const safeNext = (value: string | null) => (value && value.startsWith("/") && !value.startsWith("//") ? value : "/planner");

export default function Auth() {
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (user) navigate(next, { replace: true }); }, [user, next, navigate]);
  useEffect(() => { sessionStorage.setItem("auth-next", next); }, [next]);

  const run = async (fn: () => Promise<string | void>) => {
    setError(null); setNotice(null); setBusy(true);
    try { const msg = await fn(); if (msg) setNotice(msg); }
    catch (e) { setError(e instanceof z.ZodError ? e.errors[0].message : e instanceof Error ? e.message : "Something went wrong"); }
    finally { setBusy(false); }
  };
  const redirect = `${window.location.origin}/auth?next=${encodeURIComponent(next)}`;

  const signIn = (e: FormEvent) => { e.preventDefault(); run(async () => {
    const { error } = await supabase.auth.signInWithPassword({ email: emailSchema.parse(email), password });
    if (error) throw error;
  }); };
  const signUp = (e: FormEvent) => { e.preventDefault(); run(async () => {
    const { error } = await supabase.auth.signUp({ email: emailSchema.parse(email), password: passwordSchema.parse(password), options: { emailRedirectTo: redirect, data: { full_name: name.trim().slice(0, 100) } } });
    if (error) throw error;
    return "Check your inbox to confirm your email, then sign in.";
  }); };
  const magic = (e: FormEvent) => { e.preventDefault(); run(async () => {
    const { error } = await supabase.auth.signInWithOtp({ email: emailSchema.parse(email), options: { emailRedirectTo: redirect } });
    if (error) throw error;
    return "We've emailed you a sign-in link.";
  }); };
  const google = () => run(async () => {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" });
    if (result.error) throw result.error;
  });

  const emailField = <div className="space-y-1.5"><Label htmlFor="auth-email">Email</Label><Input id="auth-email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>;

  return <Layout seo={{ title: "Sign in — Travel Scout Planner", description: "Sign in to save and edit your Travel Scout trip itineraries.", noindex: true }}>
    <div className="container-site flex justify-center py-16">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-card">
        <h1 className="text-3xl font-semibold">Save your trips</h1>
        <p className="mt-2 text-sm text-muted-foreground">Sign in to plan, reorder and save itineraries. Only you can see your trips.</p>
        <Button variant="outline" className="mt-6 w-full" onClick={google} disabled={busy}>Continue with Google</Button>
        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
        <Tabs defaultValue="signin">
          <TabsList className="grid w-full grid-cols-3"><TabsTrigger value="signin">Sign in</TabsTrigger><TabsTrigger value="signup">Sign up</TabsTrigger><TabsTrigger value="magic">Email link</TabsTrigger></TabsList>
          <TabsContent value="signin"><form onSubmit={signIn} className="space-y-4 pt-3">{emailField}<div className="space-y-1.5"><Label htmlFor="auth-pw">Password</Label><Input id="auth-pw" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required /></div><Button type="submit" variant="travel" className="w-full" disabled={busy}>Sign in</Button></form></TabsContent>
          <TabsContent value="signup"><form onSubmit={signUp} className="space-y-4 pt-3"><div className="space-y-1.5"><Label htmlFor="auth-name">Full name</Label><Input id="auth-name" autoComplete="name" value={name} onChange={e => setName(e.target.value)} /></div>{emailField}<div className="space-y-1.5"><Label htmlFor="auth-pw2">Password</Label><Input id="auth-pw2" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} required /></div><Button type="submit" variant="travel" className="w-full" disabled={busy}>Create account</Button></form></TabsContent>
          <TabsContent value="magic"><form onSubmit={magic} className="space-y-4 pt-3">{emailField}<Button type="submit" variant="travel" className="w-full" disabled={busy}>Email me a sign-in link</Button></form></TabsContent>
        </Tabs>
        {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
        {notice && <p role="status" className="mt-4 text-sm text-muted-foreground">{notice}</p>}
      </div>
    </div>
  </Layout>;
}
