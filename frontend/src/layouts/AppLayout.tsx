import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function AppLayout() {
  return (
    <div className="h-screen bg-slate-100 flex">

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        <Topbar />

        <main className="flex-1 overflow-y-auto p-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
}