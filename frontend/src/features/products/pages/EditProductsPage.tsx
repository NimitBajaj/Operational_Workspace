import { useParams } from "react-router-dom";

import PageHeader from "@/components/common/PageHeader";
import { useForm } from "react-hook-form";
import { type ProductFormValues, productSchema } from "../components/schemas/product.schema";
import ProductForm from "../components/ProductForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ProductFormInput } from "../components/schemas/product.schema";

export default function EditProductPage() {

    const { id } = useParams();
    const form = useForm<ProductFormInput, any, ProductFormValues>({
  resolver: zodResolver(productSchema),
  defaultValues: {
    name: "",
    description: "",
    categoryId: "",
    basePrice: 0,
    gst: 18,
    discount: 0,
  },
});

    function onSubmit(data: ProductFormValues) {
    console.log(data);
}

    return (
        <>
            <PageHeader
                title="Edit Product"
                subtitle={id}
            />

            <ProductForm
        form={form}
        onSubmit={onSubmit}
        submitText="Update Product"
    />
        </>
    );
}