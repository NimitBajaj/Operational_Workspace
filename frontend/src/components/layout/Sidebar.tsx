import { NavLink } from "react-router-dom";
import { navigation } from "@/routes/navigation";

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen border-r border-slate-200 bg-white flex flex-col">

      <div className="h-20 flex items-center px-8 border-b border-slate-100">

        <div>

          <h1 className="text-xl font-bold text-slate-900">
            Lighting CRM
          </h1>

          <p className="text-sm text-slate-500">
            Admin Portal
          </p>

        </div>

      </div>

      <nav className="flex-1 p-4 space-y-2">

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }
                `
              }
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}

      </nav>

      <div className="border-t border-slate-100 p-5">

        <div className="text-sm font-medium">
          Welcome,
        </div>

        <div className="text-slate-500 text-sm">
          Admin
        </div>

      </div>

    </aside>
  );
}