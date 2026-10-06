import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Newsletter form with validation, loading and success states. */
export const NewsletterForm = ({ dark, id }: { dark?: boolean; id?: string }) => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setState("loading");
    setTimeout(() => setState("done"), 700);
  };

  if (state === "done") {
    return (
      <p role="status" className={cn("flex items-center gap-2 text-sm font-medium", dark ? "text-primary-foreground" : "text-foreground")}>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground"><Check className="h-3.5 w-3.5" /></span>
        You're on the list. Look out for our next issue.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={id ?? "nl-email"} className="sr-only">Email address</label>
        <input
          id={id ?? "nl-email"}
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
          placeholder="Your email address"
          aria-invalid={!!error}
          aria-describedby={error ? `${id ?? "nl-email"}-err` : undefined}
          className={cn(
            "min-w-0 flex-1 rounded-full border px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
            dark ? "border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50" : "border-input bg-card text-foreground placeholder:text-muted-foreground",
            error && "border-destructive",
          )}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110 disabled:opacity-70"
        >
          {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
          Subscribe
        </button>
      </div>
      {error && <p id={`${id ?? "nl-email"}-err`} className={cn("mt-2 pl-5 text-xs", dark ? "text-accent" : "text-destructive")}>{error}</p>}
    </form>
  );
};

const Newsletter = ({ image }: { image?: string }) => (
  <section className="container-site py-16 md:py-24" aria-labelledby="nl-heading">
    <div className="relative overflow-hidden rounded-lg bg-primary">
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" loading="lazy" />}
      <div className="relative grid gap-8 px-6 py-14 md:grid-cols-2 md:items-center md:px-14 md:py-20">
        <div>
          <p className="eyebrow mb-3">The Scout Letter</p>
          <h2 id="nl-heading" className="text-3xl font-semibold text-primary-foreground md:text-5xl">Get travel inspiration in your inbox.</h2>
          <p className="mt-4 max-w-md text-primary-foreground/75">Discover new destinations, useful travel tips and unforgettable experiences.</p>
        </div>
        <NewsletterForm dark id="nl-band" />
      </div>
    </div>
  </section>
);

export default Newsletter;
