import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/common/StatusBadge";

interface Props {
    product: any;
}

export default function ProductCard({
    product,
}: Props) {
    return (
        <Card className="overflow-hidden hover:-translate-y-1 transition-all duration-300">

            <div className="aspect-square bg-slate-100 flex items-center justify-center">

                {product.imageUrl ? (

                    <img
                        src={product.imageUrl}
                        className="h-full w-full object-cover"
                    />

                ) : (

                    <span className="text-slate-400">
                        No Image
                    </span>

                )}

            </div>

            <div className="p-5">

    <div className="flex justify-between">

        <div>

            <h3 className="font-semibold text-lg">
                {product.name}
            </h3>

            <p className="text-slate-500 mt-1">
                {product.category?.name ?? "No Category"}
            </p>

        </div>

        <StatusBadge
            status="Active"
        />

    </div>

    <div className="mt-6 flex justify-between items-end">

        <div>

            <p className="text-slate-400 text-sm">
                Starting From
            </p>

            <h2 className="text-2xl font-bold text-blue-600">
                ₹{Number(product.basePrice).toLocaleString()}
            </h2>

        </div>

        <Button
            variant="secondary"
        >
            Edit
        </Button>

    </div>

</div>
        </Card>
    );
}