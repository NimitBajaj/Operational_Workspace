import Input from "@/components/ui/Input";

import type { UseFormReturn } from "react-hook-form";

import type {
  CustomerFormInput,
  CustomerFormValues,
} from "./schemas/customer.schema";

import { CUSTOMER_TYPES } from "@shared/enums/customer";
import Select from "@/components/ui/Select";

interface Props {
  form: UseFormReturn<
    CustomerFormInput,
    any,
    CustomerFormValues
  >;
}

export default function CustomerBasicInfo({
  form,
}: Props) {

  return (
    <>
      <Input
        label="Customer Name"
        placeholder="ABC Constructions"
        {...form.register("name")}
      />

      <Input
        label="Email"
        placeholder="abc@email.com"
        {...form.register("email")}
      />

      <Input
        label="Phone"
        placeholder="9876543210"
        {...form.register("phone")}
      />

<Select
  label="Customer Type"
  options={CUSTOMER_TYPES.map(type => ({
    value: type,
    label: type,
  }))}
  {...form.register("type")}
/>

      <Input
        label="GST Number"
        placeholder="29ABCDE1234F1Z5"
        {...form.register("gstNumber")}
      />
    </>
  );
}