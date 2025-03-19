import React from "react";
import { IProduct } from "../../../shared/interfaces/Product";

interface CheckoutProductInfoProps {
  product: IProduct;
}

const CheckoutProductInfo: React.FC<CheckoutProductInfoProps> = ({
  product,
}) => {
  return (
    <div className="flex items-center bg-white rounded-xl p-6  w-full max-w-xl">
      <img
        src={product.mainImage}
        alt={product.propertyName}
        className="w-14 h-14 rounded-lg object-cover "
      />
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {product.propertyName}
        </h3>
      </div>
    </div>
  );
};

export default CheckoutProductInfo;
