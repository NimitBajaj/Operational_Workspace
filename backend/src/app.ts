import express from "express";
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

const app = express();

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

app.use(errorMiddleware);

export default app;