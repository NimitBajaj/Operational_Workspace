import PageHeader from "@/components/common/PageHeader";
import SectionCard from "@/components/common/SectionCard";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function AddProductPage() {
  return (
    <>

      <PageHeader
        title="Add Product"
        subtitle="Create a new catalogue product."
      />

      <div className="space-y-8">

        <SectionCard title="Basic Information">

          <div className="grid md:grid-cols-2 gap-6">

            <Input
              label="Product Name"
              placeholder="LED Panel Light"
            />

            <Input
              label="Category"
              placeholder="Lighting"
            />

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

            <Input
              label="Base Price"
            />

            <Input
              label="GST %"
            />

            <Input
              label="Discount"
            />

          </div>

        </SectionCard>

        <div className="flex justify-end gap-4">

          <Button variant="secondary">
            Cancel
          </Button>

          <Button>
            Save Product
          </Button>

        </div>

      </div>

    </>
  );
}