interface CheckoutDetailsProps {
  pricePerDay: number;
  selectedDates: { from?: Date; to?: Date };
}

function CheckoutDetails({ pricePerDay, selectedDates }: CheckoutDetailsProps) {
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
  const totalPrice = pricePerDay * numberOfDays;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold">Detalle del Pago</h2>
      <p className="text-gray-600 text-sm">
        Detalle de lo que pagarás por esta reserva entre las fechas
        seleccionadas.
      </p>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span className="font-semibold">Precio por día</span>
          <span className="font-bold">{`UYU ${pricePerDay}`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Reserva protegida</span>
          <span className="font-bold">UYU 180</span>
        </div>
      </div>
      <div className="mt-4 w-full border-t pt-4">
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
    </div>
  );
}

export default CheckoutDetails;
