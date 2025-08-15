import { getProducts } from "@/lib/api/productsReq";
import HeaderProducts from "@/components/dashboard/products/HeaderProducts";
import StatsCardsProducts from "@/components/dashboard/products/StatsCardsProducts";
import ProductsClient from "@/components/dashboard/products/ProductsClient";
import { cookies } from "next/headers";
export default async function ProductsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    throw new Error("No token found. Please log in.");
  }

  const products = await getProducts(accessToken);

  return (
    <div className="p-6 space-y-6">
      <HeaderProducts />
      <StatsCardsProducts products={products} />
      <ProductsClient products={products} />
    </div>
  );
}
