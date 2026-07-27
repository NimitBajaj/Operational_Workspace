import { Bell, Search } from "lucide-react";
import Input from "@/components/ui/Input";

export default function Topbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">

      <div className="w-96">
        <Input
          placeholder="Search products, quotations, customers..."
          leftIcon={<Search size={18} />}
        />
      </div>

      <div className="flex items-center gap-5">

        <button className="relative rounded-xl border border-slate-200 p-3 hover:bg-slate-100 transition">
          <Bell size={20} />
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3">

          <div className="h-11 w-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            A
          </div>

          <div>
            <div className="font-semibold text-slate-900">
              Admin
            </div>

            <div className="text-sm text-slate-500">
              Administrator
            </div>
          </div>

        </div>

      </div>

    </header>
  );
}