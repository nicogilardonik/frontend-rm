import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const NotFound = lazy(() => import("./core/pages/NotFound"));
const CheckoutPage = lazy(
  () => import("./features/checkout/pages/CheckoutPage")
);
const ProductListPage = lazy(
  () => import("./features/product-list/pages/ProductListPage")
);

function App() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Routes>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/" element={<ProductListPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
