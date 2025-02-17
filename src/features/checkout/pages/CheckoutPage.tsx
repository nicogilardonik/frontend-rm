import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId || isNaN(Number(productId))) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getProduct(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error obteniendo el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, navigate]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getProduct("123");
  //       setProduct(data);
  //     } catch (error) {
  //       console.error("Error cargando datos del checkout", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

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
          <div className="flex flex-col items-center text-gray-600 text-lg font-semibold">
            <svg
              className="animate-spin h-6 w-6 text-gray-500"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V4a8 8 0 100 16v-2a8 8 0 01-8-8z"
              ></path>
            </svg>
            <p>⏳ Cargando producto...</p>
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
