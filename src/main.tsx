import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// Graceful image fallback: any <img> that fails to load swaps to the placeholder.
const FALLBACK = "/placeholder.svg";
document.addEventListener(
  "error",
  (e) => {
    const t = e.target;
    if (t instanceof HTMLImageElement && !t.src.endsWith(FALLBACK)) {
      t.srcset = "";
      t.src = FALLBACK;
    }
  },
  true,
);

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
