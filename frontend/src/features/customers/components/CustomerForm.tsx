import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import SectionCard from "@/components/common/SectionCard";

import CustomerBasicInfo from "./CustomerBasicInfo";

import type { UseFormReturn } from "react-hook-form";

import type {
  CustomerFormInput,
  CustomerFormValues,
} from "./schemas/customer.schema";

interface Props {
  form: UseFormReturn<
    CustomerFormInput,
    any,
    CustomerFormValues
  >;

  onSubmit: (data: CustomerFormValues) => void;

  submitText: string;
  isSubmitting?: boolean;
}

export default function CustomerForm({
  form,
  onSubmit,
  submitText,
  isSubmitting 
}: Props) {

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>

      <div className="space-y-8">

        <SectionCard title="Basic Information">

          <div className="grid md:grid-cols-2 gap-6">

            <CustomerBasicInfo form={form} />

          </div>

        </SectionCard>

        <SectionCard title="Address">

          <div className="grid md:grid-cols-2 gap-6">

            <Input
              label="Address"
              {...form.register("address")}
            />

            <Input
              label="City"
              {...form.register("city")}
            />

            <Input
              label="State"
              {...form.register("state")}
            />

            <Input
              label="Pincode"
              {...form.register("pincode")}
            />

          </div>

        </SectionCard>

        <SectionCard title="Notes">

          <Input
            label="Notes"
            placeholder="Additional information..."
            {...form.register("notes")}
          />

        </SectionCard>

        <div className="flex justify-end gap-4">

          <Button
            variant="secondary"
            type="button"
          >
            Cancel
          </Button>

          <Button 
          type="submit"
          disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : submitText}
          </Button>

        </div>

      </div>

    </form>
  );
}