import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/NavBar";

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
