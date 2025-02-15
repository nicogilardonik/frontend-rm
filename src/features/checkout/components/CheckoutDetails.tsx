function CheckoutDetails() {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold">Detalle del Pago</h2>
      <p className="text-gray-600 text-sm">
        Detalle de lo que pagarás por esta reserva entre las fechas
        seleccionadas.
      </p>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-green-600 font-semibold">
            Precio por día 40% OFF
          </span>
          <span className="text-gray-400 line-through">UYU 978</span>
          <span className="font-bold">UYU 587 por día</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Reserva protegida</span>
          <span className="font-bold">UYU 180</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between border-t pt-4">
        <span className="text-gray-700 font-semibold">Total por 1 día(s)</span>
        <span className="text-lg font-bold">UYU 767</span>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Serás redirigido a MercadoPago
      </p>
    </div>
  );
}

export default CheckoutDetails;
