interface CheckoutButtonZoneProps {
  pricePerDay: number;
  selectedDates: { from?: Date; to?: Date };
  discountAmount?: number;
}

function CheckoutButtonZone({
  pricePerDay,
  selectedDates,
  discountAmount,
}: CheckoutButtonZoneProps) {
  const insurancePrice = import.meta.env.VITE_INSURANCE;
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
    Number(insurancePrice);

  return (
    <div className="p-2 bg-white flex flex-col items-center space-y-4">
      <div className="mt-4 w-full pt-4">
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
      <button className="bg-purple-600 text-white px-6 py-3 rounded-lg w-full max-w-md shadow-md hover:bg-purple-700 transition">
        Reservar
      </button>
    </div>
  );
}

export default CheckoutButtonZone;
