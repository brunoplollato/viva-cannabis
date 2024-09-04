import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)]">
      <Spinner label="Carregando..." color="success" size="lg" />
    </div>
  )
}