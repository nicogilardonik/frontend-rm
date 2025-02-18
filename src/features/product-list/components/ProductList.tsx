import { Product } from "../../../shared/interfaces/Product";
import ProductItem from "./ProductItem";

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        Productos Disponibles
      </h2>
      <div className="space-y-2">
        {products.map((product: Product) => (
          <ProductItem key={product.shopifyId} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
