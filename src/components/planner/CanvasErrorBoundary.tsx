import { Component, type ReactNode } from "react";
import { RefreshCw } from "lucide-react";

const LOG_KEY = "scout-canvas-errors";

/** Traps reorder/sync crashes in the planner canvas; reset clears the local error log and rebuilds the canvas. */
export default class CanvasErrorBoundary extends Component<{ children: ReactNode; onReset: () => void }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error) {
    try {
      const log = JSON.parse(sessionStorage.getItem(LOG_KEY) ?? "[]") as unknown[];
      sessionStorage.setItem(LOG_KEY, JSON.stringify([...log.slice(-9), { at: new Date().toISOString(), message: error.message }]));
    } catch { /* storage unavailable */ }
    console.error("[Canvas]", error);
  }
  reset = () => { sessionStorage.removeItem(LOG_KEY); this.props.onReset(); this.setState({ error: null }); };
  render() {
    if (!this.state.error) return this.props.children;
    return <div className="flex flex-1 items-center justify-center p-8">
      <button onClick={this.reset} role="alert" className="flex max-w-md flex-col items-center gap-3 rounded-lg border border-border bg-card p-8 text-center shadow-card transition-colors hover:border-travel-brand">
        <RefreshCw className="h-6 w-6 text-travel-brand" />
        <span className="font-semibold">Unable to sync route layout.</span>
        <span className="text-sm text-muted-foreground">Click here to reload the map canvas safely.</span>
      </button>
    </div>;
  }
}
