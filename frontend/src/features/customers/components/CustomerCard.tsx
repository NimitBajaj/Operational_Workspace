import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Building2,
} from "lucide-react";

import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/common/StatusBadge";

import type { Customer } from "../types/customer";

interface Props {
  customer: Customer;
}

export default function CustomerCard({
  customer,
}: Props) {

  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/customers/${customer.id}`)}
      className="p-6 cursor-pointer hover:-translate-y-1 transition-all duration-300"
    >

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-semibold">
            {customer.name}
          </h2>

          <div className="mt-2">
            <StatusBadge status={customer.type} />
          </div>

        </div>

        <Button
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          View
        </Button>

      </div>

      <div className="mt-6 space-y-3 text-slate-600">

        <div className="flex items-center gap-3">

          <Mail size={18} />

          {customer.email}

        </div>

        <div className="flex items-center gap-3">

          <Phone size={18} />

          {customer.phone}

        </div>

        <div className="flex items-center gap-3">

          <MapPin size={18} />

          {customer.city}, {customer.state}

        </div>

        <div className="flex items-center gap-3">

          <Building2 size={18} />

          {customer.gstNumber ? "GST Registered" : "No GST"}

        </div>

      </div>

    </Card>
  );
}