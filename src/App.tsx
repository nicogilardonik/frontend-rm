import { Routes, Route } from "react-router-dom";
import CheckoutCalendar from "./features/checkout/components/CheckoutCalendar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CheckoutCalendar />} />
      <Route path="/calendar" element={<CheckoutCalendar />} />
    </Routes>
  );
}

export default App;
