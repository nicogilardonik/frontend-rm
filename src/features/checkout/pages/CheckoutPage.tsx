import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CheckoutButtonZone from "../components/CheckoutButton";
import CheckoutCalendar from "../components/CheckoutCalendar";
import CheckoutDetails from "../components/CheckoutDetails";
import CheckoutForm from "../components/CheckoutForm";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
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
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getProduct(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error obteniendo el producto:", error);
        setError("❌ No se pudo cargar el producto. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, navigate]);

  const handleDateChange = (range: { from?: Date; to?: Date }) => {
    setSelectedDates(range);
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl">
        {loading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <div className="flex flex-col items-center">
              <CircularProgress color="inherit" />
              <p className="mt-4 text-lg font-semibold">
                ⏳ Cargando producto...
              </p>
            </div>
          </Backdrop>
        )}
        {!loading && product ? (
          <>
            <div className=" bg-white p-4 rounded-lg shadow-md">
              <CheckoutCalendar
                disabledDates={disabledDates}
                onDateChange={handleDateChange}
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <CheckoutForm onEmailChange={handleEmailChange} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <CheckoutDetails
                pricePerDay={product.price}
                selectedDates={selectedDates}
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              {" "}
              <CheckoutButtonZone />
            </div>
          </>
        ) : null}

        {!loading && !product && (
          <div className="text-center text-red-500 text-lg font-semibold">
            {error ||
              "No se pudo cargar el producto o el producto no existe. Contacte con soporte."}
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutPage;
