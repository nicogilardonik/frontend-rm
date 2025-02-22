import { useNavigate } from "react-router-dom";
import { Product } from "../interfaces/Product";

interface ProductItemProps {
  product: Product;
}

function ProductItem({ product }: ProductItemProps) {
  const navigate = useNavigate();

  const onReserveClick = (productId: number) => {
    navigate(`/checkout?productId=${productId}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 transition-transform transform hover:scale-105 hover:shadow-xl ring-1 ring-gray-200">
      <img
        src={product.mainImage}
        alt={product.propertyName}
        className="w-full sm:w-24 h-24 rounded-lg object-cover border border-gray-200"
      />

      <div className="flex-1 w-full text-center sm:text-left">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {product.propertyName}
        </h3>
        <p className="text-gray-600 text-sm">
          Precio por día:{" "}
          <span className="font-bold text-gray-800">UYU {product.price}</span>
        </p>
      </div>

      <div className="flex-shrink-0 w-full sm:w-auto flex justify-center sm:justify-end">
        <button
          onClick={() => onReserveClick(product.id)}
          className="bg-primary text-white px-4 py-2 rounded-3xl hover:bg-hover"
        >
          Reservar
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
