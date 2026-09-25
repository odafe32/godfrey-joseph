import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Loader2 } from "lucide-react";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

interface PillButtonProps {
  /** Omit to render a <button> (e.g. form submit) instead of a link. */
  href?: string;
  variant?: "solid" | "outline" | "outlineInk" | "gold";
  /** Show the circular arrow chip on the right. */
  arrow?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const variants = {
  solid:
    "bg-[#f8f5ef] text-[#1a1a1a] focus-visible:outline-white",
  outline:
    "border border-white/70 text-white hover:bg-white hover:text-[#1a1a1a] focus-visible:outline-white",
  outlineInk:
    "border border-gray-300 text-gray-900 hover:bg-gray-900 hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-[#1a1a1a] focus-visible:outline-gray-900",
  gold:
    "bg-gradient-to-r from-[#d4a017] to-[#b8860b] text-white focus-visible:outline-[#9a6f00]",
} as const;

const chipVariants = {
  solid: "bg-[#d4a017] text-[#1a1a1a]",
  outline: "bg-white/10 text-current",
  outlineInk: "bg-[#3d5a8c] text-white",
  gold: "bg-white text-[#d4a017]",
} as const;

export default function PillButton({
  href,
  variant = "solid",
  arrow = false,
  size = "md",
  className = "",
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
}: PillButtonProps) {
  const sm = size === "sm";
  const lg = size === "lg";
  const classes = `group inline-flex items-center justify-center gap-3 rounded-full ${
    sm ? "text-xs" : lg ? "text-base" : "text-sm"
  } font-semibold font-display uppercase tracking-wider transition-colors ${focusRing} ${variants[variant]} ${
    arrow
      ? sm
        ? "py-1.5 pl-5 pr-1.5"
        : lg
          ? "py-2.5 pl-8 pr-2.5"
          : "py-2 pl-6 pr-2"
      : sm
        ? "px-5 py-2.5"
        : lg
          ? "px-8 py-4"
          : "px-6 py-3"
  } ${className} ${loading ? "opacity-70 cursor-not-allowed" : ""}`;

  const inner = (
    <>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!loading && children}
      {arrow && !loading && (
        <span
          className={`grid ${sm ? "h-7 w-7" : "h-9 w-9"} place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${chipVariants[variant]}`}
        >
          <ArrowUpRight className={sm ? "h-3 w-3" : "h-4 w-4"} />
        </span>
      )}
    </>
  );

  if (!href) {
    return (
      <button type={type} onClick={onClick} disabled={disabled} className={`${classes} disabled:opacity-60`}>
        {inner}
      </button>
    );
  }

  // Internal paths navigate via the router; hash-only/external stay anchors
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={classes}>
        {inner}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
    </a>
  );
}
