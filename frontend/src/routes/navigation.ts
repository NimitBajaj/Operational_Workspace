import {
  LayoutDashboard,
  Package,
  FolderKanban,
  Users,
  ClipboardList,
  FileText,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Products",
    icon: Package,
    path: "/products",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },
  {
    title: "Customers",
    icon: Users,
    path: "/customers",
  },
  {
    title: "Proposal Requests",
    icon: ClipboardList,
    path: "/proposal-requests",
  },
  {
    title: "Quotations",
    icon: FileText,
    path: "/quotations",
  },
  {
    title: "Payments",
    icon: CreditCard,
    path: "/payments",
  },
  {
    title: "Reports",
    icon: BarChart3,
    path: "/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];