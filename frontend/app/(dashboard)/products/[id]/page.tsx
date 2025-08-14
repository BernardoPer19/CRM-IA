// app/products/[id]/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductDetail } from "./ProductDetail";
import { cookies } from "next/headers";
import { getProductById } from "@/lib/api/productsReq";
import { ProductDatum } from "@/types/ProductType";

// ⚠ params como Promise para cumplir PageProps de Next 15
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// Forzar SSR dinámico
export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: ProductPageProps) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return (
        <div className="text-center py-20 text-red-500">
          No autorizado: Token no encontrado
        </div>
      );
    }

    // ✅ resolver el Promise de params
    const { id } = await params;

    const product: ProductDatum | null = await getProductById(id, accessToken);

    if (!product) {
      return (
        <div className="text-center py-20 text-gray-500">
          Producto no encontrado
        </div>
      );
    }

    return (
      <div className="container mx-auto py-8 space-y-4">
        <Link
          href="/products"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a productos
        </Link>

        <ProductDetail product={product} />
      </div>
    );
  } catch (error) {
    console.error("❌ Error en ProductDetailPage:", error);
    return (
      <div className="text-center py-20 text-red-500">
        Ocurrió un error al cargar el producto
      </div>
    );
  }
}
