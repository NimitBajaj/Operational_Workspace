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
import ProductDetailsPage from "@/features/products/pages/ProductDetailsPage";
import EditProductPage from "@/features/products/pages/EditProductsPage";
import CustomersPage from "@/features/customers/pages/CustomersPage";
import CustomerDetailsPage from "@/features/customers/pages/CustomerDetailsPage";
import AddCustomerPage from "@/features/customers/pages/AddCustomerPage";
import AddProjectPage from "@/features/projects/pages/AddProjectPage";
import ProjectsPage from "@/features/projects/pages/ProjectsPage";

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
    path="/products/:id"
    element={<ProductDetailsPage />}
/>

          <Route
            path= "/products/new"
            element= {<AddProductPage />}
          />

          <Route
    path="/products/:id/edit"
    element={<EditProductPage />}
/>

    <Route
  path="/projects"
  element={<ProjectsPage />}
/>

<Route
    path="/projects/add"
    element={<AddProjectPage />}
/>

          <Route 
          path="/customers"
          element={<CustomersPage />}
          />

          <Route
            path="/customers/:id"
            element={<CustomerDetailsPage />}
            />

          <Route 
            path="/customers/add"
            element={<AddCustomerPage />}
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