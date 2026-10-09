import { Component, type ReactNode } from "react";

interface State { error: Error | null }

export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    if (import.meta.env.DEV) console.error("[ErrorBoundary]", error);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div role="alert" className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="text-3xl font-semibold md:text-4xl">We hit a bump in the road.</h1>
        <p className="max-w-md text-muted-foreground">Please try again — if the problem continues, head back to the home page.</p>
        <div className="flex gap-3">
          <button onClick={() => window.location.reload()} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-accent">Try again</button>
          <a href="/" className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-accent">Home</a>
        </div>
      </div>
    );
  }
}
