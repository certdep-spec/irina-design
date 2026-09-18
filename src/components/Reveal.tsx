import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section";
}

/**
 * Lightweight content wrapper.
 *
 * Reveal animations used to depend on framer-motion on nearly every public page.
 * Keeping the wrapper static makes prerendered content immediately paintable and
 * avoids loading an animation runtime for non-essential decoration.
 */
export function Reveal({ children, className, as = "div" }: RevealProps) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}
