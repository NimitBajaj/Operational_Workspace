import Button from "@/components/ui/Button";
import SectionCard from "@/components/common/SectionCard";
import Input from "@/components/ui/Input";
import ProductBasicInfo from "./ProductBasicInfo";

import type { UseFormReturn } from "react-hook-form";
import type { ProductFormInput, ProductFormValues } from "./schemas/product.schema";

interface Props {
    form: UseFormReturn<
  ProductFormInput,
  any,
  ProductFormValues
>;
    onSubmit: (data: ProductFormValues) => void;
    submitText: string;
}

export default function ProductForm({
    form,
    onSubmit,
    submitText,
}: Props) {

    return (

        <form onSubmit={form.handleSubmit(onSubmit)}>

            <div className="space-y-8">

                <SectionCard title="Basic Information">

                    <div className="grid md:grid-cols-2 gap-6">

                        <ProductBasicInfo form={form} />

                    </div>

                    <div className="mt-6">

                        <Input
                            label="Description"
                            placeholder="Enter description..."
                        />

                    </div>

                </SectionCard>

                <SectionCard title="Pricing">

                    <div className="grid md:grid-cols-3 gap-6">

                        <Input label="Base Price" />

                        <Input label="GST %" />

                        <Input label="Discount" />

                    </div>

                </SectionCard>

                <div className="flex justify-end gap-4">

                    <Button variant="secondary">
                        Cancel
                    </Button>

                    <Button>
                        {submitText}
                    </Button>

                </div>

            </div>

        </form>

    );
}