//import { useEffect, useState } from "react";
//import { getProducts } from "../services/checkoutService";
//import { Product } from "../interfaces/Product";
import { useNavigate } from "react-router-dom";

function ProductListPage() {
  //const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       try {
  //         const data = await getProducts();
  //         setProducts(data);
  //       } catch (error) {
  //         console.error("Error cargando productos:", error);
  //       }
  //     };
  //     fetchProducts();
  //   }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <h2 className="text-lg font-semibold mb-4">📦 Productos Disponibles</h2>
      {/* <ul className="w-full max-w-2xl space-y-4">
        {products.map((product) => (
          <li
            key={product.shopifyId}
            className="p-4 bg-white shadow-md rounded-lg cursor-pointer hover:bg-gray-100 transition"
            onClick={() => navigate(`/checkout/${product.shopifyId}`)} // 🔹 Ir al checkout del producto
          >
            <h3 className="font-bold">{product.propertyName}</h3>
            <p>{product.propertyDescription}</p>
            <p className="text-green-600 font-semibold">
              Precio: {product.currency} {product.price}
            </p>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default ProductListPage;
