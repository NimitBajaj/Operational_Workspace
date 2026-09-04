import PageHeader from "@/components/common/PageHeader";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import EmptyState from "@/components/common/EmptyState";
import ProductFilters from "../components/ProductFilters";
import ProductCard from "../components/ProductCard";
import Button from "@/components/ui/Button";

import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useState } from "react";
import { fi, id } from "zod/v4/locales";

export default function ProductsPage() {

  const {
    data,
    isLoading,
  } = useProducts();

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const filteredProducts =
    data?.filter((product) =>
        product.name
            .toLowerCase()
            .includes(search.toLowerCase())
    ) ?? [];

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

    <ProductFilters 
        search={search}
        setSearch={setSearch}
        />

<div className="flex justify-between items-center">

    <h2 className="text-lg font-semibold">

        {filteredProducts.length} Products

    </h2>

</div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {filteredProducts.map((product) => (

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