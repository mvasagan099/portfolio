import type { HTMLAttributes, ReactNode } from "react";
type Props = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: "div" | "section" | "main";
};
export default function Container({
  as: Tag = "div",
  className = "",
  children,
  ...props
}: Props) {
  return (
    <Tag
      className={`mx-auto w-full max-w-content px-5 sm:px-6 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
