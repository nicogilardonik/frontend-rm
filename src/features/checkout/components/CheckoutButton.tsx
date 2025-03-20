import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface CheckoutButtonZoneProps {
  pricePerDay: number;
  selectedDates: { from?: Date; to?: Date };
  discountAmount?: number;
  loading: boolean;
  disabled: boolean;
  onReserveClick: (totalPrice: number) => void;
}

function CheckoutButtonZone({
  pricePerDay,
  selectedDates,
  discountAmount = 0,
  loading,
  disabled,
  onReserveClick,
}: CheckoutButtonZoneProps) {
  const insurancePrice = Number(import.meta.env.VITE_INSURANCE) || 180;

  const calculateDays = () => {
    if (selectedDates.from && selectedDates.to) {
      const fromDate = new Date(selectedDates.from.setHours(0, 0, 0, 0));
      const toDate = new Date(selectedDates.to.setHours(0, 0, 0, 0));

      const timeDiff = toDate.getTime() - fromDate.getTime();
      const daysDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24));

      return daysDiff === 0 ? 1 : daysDiff; // 📌 Si es el mismo día, cuenta como 1
    }
    return 1;
  };

  const numberOfDays = Math.max(1, calculateDays());
  const discountTotal = discountAmount * numberOfDays; //
  const totalPrice =
    pricePerDay * numberOfDays - discountTotal + insurancePrice; //

  return (
    <div className="p-4 bg-white flex flex-col items-center space-y-4 w-full">
      <div className="w-full ">
        <div className="flex justify-between w-full">
          <span className="text-gray-700 font-semibold">
            Total por {numberOfDays} día(s)
          </span>
          <span className="text-lg font-bold">{`UYU ${totalPrice}`}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1 text-center">
          Serás redirigido a MercadoPago
        </p>
      </div>

      <button
        onClick={() => onReserveClick(totalPrice)}
        disabled={loading || disabled}
        className={`w-full max-w-[320px] py-3 px-6 rounded-full font-semibold text-white shadow-md transition
        ${
          disabled || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary hover:bg-primary-dark active:scale-95"
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
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
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Procesando...
          </div>
        ) : (
          "Reservar"
        )}
      </button>
    </div>
  );
}

export default CheckoutButtonZone;
