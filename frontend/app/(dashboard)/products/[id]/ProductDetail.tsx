import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductById } from "@/lib/api/productsReq";
import { ProductType } from "@/types/ProductType";

interface ProductDetailProps { id: string }

export async function ProductDetail({ id }: ProductDetailProps) {
  const product: ProductType = await getProductById(id);

  const getStockBadgeColor = (stock: number) => {
    if (stock === 0) return "bg-red-100 text-red-800";
    if (stock < 5) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <Card>
      <CardHeader><CardTitle>Detalle del Producto</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <Badge className={getStockBadgeColor(product.stock)}>
            Stock: {product.stock}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <p className="text-lg font-semibold">Precio: ${product.price}</p>
        {product.categoryId && <p className="text-sm">Categoría: {product.categoryId}</p>}
      </CardContent>
    </Card>
  );
}
