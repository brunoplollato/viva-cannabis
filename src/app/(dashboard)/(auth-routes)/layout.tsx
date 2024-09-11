import { AuthLayoutWrapper } from "@/components/auth/authLayout";
import { Metadata } from "next";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../globals.css";

export const metadata: Metadata = {
  title: "Viva Cannabis - Login",
  description: "Viva Cannabis Cannabis Medicinal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (<AuthLayoutWrapper>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={false}
      theme="light"
    />
    {children}
  </AuthLayoutWrapper>)
}