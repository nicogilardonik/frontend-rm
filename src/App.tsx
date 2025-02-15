import { Routes, Route } from "react-router-dom";

import NotFound from "./core/pages/NotFound";
import CheckoutPage from "./features/checkout/pages/CheckoutPage";

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Routes>
        {/* <Route path="/" element={<CheckoutCalendar />} /> */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFound />} />{" "}
      </Routes>
    </div>
  );
}

export default App;
