import { useEffect, useState } from "react";
import { getProducts } from "../services/productListService";
import { Product } from "../interfaces/Product";
import ProductItem from "./ProductItem";

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-5">
      <h2 className="text-2xl font-bold text-center mb-6">
        Productos Disponibles
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">⏳ Cargando productos...</p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <ProductItem key={product.shopifyId} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
