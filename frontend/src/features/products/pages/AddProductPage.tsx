import PageHeader from "@/components/common/PageHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import ProductForm from "../components/ProductForm";
import { productSchema, type ProductFormValues } from "../components/schemas/product.schema";
import { type ProductFormInput } from "../components/schemas/product.schema";


export default function AddProductPage() {
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
        title="Add Product"
        subtitle="Create a new catalogue product."
      />

      <ProductForm
        form={form}
        onSubmit={onSubmit}
        submitText="Save Product"
    />
</>
  );
}