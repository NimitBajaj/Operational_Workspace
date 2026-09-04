import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PageHeader from "@/components/common/PageHeader";

import CustomerForm from "../components/CustomerForm";
import { useNavigate } from "react-router-dom";
import { useCreateCustomer } from "../hooks/useCreateCustomer";

import {
  customerSchema,
  type CustomerFormInput,
  type CustomerFormValues,
} from "../components/schemas/customer.schema";

export default function AddCustomerPage() {

  const form = useForm<
    CustomerFormInput,
    any,
    CustomerFormValues
  >({
    resolver: zodResolver(customerSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      type: "ARCHITECT",
      gstNumber: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      notes: "",
    },
  });

  const navigate = useNavigate();
  const createCustomerMutation = useCreateCustomer();

  function onSubmit(data: CustomerFormValues) {
     createCustomerMutation.mutate(data, {

    onSuccess: () => {

      navigate("/customers");
  },
});
  }

  return (
    <>
      <PageHeader
        title="Add Customer"
        subtitle="Create a new customer."
      />

      <CustomerForm
        form={form}
        onSubmit={onSubmit}
        submitText="Save Customer"
        isSubmitting={createCustomerMutation.isPending}
      />
    </>
  );
}