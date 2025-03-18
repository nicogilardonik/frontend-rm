import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../../core/components/Footer";
import Header from "../../../core/components/Header";
import ProductList from "../components/ProductList";
import {
  getProducts,
  getCompanyInfo,
  setCompanyIdHeader,
} from "../services/productListService";
import { IProduct } from "../../../shared/interfaces/Product";
import CircularProgress from "@mui/material/CircularProgress";
import { ICompany } from "../../../shared/interfaces/Company";

function ProductsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("companyId");

  const [products, setProducts] = useState<IProduct[]>([]);
  const [company, setCompany] = useState<ICompany>();
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCompanyIdHeader(companyId!);
    const fetchCompanyInfo = async () => {
      const { success, data, error } = await getCompanyInfo(companyId || "");
      if (success && data) {
        document.documentElement.style.setProperty(
          "--color-primary",
          data.primaryColor || "#1E40AF"
        );
        setCompany(data);
      } else if (error) {
        console.log(error);
        setError(error);
      }
      setLoadingCompany(false);
    };

    const fetchProducts = async () => {
      const { success, data, error } = await getProducts(companyId || "");
      if (success && data) {
        setProducts(data);
      } else if (error) {
        setError(error);
        console.log(error);
      }
      setLoadingProducts(false);
    };

    fetchProducts();
    fetchCompanyInfo();
  }, []);

  const onReserveClick = (productId: string) => {
    navigate(`/checkout?productId=${productId}&companyId=${companyId}`);
  };

  return (
    <div className="h-screen  flex flex-col">
      {company && <Header company={company} />}

      {(loadingProducts || loadingCompany) && (
        <div className="flex flex-col items-center justify-center flex-grow">
          <CircularProgress color="inherit" />
          <p className="mt-4 text-lg font-semibold">⏳ Cargando productos...</p>
        </div>
      )}

      {!loadingProducts && !loadingCompany && error && (
        <div className="flex flex-col items-center justify-center flex-grow text-center ">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </div>
      )}

      {!loadingProducts && !loadingCompany && !error && products.length > 0 && (
        <main className="flex-grow flex items-center justify-center">
          <ProductList products={products} onReserveClick={onReserveClick} />
        </main>
      )}

      {company && <Footer />}
    </div>
  );
}

export default ProductsPage;
