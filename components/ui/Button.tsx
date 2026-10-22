"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "icon";

type CommonProps = {
  variant?: Variant;
  children?: ReactNode;
  arrow?: boolean;
  className?: string;
  external?: boolean;
};

type ButtonLinkProps = CommonProps & {
  href: string;
};

type NativeButtonProps = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
};

export type ButtonProps = ButtonLinkProps | NativeButtonProps;

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-background hover:bg-accentStrong px-5 py-2.5 text-sm",
  secondary:
    "border border-border text-foreground hover:border-accent/60 hover:text-accent px-5 py-2.5 text-sm",
  ghost: "text-muted hover:text-accent px-3 py-2 text-sm",
  icon: "h-10 w-10 items-center justify-center rounded-md border border-border text-muted hover:border-accent/50 hover:text-accent",
};

function ArrowMark() {
  return (
    <svg
      className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children, arrow, external } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if (props.href !== undefined) {
    return (
      <Link
        href={props.href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {arrow && <ArrowMark />}
      </Link>
    );
  }

  const { type = "button", onClick } = props as NativeButtonProps & { type?: "button" | "submit" };
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
      {arrow && <ArrowMark />}
    </button>
  );
}
