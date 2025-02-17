import { Routes, Route } from "react-router-dom";
import NotFound from "./core/pages/NotFound";
import CheckoutPage from "./features/checkout/pages/CheckoutPage";
import ProductListPage from "./features/product-list/pages/ProductListPage";

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* //TODO: ver lazy loading */}
      <Routes>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/" element={<ProductListPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
