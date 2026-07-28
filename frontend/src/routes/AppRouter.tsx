import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import DashboardPage from "@/pages/DashboardPage";
import ProductsPage from "@/features/products/pages/ProductsPage";
import AddProductPage from "@/features/products/pages/AddProductPage";

function Placeholder({ title }: { title: string }) {
  return (
    <div className="text-3xl font-bold text-slate-700">
      {title}
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AppLayout />}>

          <Route index element={<DashboardPage />} />

          <Route
            path="/products"
            element={<ProductsPage />}
          />

          <Route
            path= "/products/new"
            element= {<AddProductPage />}
          />
          
          <Route
            path="/projects"
            element={<Placeholder title="Projects" />}
          />

          <Route
            path="/customers"
            element={<Placeholder title="Customers" />}
          />

          <Route
            path="/proposal-requests"
            element={<Placeholder title="Proposal Requests" />}
          />

          <Route
            path="/quotations"
            element={<Placeholder title="Quotations" />}
          />

          <Route
            path="/payments"
            element={<Placeholder title="Payments" />}
          />

          <Route
            path="/reports"
            element={<Placeholder title="Reports" />}
          />

          <Route
            path="/settings"
            element={<Placeholder title="Settings" />}
          />

        </Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}