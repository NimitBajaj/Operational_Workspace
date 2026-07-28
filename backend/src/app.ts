import express from "express";
import path from "path";
import productRoutes from "./modules/product/product.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import customerRoutes from "./modules/customer/customer.routes"
import projectRoutes from "./modules/project/project.routes" 
import productVariantRoutes from "./modules/product-variant/product-variant.routes"
import contactRoutes from "./modules/contact/contact.routes"
import quotationRoutes from "./modules/quotation/quotation.routes"
import paymentRoutes from "./modules/payment/payment.routes"
import projectContactRoutes from "./modules/projectContact/project-contact.routes"
import documentRoutes from "./modules/document/dosument.routes"
import taskRoutes from "./modules/task/task.routes"
import activityRoutes from "./modules/activity/activity.routes"
import noteRoutes from "./modules/note/note.routes"
import productCategoryRoutes from "./modules/product-category/product-category.routes"
import productImageRoutes from "./modules/product-image/product-image.routes"
import userRoutes from "./modules/user/user.routes"
import authRoutes from "./modules/auth/auth.routes"
import catalogueRoutes from "./modules/catalogue/catalogue.routes"
import proposalRequestRoutes from "./modules/proposal-request/proposal-request.routes"
import companySettingsRoutes from "./modules/company-settings/company-settings.routes"
import dashboardRoutes from "./modules/dashboard/dashboard.routes"
import cors from "cors"

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.json());

app.use("/products", productRoutes);
app.use("/customers", customerRoutes);
app.use("/projects", projectRoutes);
app.use("/product-variants", productVariantRoutes);
app.use("/contacts", contactRoutes);
app.use("/quotations", quotationRoutes);
app.use("/payments", paymentRoutes);
app.use("/projects/:projectId/contacts", projectContactRoutes);
app.use("/documents", documentRoutes);
app.use("/tasks", taskRoutes);
app.use("/activities", activityRoutes);
app.use("/notes", noteRoutes);
app.use("/product-categories", productCategoryRoutes);
app.use("/product-images", productImageRoutes);
app.use("/uploads",
    express.static(path.join(process.cwd(), "uploads")));
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/catalogue", catalogueRoutes);
app.use("/proposal-requests", proposalRequestRoutes);
app.use("/company-settings", companySettingsRoutes);
app.use("/dashboard", dashboardRoutes);

app.use(errorMiddleware);

export default app;