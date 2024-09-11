import { Layout } from "@/components/layout/layout";
import { Metadata } from "next";
import "../../../globals.css";

export const metadata: Metadata = {
  title: "Viva Cannabis - Dashboard",
  description: "Viva Cannabis Cannabis Medicinal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      {children}
    </Layout>
  );
}
