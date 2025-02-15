import { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface CheckoutCalendarProps {
  disabledDates: Date[];
  onDateChange: (range: { from?: Date; to?: Date }) => void;
}

function CheckoutCalendar({
  disabledDates,
  onDateChange,
}: CheckoutCalendarProps) {
  const [selectedRange, setSelectedRange] = useState<{
    from?: Date;
    to?: Date;
  }>({});
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Emitir cambios al componente padre
  useEffect(() => {
    onDateChange(selectedRange);
  }, [selectedRange, onDateChange]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Formatear fechas seleccionadas para mostrar en el botón
  const formatDate = (date?: Date) => {
    if (!date) return "";
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "short",
    };
    return date.toLocaleDateString("es-ES", options);
  };

  return (
    <div className="relative w-full flex justify-center">
      {/* Botón que abre el calendario */}
      <button
        className="w-1/2 p-3  border border-gray-300 rounded-lg shadow-md text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        📅{" "}
        {selectedRange.from
          ? `Desde ${formatDate(selectedRange.from)} al ${formatDate(
              selectedRange.to
            )}`
          : "Selecciona una fecha"}
      </button>

      {isOpen && (
        <div
          ref={calendarRef}
          className="absolute mt-2 bg-white shadow-lg rounded-lg p-4 z-50"
        >
          <DayPicker
            mode="range"
            selected={selectedRange}
            onSelect={setSelectedRange}
            className="w-full"
            timeZone="America/Montevideo"
            captionLayout="dropdown"
            disabled={disabledDates}
            modifiersClassNames={{
              range_start: "range-start",
              range_end: "range-end",
              range_middle: "range-middle",
              disabled: "day-disabled",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default CheckoutCalendar;
