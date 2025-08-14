// app/products/[id]/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductDetail } from "./ProductDetail";
import { cookies } from "next/headers";
import { getProductById } from "@/lib/api/productsReq";

interface ProductPageProps {
  params: { id: string };
}

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) throw new Error("No autorizado: Token no encontrado");

  const product = await getProductById(params.id, accessToken);
  console.log(product);
  
  return (
    <div className="container mx-auto py-8 space-y-4">
      <Link
        href="/products"
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a productos
      </Link>

      {/* ⚠ Pasamos el objeto completo */}
      <ProductDetail product={product} />
    </div>
  );
}
