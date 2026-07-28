import Input from "@/components/ui/Input";
import { type UseFormReturn } from "react-hook-form";

import { type ProductFormValues } from "./schemas/product.schema";

interface Props {
  form: UseFormReturn<ProductFormValues>;
}

export default function ProductBasicInfo({
  form,
}: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-6">

      <Input
        label="Product Name"
        placeholder="LED Panel Light"

        value={form.watch("name")}

        onChange={(e) =>
          form.setValue("name", e.target.value)
        }

        error={form.formState.errors.name?.message}
      />

      <Input
        label="Category"
        placeholder="Lighting"

        value={form.watch("categoryId")}

        onChange={(e) =>
          form.setValue("categoryId", e.target.value)
        }

        error={form.formState.errors.categoryId?.message}
      />

    </div>
  );
}