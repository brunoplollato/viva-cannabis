import { AuthLayoutWrapper } from "@/components/auth/authLayout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../globals.css";

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