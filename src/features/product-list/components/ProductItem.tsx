import { useNavigate } from "react-router-dom";
import { Product } from "../interfaces/Product";

interface ProductItemProps {
  product: Product;
}

function ProductItem({ product }: ProductItemProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 shadow-lg rounded-lg p-2 flex items-center space-x-4">
      <img
        src={product.mainImage}
        alt={product.propertyName}
        className="w-24 h-24 rounded-md object-cover"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{product.propertyName}</h3>
        <p className="text-gray-600">
          Precio por día: <span className="font-bold">UYU {product.price}</span>
        </p>
      </div>

      {/* <button
        className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 transition"
        onClick={() => navigate(`/checkout?productId=${product.shopifyId}`)}
      >
        Reservar
      </button> */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<book-button productId="${product.id}"></book-button>`,
        }}
      />
    </div>
  );
}

export default ProductItem;
