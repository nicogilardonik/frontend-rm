import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface CheckoutButtonZoneProps {
  pricePerDay: number;
  selectedDates: { from?: Date; to?: Date };
  discountAmount?: number;
  loading: boolean;
  onReserveClick: () => void;
}

function CheckoutButtonZone({
  pricePerDay,
  selectedDates,
  discountAmount,
  loading,
  onReserveClick,
}: CheckoutButtonZoneProps) {
  const insurancePrice = Number(import.meta.env.VITE_INSURANCE) || 180;

  const calculateDays = () => {
    if (selectedDates.from && selectedDates.to) {
      const timeDiff =
        selectedDates.to.getTime() - selectedDates.from.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
      return daysDiff;
    }
    return 1;
  };

  const numberOfDays = calculateDays();
  const totalPrice =
    pricePerDay * numberOfDays -
    (discountAmount ? discountAmount * numberOfDays : 0) +
    insurancePrice;

  return (
    <div className="p-4 bg-white flex flex-col items-center space-y-4 w-full">
      <div className="w-full pt-4">
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
        onClick={onReserveClick}
        disabled={loading}
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
