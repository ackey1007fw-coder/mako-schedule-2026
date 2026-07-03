import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

type ExternalButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "soft" | "ghost";
  className?: string;
};

const variants = {
  primary: "mako-button-primary",
  secondary: "mako-button-secondary",
  soft: "mako-button-soft",
  ghost: "mako-button-ghost",
};

export function ExternalButton({ href, children, variant = "soft", className = "" }: ExternalButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`mako-button min-h-12 px-4 py-3 text-sm ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
    </a>
  );
}
