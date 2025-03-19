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

      <Button
        onClick={() => onReserveClick(totalPrice)}
        disabled={loading || disabled}
        variant="contained"
        sx={{
          backgroundColor: "#5B27EC",
          "&:hover": { backgroundColor: "#622AFF" },
          color: "white",
          padding: "12px 24px",
          borderRadius: "25px",
          fontWeight: "bold",
          textTransform: "none",
          width: "100%",
          maxWidth: "320px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        startIcon={
          loading ? <CircularProgress size={20} color="inherit" /> : null
        }
      >
        {loading ? "Procesando..." : "Reservar"}
      </Button>
    </div>
  );
}

export default CheckoutButtonZone;
