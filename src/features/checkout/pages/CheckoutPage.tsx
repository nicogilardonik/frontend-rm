import { useState, useEffect } from "react";
import CheckoutButtonZone from "../components/CheckoutButton";
import CheckoutCalendar from "../components/CheckoutCalendar";
import CheckoutDetails from "../components/CheckoutDetails";
import CheckoutForm from "../components/CheckoutForm";
import { getProduct } from "../services/checkoutService";
import { Product } from "../interfaces/Product";

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
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct("123");
        setProduct(data);
      } catch (error) {
        console.error("Error cargando datos del checkout", error);
      } finally {
        setLoading(false);
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
        {loading ? (
          <div className="text-center text-gray-600 text-lg font-semibold">
            ⏳ Cargando producto...
          </div>
        ) : product ? (
          <>
            <CheckoutCalendar
              disabledDates={disabledDates}
              onDateChange={handleDateChange}
            />
            <CheckoutForm onEmailChange={handleEmailChange} />
            <CheckoutDetails
              pricePerDay={product.price}
              selectedDates={selectedDates}
            />
            <CheckoutButtonZone />
          </>
        ) : (
          <div className="text-center text-red-500 text-lg font-semibold">
            No se pudo cargar el producto o el producto no existe. Contacte con
            soporte.
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutPage;
