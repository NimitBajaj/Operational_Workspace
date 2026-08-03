import { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import CustomerCard from "../components/CustomerCard";
import { useCustomers } from "../hooks/useCustomers";

export default function CustomersPage() {

    const navigate = useNavigate();

    const { data: customers = [], isLoading } = useCustomers();

    const [search, setSearch] = useState("");

    const filteredCustomers = customers.filter(customer => {

        const term = search.toLowerCase();

        return (
            customer.name.toLowerCase().includes(term) ||
            customer.email.toLowerCase().includes(term) ||
            customer.phone.includes(search) ||
            customer.city?.toLowerCase().includes(term)
        );

    });

    if (isLoading) {
        return <div>Loading customers...</div>;
    }

    return (
        <>

            <PageHeader
                title="Customers"
                subtitle="Manage all your customers."
            />

            <div className="space-y-8">

                <div className="flex justify-between gap-4">

                    <Input
                        placeholder="Search customers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <Button
                        onClick={() => navigate("/customers/add")}
                    >
                        <Plus size={18} />

                        Add Customer
                    </Button>

                </div>

                {filteredCustomers.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">

                        <h2 className="text-xl font-semibold">
                            No customers found
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Create your first customer to get started.
                        </p>

                    </div>

                ) : (

                    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">

                        {filteredCustomers.map(customer => (

                            <CustomerCard
                                key={customer.id}
                                customer={customer}
                            />

                        ))}

                    </div>

                )}

            </div>

        </>
    );
}