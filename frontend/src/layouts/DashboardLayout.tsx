import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/ui/NavBar";

export const DashboardLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};
