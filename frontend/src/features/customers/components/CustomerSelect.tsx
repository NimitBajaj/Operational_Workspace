import Select from "@/components/ui/Select";
import { useCustomers } from "../hooks/useCustomers";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CustomerSelect({
  value,
  onChange,
}: Props) {
  const { data, isLoading } = useCustomers();

  if (isLoading) {
    return (
      <Select
      label="-"
        value=""
        options={[
          {
            value: "",
            label: "Loading customers...",
          },
        ]}
      />
    );
  }

  return (
    <Select
        label="Customer"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={[
        {
          value: "",
          label: "Select Customer",
        },
        ...(data ?? []).map((customer) => ({
          value: customer.id,
          label: customer.name,
        })),
      ]}
    />
  );
}