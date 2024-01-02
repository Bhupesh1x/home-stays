import { Range } from "react-date-range";

import DateRangePicker from "../shared/input/DateRangePicker";

type Props = {
  price: number;
  totalPrice: number;
  disabled: boolean;
  disabledDates: Date[];
  dateRange: Range;
  onDateChange: (value: Range) => void;
  onSubmit: () => void;
};

function ListingReservations({
  price,
  totalPrice,
  dateRange,
  disabled,
  disabledDates,
  onDateChange,
  onSubmit,
}: Props) {
  return (
    <div className="bg-white border-[1px] border-gray-200 rounded-xl p-4 overflow-hidden">
      <div className="flex items-center gap-1">
        <p className="text-2xl font-semibold">$ {price}</p>
        <p className="font-light text-neutral-600">night</p>
      </div>
      <hr />
      <DateRangePicker
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onDateChange(value.selection)}
      />
      <hr />
      <div className="flex items-center justify-between text-lg font-semibold">
        <p>Total</p>
        <p>$ {totalPrice}</p>
      </div>
    </div>
  );
}

export default ListingReservations;
