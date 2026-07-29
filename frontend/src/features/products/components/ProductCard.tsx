import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/common/StatusBadge";
import type { Product } from "../types/product";
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product;
}



export default function ProductCard({
  product,
}: Props) {
  const navigate = useNavigate();
  return (
    <Card 
    onClick={() => navigate(`/products/${product.id}`)}
    className="overflow-hidden hover:-translate-y-1 transition-all duration-300">

      <div className="aspect-square bg-slate-100 flex items-center justify-center">

        <span className="text-slate-400 text-sm">
          No Image
        </span>

      </div>

      <div className="p-5">

        <div className="flex justify-between items-start">

          <div>

            <h3 className="font-semibold text-lg">
              {product.name}
            </h3>

            <p className="text-slate-500 mt-1">
              {product.category.name}
            </p>

          </div>

          <StatusBadge
            status={product.active ? "Active" : "Inactive"}
          />

        </div>

        <p className="mt-4 text-sm text-slate-600 line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="mt-6 flex justify-between items-center">

          <div className="space-y-1">

            <p className="text-sm text-slate-500">
              Warranty
            </p>

            <p className="font-medium">
              {product.warranty ?? "N/A"}
            </p>

          </div>

          <div className="flex items-center gap-2">

            {product.featured && (
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                Featured
              </span>
            )}

            <Button 
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                }}>
              Edit
            </Button>

          </div>

        </div>

      </div>

    </Card>
  );
}