"use client";

import { useLockedBody } from "@/hooks/useBodyLock";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, useTheme as useNextTheme } from "next-themes";
import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../loading";
import { NavbarWrapper } from "../navbar/navbar";
import { SidebarWrapper } from "../sidebar/sidebar";
import { SidebarContext } from "./layout-context";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const { resolvedTheme } = useNextTheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SessionProvider>
        <SidebarContext.Provider
          value={{
            collapsed: sidebarOpen,
            setCollapsed: handleToggleSidebar,
          }}>
          <section className='flex'>
            <ToastContainer
              position="top-center"
              className={resolvedTheme === "dark" ? "text-white" : "text-black!"}
              autoClose={5000}
              hideProgressBar={false}
              closeOnClick={true}
              pauseOnHover={false}
              draggable={false}
              theme={resolvedTheme}
            />
            <SidebarWrapper />
            <NavbarWrapper>
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
            </NavbarWrapper>
          </section>
        </SidebarContext.Provider>
      </SessionProvider>
    </ThemeProvider>
  );
};
