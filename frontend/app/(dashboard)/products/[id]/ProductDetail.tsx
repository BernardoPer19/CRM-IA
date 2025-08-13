import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductById } from "@/lib/api/productsReq";
import { ProductType } from "@/types/ProductType";

interface ProductDetailProps { id: string }

export async function ProductDetail({ id }: ProductDetailProps) {
  const product: ProductType = await getProductById(id);

  const getStockBadgeColor = (stock: number) => {
    if (stock === 0) return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    if (stock < 5) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  };

  return (
    <Card className="max-w-5xl mx-auto p-6">
      <CardHeader>
        <CardTitle className="text-3xl md:text-4xl font-bold">Detalle del Producto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Imagen + Info principal */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Imagen grande */}
          <div className="flex-shrink-0 w-full md:w-96 h-96 rounded-lg overflow-hidden shadow-lg">
            {product.img ? (
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-xl">
                Sin imagen
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <h2 className="text-4xl font-extrabold">{product.name}</h2>
              <Badge className={getStockBadgeColor(product.stock)} text-sm>
                Stock: {product.stock}
              </Badge>
              <p className="text-2xl font-semibold mt-2">Precio: ${product.price}</p>
              {product.category?.name && (
                <p className="text-lg text-muted-foreground">Categoría: {product.category.name}</p>
              )}
            </div>

            {product.description && (
              <div>
                <h3 className="text-xl font-semibold mb-1">Descripción:</h3>
                <p className="text-base text-muted-foreground">{product.description}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground mt-4">
              <div>
                <p className="font-semibold">Fecha de creación:</p>
                <p>{new Date(product.createdAt).toLocaleDateString("es-ES")}</p>
              </div>
              <div>
                <p className="font-semibold">Última actualización:</p>
                <p>{new Date(product.updatedAt).toLocaleDateString("es-ES")}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
