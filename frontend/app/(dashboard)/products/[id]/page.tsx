import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductDetail } from "./ProductDetail";
import { getProducts } from "@/lib/api/productsReq";
import { ProductType } from "@/types/ProductType";

// Genera rutas estáticas para build-time
export async function generateStaticParams(): Promise<{ id: string }[]> {
  const products: ProductType[] = await getProducts();
  return products.map(p => ({ id: p.id.toString() }));
}

interface ProductPageProps { params: Promise<{ id: string }> }

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto py-8 space-y-4">
      <Link
        href="/products"
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a productos
      </Link>

      <ProductDetail id={id} />
    </div>
  );
}