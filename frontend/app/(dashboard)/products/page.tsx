import { getProducts } from "@/lib/api/productsReq";
import HeaderProducts from "@/components/dashboard/products/HeaderProducts";
import StatsCardsProducts from "@/components/dashboard/products/StatsCardsProducts";
import ProductsClient from "@/components/dashboard/products/ProductsClient";
export default async function ProductsPage() {

  const products = await getProducts();

  return (
    <div className="p-6 space-y-6">
      <HeaderProducts />
      <StatsCardsProducts products={products} />
      <ProductsClient products={products} />
    </div>
  );
}
