interface CheckoutDetailsProps {
  pricePerDay: number;
  discountAmount?: number;
}

function CheckoutDetails({
  pricePerDay,
  discountAmount = 0,
}: CheckoutDetailsProps) {
  const insurancePrice = import.meta.env.VITE_INSURANCE;
  const hasDiscount = discountAmount > 0;
  const discountedPrice = hasDiscount
    ? pricePerDay - discountAmount
    : pricePerDay;
  const discountPercentage = hasDiscount
    ? Math.round((discountAmount / pricePerDay) * 100)
    : null;

  return (
    <div className="p-6 bg-white">
      <h2 className="text-lg font-semibold text-gray-900">Detalle del Pago</h2>
      <p className="text-gray-600 text-sm mb-4">
        Detalle de lo que pagarás por esta reserva entre las fechas
        seleccionadas.
      </p>

      <div className="space-y-3">
        {hasDiscount && discountPercentage !== null && (
          <div className="flex justify-between items-center">
            <span className="text-green-600 font-semibold">
              Precio por día {discountPercentage}% OFF
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 line-through text-sm">{`UYU ${pricePerDay}`}</span>
              <span className="font-bold text-gray-900">{`UYU ${discountedPrice} por día`}</span>
            </div>
          </div>
        )}

        {!hasDiscount && (
          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Precio por día</span>
            <span className="font-bold">{`UYU ${pricePerDay}`}</span>
          </div>
        )}

        <div className="flex justify-between border-t pt-2">
          <span className="text-gray-600">Reserva protegida</span>
          <span className="font-bold">UYU {insurancePrice}</span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutDetails;
