import express from "express";
import productRoutes from "./modules/product/product.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import customerRoutes from "./modules/customer/customer.routes"

const app = express();

app.use(express.json());

app.use("/products", productRoutes);
app.use("/customers", customerRoutes);



app.use(errorMiddleware);

export default app;