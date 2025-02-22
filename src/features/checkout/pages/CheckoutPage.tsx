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
import { Product } from "../../../shared/interfaces/Product";
import { Reservation } from "../interfaces/Reservation";

function CheckoutPage() {
  const disabledDates: Date[] = [];

  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const companyId = searchParams.get("companyId");
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
    console.log("PRODUCT ID:", productId);
    console.log("COMPANY ID:", companyId);

    if (
      !productId ||
      !productId.trim() ||
      productId === "undefined" ||
      productId === "null"
    ) {
      navigate(companyId ? `/?companyId=${companyId}` : "/");
      return;
    }

    const fetchData = async () => {
      const { success, data, error } = await getProduct(productId);
      if (success && data) {
        setProduct(data);
        setLoadingProduct(false);
      } else if (error) {
        setProductError(error);
        setLoadingProduct(false);
        setTimeout(() => {
          navigate(companyId ? `/?companyId=${companyId}` : "/");
        }, 3500);
      }
    };

    fetchData();
  }, [productId, navigate]);

  const handleDateChange = (range: { from?: Date; to?: Date }) => {
    setSelectedDates(range);
    if (range.from && range.to) setDateError("");
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
    setEmailError("");
  };

  const handleReserveClick = async (totalPrice: number) => {
    let hasError = false;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("❌ Ingresa un email válido.");
      hasError = true;
    }

    if (!selectedDates.from || !selectedDates.to) {
      setDateError("❌ Selecciona un rango de fechas válido.");
      hasError = true;
    }

    if (hasError) return;

    setLoadingReservation(true);

    const reservationData: Reservation = {
      productId: productId!,
      from: selectedDates.from ? selectedDates.from.toISOString() : "",
      to: selectedDates.to?.toISOString() || "",
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Loading Backdrop */}
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

      {/* Si el producto se carga correctamente */}
      {!loadingProduct && product && (
        <div className="w-full max-w-xl shadow-xl rounded-xl bg-white overflow-hidden">
          {/* 📆 Calendario */}
          <div className="p-4">
            <CheckoutCalendar
              disabledDates={disabledDates}
              onDateChange={handleDateChange}
              minNights={product.minNights}
            />
            {dateError && (
              <p className="text-red-500 text-sm font-semibold mt-2">
                {dateError}
              </p>
            )}
          </div>
          <Divider variant="middle" />

          {/* 📧 Formulario de Email */}
          <div className="p-4">
            <CheckoutForm onEmailChange={handleEmailChange} />
            {emailError && (
              <p className="text-red-500 text-sm font-semibold mt-2">
                {emailError}
              </p>
            )}
          </div>
          <Divider variant="middle" />

          {/* 🏷️ Detalles del Pago */}
          <div className="p-4">
            <CheckoutDetails
              pricePerDay={product.price}
              discountAmount={product.discountAmount}
            />
          </div>
          <Divider variant="middle" />

          {/* ✅ Botón de Reserva */}
          <div className="p-4 flex flex-col items-center">
            <CheckoutButtonZone
              pricePerDay={product.price}
              selectedDates={selectedDates}
              discountAmount={product.discountAmount}
              loading={loadingReservation}
              onReserveClick={handleReserveClick}
            />
          </div>
        </div>
      )}

      {/* Si hay un error al cargar el producto */}
      {!loadingProduct && productError && (
        <div className="w-full max-w-xl shadow-xl rounded-xl bg-white overflow-hidden">
          <div className="text-center text-red-500 text-lg font-semibold p-6">
            {productError}
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
