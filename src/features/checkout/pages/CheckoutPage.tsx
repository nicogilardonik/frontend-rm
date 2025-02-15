import { useState, useEffect } from "react";
import CheckoutButtonZone from "../components/CheckoutButton";
import CheckoutCalendar from "../components/CheckoutCalendar";
import CheckoutDetails from "../components/CheckoutDetails";
import CheckoutForm from "../components/CheckoutForm";
import { getProduct } from "../services/checkoutService";

function CheckoutPage() {
  const disabledDates = [
    new Date(2025, 1, 20),
    new Date(2025, 1, 21),
    new Date(2025, 1, 25),
  ];

  const [email, setEmail] = useState("");
  const [selectedDates, setSelectedDates] = useState<{
    from?: Date;
    to?: Date;
  }>({});
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct("123");
        setProduct(data);
      } catch (error) {
        console.error("Error cargando datos del checkout", error);
      }
    };
    fetchData();
  }, []);

  const handleDateChange = (range: { from?: Date; to?: Date }) => {
    console.log("Fechas seleccionadas en el padre:", range);
    setSelectedDates(range);
  };

  const handleEmailChange = (newEmail: string) => {
    console.log("📧 Email ingresado:", newEmail);
    setEmail(newEmail);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <CheckoutCalendar
          disabledDates={disabledDates}
          onDateChange={handleDateChange}
        />
        <CheckoutForm onEmailChange={handleEmailChange} />
        <CheckoutDetails />
        <CheckoutButtonZone />
      </div>
    </div>
  );
}

export default CheckoutPage;
