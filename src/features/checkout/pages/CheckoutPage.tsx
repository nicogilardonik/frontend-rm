import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CheckoutButtonZone from "../components/CheckoutButton";
import CheckoutCalendar from "../components/CheckoutCalendar";
import CheckoutDetails from "../components/CheckoutDetails";
import CheckoutForm from "../components/CheckoutForm";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import { getProduct } from "../services/checkoutService";
import { Product } from "../interfaces/Product";
import { Reservation } from "../interfaces/Reservation";

function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [selectedDates, setSelectedDates] = useState<{
    from?: Date;
    to?: Date;
  }>({});
  const [product, setProduct] = useState<Product | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingReservation, setLoadingReservation] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [dateError, setDateError] = useState("");
  const [productError, setProductError] = useState("");

  useEffect(() => {
    if (
      !productId ||
      !productId.trim() ||
      productId === "undefined" ||
      productId === "null"
    ) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getProduct(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error obteniendo el producto:", error);
        setProductError("No se pudo cargar el producto. Intenta más tarde.");
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchData();
  }, [productId, navigate]);

  const handleDateChange = (range: { from?: Date; to?: Date }) => {
    setSelectedDates(range);

    if (range.from && range.to) {
      setDateError("");
    }
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
    setEmailError("");
  };

  const handleReserveClick = async (totalPrice: number) => {
    let hasError = false;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Ingresa un email válido.");
      hasError = true;
    }

    if (!selectedDates.from || !selectedDates.to) {
      setDateError("Selecciona un rango de fechas válido.");
      hasError = true;
    }

    if (hasError) return;

    setLoadingReservation(true);

    const reservationData: Reservation = {
      productId: productId!,
      from: selectedDates.from.toISOString(),
      to: selectedDates.to.toISOString(),
      email,
      price: totalPrice,
    };

    console.log("📦 Reserva enviada:", reservationData);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("✅ Reserva confirmada 🎉");
    } catch (error) {
      console.error("Error al procesar la reserva:", error);
    } finally {
      setLoadingReservation(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl shadow-xl rounded-xl">
        {loadingProduct && (
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

        {!loadingProduct && product ? (
          <>
            <div className="bg-white p-4">
              <CheckoutCalendar
                disabledDates={[]}
                onDateChange={handleDateChange}
              />
              {dateError && (
                <p className="text-red-500 text-sm font-semibold mt-2">
                  {dateError}
                </p>
              )}
            </div>
            <Divider variant="middle" />
            <div className="bg-white p-4">
              <CheckoutForm onEmailChange={handleEmailChange} />
              {emailError && (
                <p className="text-red-500 text-sm font-semibold mt-2">
                  {emailError}
                </p>
              )}
            </div>
            <Divider variant="middle" />
            <div className="bg-white p-4">
              <CheckoutDetails
                pricePerDay={product.price}
                discountAmount={product.discountAmount}
              />
            </div>
            <Divider variant="middle" />
            <div className="bg-white p-4 flex flex-col items-center">
              <CheckoutButtonZone
                pricePerDay={product.price}
                selectedDates={selectedDates}
                discountAmount={product.discountAmount}
                loading={loadingReservation}
                onReserveClick={handleReserveClick}
              />
            </div>
          </>
        ) : (
          <div className="text-center text-red-500 text-lg font-semibold p-6">
            {productError}
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutPage;
