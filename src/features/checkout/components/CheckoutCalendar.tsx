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
  const [errorMessage, setErrorMessage] = useState("");

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

  const isRangeValid = (from?: Date, to?: Date) => {
    if (!from || !to) return true;

    const timeDiff = to.getTime() - from.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
    const dateArray: Date[] = [];

    for (let i = 0; i < daysDiff; i++) {
      const newDate = new Date(from);
      newDate.setDate(from.getDate() + i);
      dateArray.push(newDate);
    }

    return !dateArray.some((date) =>
      disabledDates.some(
        (disabledDate) => date.toDateString() === disabledDate.toDateString()
      )
    );
  };

  const handleSelect = (range: { from?: Date; to?: Date }) => {
    if (isRangeValid(range.from, range.to)) {
      setSelectedRange(range);
      onDateChange(range);
      setErrorMessage("");
    } else {
      setErrorMessage(
        "⚠️ No puedes seleccionar fechas que ya están reservadas."
      );
    }
  };

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
    <div className="relative w-full flex flex-col items-center">
      <button
        className="w-2/3 p-3  border border-violet-600 rounded-3xl shadow-md text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        📅{" "}
        {selectedRange.from
          ? `Desde ${formatDate(selectedRange.from)} al ${formatDate(
              selectedRange.to
            )}`
          : "Seleccione fecha"}
      </button>

      {isOpen && (
        <div
          ref={calendarRef}
          className="absolute mt-2 bg-white shadow-lg rounded-lg p-4 z-50"
        >
          <DayPicker
            mode="range"
            selected={selectedRange}
            onSelect={handleSelect}
            timeZone="America/Montevideo"
            captionLayout="dropdown"
            disabled={[...disabledDates, { before: new Date() }]}
            modifiersClassNames={{
              range_start: "range-start",
              range_end: "range-end",
              range_middle: "range-middle",
              disabled: "day-disabled",
            }}
          />
        </div>
      )}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
}

export default CheckoutCalendar;
