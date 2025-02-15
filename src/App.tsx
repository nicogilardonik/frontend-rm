import { Routes, Route } from "react-router-dom";
import CheckoutCalendar from "./features/checkout/components/CheckoutCalendar";
import NotFound from "./core/pages/NotFound";

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<CheckoutCalendar />} />
        <Route path="/calendar" element={<CheckoutCalendar />} />
        <Route path="*" element={<NotFound />} />{" "}
      </Routes>
    </div>
  );
}

export default App;
