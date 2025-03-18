import { IProduct } from "../../../shared/interfaces/Product";
import ProductItem from "./ProductItem";

interface ProductListProps {
  products: IProduct[];
  onReserveClick: (productId: string) => void;
}

function ProductList({ products, onReserveClick }: ProductListProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-4 self-start">
      <h2 className="text-2xl font-bold text-center mb-4">
        Productos Disponibles
      </h2>
      <div className="space-y-2">
        {products.map((product: IProduct) => (
          <ProductItem
            key={product.shopifyId}
            product={product}
            onReserveClick={onReserveClick}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
