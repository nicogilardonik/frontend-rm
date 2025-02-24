import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../../../core/components/Footer";
import Header from "../../../core/components/Header";
import ProductList from "../components/ProductList";
import { getProducts } from "../services/productListService";
import { IProduct } from "../../../shared/interfaces/Product";
import CircularProgress from "@mui/material/CircularProgress";

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("companyId");

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { success, data, error } = await getProducts(companyId);
      if (success && data) {
        setProducts(data);
        setLoadingProducts(false);
      } else if (error) {
        setLoadingProducts(false);
        setError(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <Header />

      {loadingProducts && (
        <div className="flex flex-col items-center justify-center flex-grow">
          <CircularProgress color="inherit" />
          <p className="mt-4 text-lg font-semibold">⏳ Cargando productos...</p>
        </div>
      )}

      {!loadingProducts && error && (
        <div className="flex flex-col items-center justify-center flex-grow text-center">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </div>
      )}

      {!loadingProducts && !error && products.length > 0 && (
        <main className="flex-grow flex items-center justify-center">
          <ProductList products={products} />
        </main>
      )}

      <Footer />
    </div>
  );
}

export default ProductsPage;
