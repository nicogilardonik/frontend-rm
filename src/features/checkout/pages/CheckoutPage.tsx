import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CheckoutButtonZone from "../components/CheckoutButton";
import CheckoutCalendar from "../components/CheckoutCalendar";
import CheckoutDetails from "../components/CheckoutDetails";
import CheckoutForm from "../components/CheckoutForm";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import {
  createReservationMP,
  createReservationRM,
  getCompanyInfo,
  getProduct,
  setCompanyIdHeader,
} from "../services/checkoutService";
import { IProduct } from "../../../shared/interfaces/Product";
import { ReservationRM } from "../interfaces/ReservationRM";
import { ReservationMP } from "../interfaces/ReservationMP";
import Header from "../../../core/components/Header";
import CheckoutProductInfo from "../components/CheckoutProductInfo";

function CheckoutPage() {
  const disabledDates: Date[] = [];

  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const companyId = searchParams.get("companyId");
  const navigate = useNavigate();

  const [company, setCompany] = useState<ICompany>();
  const [email, setEmail] = useState("");
  const [selectedDates, setSelectedDates] = useState<{
    from?: Date;
    to?: Date;
  }>({});
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingReservation, setLoadingReservation] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [dateError, setDateError] = useState("");
  const [productError, setError] = useState("");

  useEffect(() => {
    const validateParams = () => {
      if (
        !companyId ||
        companyId.trim() === "" ||
        companyId === "undefined" ||
        companyId === "null"
      ) {
        setError("❌ Compañía inválida.");
        setLoadingProduct(false);
        return false;
      }

      if (
        !productId ||
        productId.trim() === "" ||
        productId === "undefined" ||
        productId === "null"
      ) {
        navigate(`/?companyId=${companyId}`);
        return false;
      }

      return true;
    };

    const fetchCompanyAndProduct = async () => {
      setLoadingProduct(true);

      const {
        success: companySuccess,
        data: companyData,
        error: companyError,
      } = await getCompanyInfo(companyId!);

      if (!companySuccess || !companyData) {
        setError(companyError || "❌ Compañía inválida.");
        setLoadingProduct(false);
        return;
      }
      document.documentElement.style.setProperty(
        "--color-primary",
        companyData.primaryColor || "#1E40AF"
      );
      setCompany(companyData);

      const {
        success: productSuccess,
        data: productData,
        error: productError,
      } = await getProduct(productId!);

      if (productSuccess && productData) {
        setProduct(productData);
        setCompanyIdHeader(companyId!);
      } else {
        setError(productError || "❌ Error al cargar el producto.");
        setTimeout(() => navigate(`/?companyId=${companyId}`), 3500);
      }

      setLoadingProduct(false);
    };

    if (validateParams()) {
      setCompanyIdHeader(companyId!);
      fetchCompanyAndProduct();
    }
  }, [productId, companyId, navigate]);

  const handleDateChange = (range: { from?: Date; to?: Date }) => {
    setSelectedDates(range);
    if (range.from && range.to) setDateError("");
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
    setEmailError("");
  };

  const validations = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("❌ Ingresa un email válido.");
      return true;
    }

    if (!selectedDates.from || !selectedDates.to) {
      setDateError("❌ Selecciona un rango de fechas válido.");
      return true;
    }
  };

  const convertToUTC = (date?: Date) => {
    if (!date) return "";
    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    ).toISOString();
  };

  const handleReserveClick = async (totalPrice: number) => {
    if (validations()) {
      return;
    }
    setLoadingReservation(true);
    const reservationRM: ReservationRM = {
      propertyRef: productId!,
      tripBeginDate: convertToUTC(selectedDates.from),
      tripEndDate: convertToUTC(selectedDates.to),
      userEmail: email,
    };

    const { success, data, error } = await createReservationRM(reservationRM);
    if (success && data) {
      reservationMP(data.id, totalPrice);
    } else if (error) {
      setLoadingReservation(false);
      setError(error);
    }
  };

  const reservationMP = async (tripRef: string, totalPrice: number) => {
    const reservationMP: ReservationMP = {
      email: email,
      price: totalPrice,
      currency: "UYU",
      userName: email,
      userLastname: email,
      tripRef: tripRef, //lo agrego asi lo pongo en los links de MP
      productId: product!.id, //lo agrego asi lo pongo en los links de MP
      productTitle: product!.propertyName,
      productImage: product!.mainImage,
    };
    const { success, data, error } = await createReservationMP(reservationMP);
    if (success && data) {
      window.open(data.init_point, "_blank")?.focus();
    } else if (error) {
      setLoadingReservation(false);
      setError(error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {company && <Header company={company} />}

      <div className="flex-grow bg-gray-100 flex flex-col items-center justify-center p-4">
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

        {!loadingProduct && product && (
          <div className="w-full max-w-xl shadow-xl rounded-xl bg-white overflow-hidden">
            <CheckoutProductInfo product={product} />
            <Divider variant="middle" />
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

            <div className="p-4">
              <CheckoutForm onEmailChange={handleEmailChange} />
              {emailError && (
                <p className="text-red-500 text-sm font-semibold mt-2">
                  {emailError}
                </p>
              )}
            </div>
            <Divider variant="middle" />

            <div className="p-4">
              <CheckoutDetails
                pricePerDay={product.price}
                discountAmount={product.discountAmount}
              />
            </div>
            <Divider variant="middle" />

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

        {!loadingProduct && productError && (
          <div className="flex flex-col justify-center items-center h-[50vh]">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
              <p className="text-center text-red-500 text-lg font-semibold">
                {productError}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutPage;
