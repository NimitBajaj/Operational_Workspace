import { useParams } from "react-router-dom";

import PageHeader from "@/components/common/PageHeader";
import SectionCard from "@/components/common/SectionCard";

import { useCustomer } from "../hooks/useCustomer";

export default function CustomerDetailsPage() {

    const { id } = useParams();

    const { data: customer, isLoading } = useCustomer(id!);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!customer) {
        return <div>Customer not found.</div>;
    }

    return (
        <>
            <PageHeader
                title={customer.name}
                subtitle={customer.type}
            />

            <div className="space-y-8">

                <SectionCard title="Basic Information">

                    <div className="grid grid-cols-2 gap-6">

                        <div>
                            <p className="text-sm text-slate-500">Email</p>
                            <p>{customer.email}</p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">Phone</p>
                            <p>{customer.phone}</p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">GST Number</p>
                            <p>{customer.gstNumber ?? "-"}</p>
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">Type</p>
                            <p>{customer.type}</p>
                        </div>

                    </div>

                </SectionCard>

                <SectionCard title="Address">

                    <p>{customer.address}</p>
                    <p>
                        {customer.city}, {customer.state}
                    </p>
                    <p>{customer.pincode}</p>

                </SectionCard>

                <SectionCard title="Notes">

                    <p>
                        {customer.notes || "No notes available."}
                    </p>

                </SectionCard>

                <SectionCard title="Projects">

                    <p className="text-slate-500">
                        Projects will appear here.
                    </p>

                </SectionCard>

            </div>

        </>
    );
}