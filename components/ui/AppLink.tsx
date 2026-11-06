import Link from "next/link";
import type { ComponentProps } from "react";
type Props = ComponentProps<typeof Link> & { external?: boolean };
export default function AppLink({
  href,
  external = false,
  children,
  ...props
}: Props) {
  return (
    <Link
      href={href}
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}
