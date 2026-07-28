import PageHeader from "@/components/common/PageHeader";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import EmptyState from "@/components/common/EmptyState";
import ProductFilters from "../components/ProductFilters";
import ProductCard from "../components/ProductCard";
import Button from "@/components/ui/Button";

import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

export default function ProductsPage() {

  const {
    data,
    isLoading,
  } = useProducts();

  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>


      <PageHeader
        title="Products"
        subtitle="Manage your Product Catalogue."
        action={
          <Button
    onClick={() => navigate("/products/new")}
>
    + Add Product
</Button>
        }
      />

      {data?.length === 0 ? (

        <EmptyState
          title="No Products"
          description="Create your first product."
        />

      ) : (

        <div className="space-y-6">

    <ProductFilters />

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {data?.map((product) => (

            <ProductCard
                key={product.id}
                product={product}
            />

        ))}

    </div>

</div>

      )}

    </>
  );
}