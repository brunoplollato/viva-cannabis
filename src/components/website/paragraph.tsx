import { ReactNode } from "react";

export default function Paragraph({ children, className }: { children: ReactNode, className: string }) {
  return (
    <h2 className={`text-base text-[#FFFDE7] text-center ${className}`}>
      {children}
    </h2>
  )
}