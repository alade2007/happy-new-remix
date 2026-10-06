import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { cn } from "@/lib/utils";

const Logo = ({ className, inverted }: { className?: string; inverted?: boolean }) => (
  <Link to="/" aria-label="Travel Scout home" className={cn("inline-flex items-center gap-2 group", className)}>
    <Compass className="h-5 w-5 text-accent transition-transform duration-500 group-hover:rotate-45" aria-hidden />
    <span className={cn("font-sans text-[15px] font-bold tracking-[0.24em]", inverted ? "text-primary-foreground" : "text-primary")}>
      TRAVEL SCOUT
    </span>
  </Link>
);

export default Logo;
