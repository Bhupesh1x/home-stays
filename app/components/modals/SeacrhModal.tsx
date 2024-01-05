"use client";

import qs from "query-string";
import dynamic from "next/dynamic";
import { formatISO } from "date-fns";
import { Range } from "react-date-range";
import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useModal } from "@/app/hooks/use-modal-hook";

import Modal from "./Modal";
import CountrySelect, {
  CountrySelectValue,
} from "../shared/input/CountrySelect";
import Heading from "../shared/Heading";
import Counter from "../shared/input/Counter";
import DateRangePicker from "../shared/input/DateRangePicker";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

function SearchModal() {
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === "search";

  const router = useRouter();
  const params = useSearchParams();

  const [steps, setSteps] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [roomCount, setRoomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../shared/Map"), {
        ssr: false,
      }),
    [location]
  );

  const onNext = useCallback(() => {
    setSteps((step) => step + 1);
  }, []);

  const onBack = useCallback(() => {
    setSteps((step) => step - 1);
  }, []);

  const onSubmit = useCallback(() => {
    if (steps !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
    setSteps(STEPS.LOCATION);
    onClose();
  }, [
    bathroomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    onNext,
    params,
    roomCount,
    router,
    steps,
    onClose,
  ]);

  const actionLabel = useMemo(() => {
    if (steps === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [steps]);

  const secondaryActionLabel = useMemo(() => {
    if (steps === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [steps]);

  const bodyContent = useMemo(() => {
    switch (steps) {
      case STEPS.LOCATION:
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title="Where do you wanna go?"
              subTitle="Find the perfect location!"
            />
            <CountrySelect
              value={location}
              onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
          </div>
        );
      case STEPS.DATE:
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title="When do you plan to go?"
              subTitle="Make sure everyone is free!"
            />
            <DateRangePicker
              value={dateRange}
              onChange={(value) => setDateRange(value.selection)}
            />
          </div>
        );
      case STEPS.INFO:
        return (
          <div className="flex flex-col gap-8">
            <Heading
              title="More information"
              subTitle="Find your perfect place!"
            />
            <Counter
              title="Guests"
              subtitle="How many guests are comming?"
              value={guestCount}
              onChange={(value) => setGuestCount(value)}
            />
            <Counter
              title="Rooms"
              subtitle="How many rooms do you need?"
              value={roomCount}
              onChange={(value) => setRoomCount(value)}
            />
            <Counter
              title="Bathrooms"
              subtitle="How many bathrooms do you need?"
              value={bathroomCount}
              onChange={(value) => setBathroomCount(value)}
            />
          </div>
        );
    }
  }, [Map, bathroomCount, dateRange, guestCount, location, roomCount, steps]);

  return (
    <Modal
      title="Filters"
      isOpen={isModalOpen}
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      onClose={onClose}
      secondaryAction={onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
}

export default SearchModal;
