import { ReactNode } from "react";

export default function Title({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[64px] text-[#1B5E20] font-bold text-center">
      {children}
    </h2>
  )
}