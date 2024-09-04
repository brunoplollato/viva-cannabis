import { ReactNode } from "react";

export default function Subtitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xl text-[#FFFDE7] text-center">
      {children}
    </h2>
  )
}