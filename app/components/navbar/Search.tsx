"use client";

import { BiSearch } from "react-icons/bi";

import { useModal } from "@/app/hooks/use-modal-hook";
import { useSearchParams } from "next/navigation";
import useCountries from "@/app/hooks/use-countries";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";

function Search() {
  const { onOpen } = useModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "Anywhere";
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any Week";
  }, [endDate, startDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      className="bg-white border-[1px] rounded-full shadow-sm hover:shadow-md transition py-1 cursor-pointer"
      onClick={() => onOpen("search")}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="text-sm font-semibold px-6 border-x-[1px] flex-1 hidden sm:block">
          {durationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3">
          <div className="hidden sm:block">{guestLabel}</div>

          <div className="bg-primary p-2 rounded-full text-white">
            <BiSearch />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
