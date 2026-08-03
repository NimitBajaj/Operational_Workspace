import { useParams } from "react-router-dom";

import PageHeader from "@/components/common/PageHeader";
import SectionCard from "@/components/common/SectionCard";
import { useProduct } from "../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { useDeleteProduct } from "../hooks/useDeleteProduct";

export default function ProductDetailsPage() {
  const { id } = useParams();
const {data: product, isLoading} = useProduct(id!);
const navigate = useNavigate();
const deleteMutation = useDeleteProduct();

function handleDelete() {
  if(!confirm("Delete this product?")) return;

  deleteMutation.mutate(product.id, {
    onSuccess: () => {
      navigate("/products");
    },
  });
}

if (isLoading) {
  return <div>Loading...</div>;
}

if (!product) {
  return <div>Product not found.</div>;
}
  return (
    <>
      <PageHeader
        title={product.name}
        subtitle={product.category?.name ?? "No Category"
        }
        
      />
      <Button
    onClick={() => navigate(`/products/${product.id}/edit`)}
>
    Edit Product
</Button>

<Button
  variant="danger"
  onClick={handleDelete}
>
  Delete
</Button>

      <div className="space-y-8">

        <SectionCard title="Basic Information">
          <div className="grid grid-cols-2 gap-6">

    <div>
        <p className="text-sm text-slate-500">Name</p>
        <p className="font-medium">{product.name}</p>
    </div>

    <div>
        <p className="text-sm text-slate-500">Category</p>
        <p className="font-medium">
            {product.category?.name}
        </p>
    </div>

    <div>
        <p className="text-sm text-slate-500">Warranty</p>
        <p className="font-medium">
            {product.warranty ?? "-"}
        </p>
    </div>

    <div>
        <p className="text-sm text-slate-500">Status</p>
        <p className="font-medium">
            {product.active ? "Active" : "Inactive"}
        </p>
    </div>

</div>
        </SectionCard>

        <SectionCard title="Description">
          <p className="text-slate-700">
    {product.description || "No description available."}
</p>
        </SectionCard>

        <SectionCard title="Variants">
          <p className="text-slate-500">
    Variants will appear here.
</p>
        </SectionCard>

        <SectionCard title="Images">
          <p className="text-slate-500">
    Images will appear here.
</p>
        </SectionCard>

      </div>
    </>
  );
}