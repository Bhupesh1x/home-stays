"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { useModal } from "@/app/hooks/use-modal-hook";

import Modal from "./Modal";
import Heading from "../shared/Heading";
import Counter from "../shared/input/Counter";
import { categories } from "../navbar/Categories";
import CategoryInput from "../shared/input/CategoryInput";
import CountrySelect from "../shared/input/CountrySelect";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

function RentModal() {
  const { isOpen, onClose, type } = useModal();
  const [steps, setSteps] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      title: "",
      description: "",
      imageSrc: "",
      roomCount: 1,
      bathroomCount: 1,
      guestCount: 1,
      price: 1,
    },
  });

  const setCustomValue = useCallback(
    (id: string, value: any) => {
      setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue]
  );

  const onNext = () => {
    setSteps((val) => val + 1);
  };

  const onBack = () => {
    setSteps((val) => val - 1);
  };

  const actionLabel = useMemo(() => {
    if (steps === STEPS.PRICE) return "Create";

    return "Next";
  }, [steps]);

  const secondaryActionLabel = useMemo(() => {
    if (steps === STEPS.CATEGORY) return undefined;

    return "Back";
  }, [steps]);

  const isRentModalOpen = isOpen && type === "rent";
  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");

  const Map = useMemo(
    () =>
      dynamic(() => import("../shared/Map"), {
        ssr: false,
      }),
    [location]
  );

  const bodyContent = useMemo(() => {
    switch (steps) {
      case STEPS.CATEGORY:
        return (
          <div className="flex flex-col gap-4">
            <Heading
              title="Which of these best describes tour place?"
              subTitle="Pick a category"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto">
              {categories.map(({ label, icon }) => (
                <div key={label} className="col-span-1">
                  <CategoryInput
                    label={label}
                    icon={icon}
                    onClick={(category) => setCustomValue("category", category)}
                    selected={category === label}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case STEPS.LOCATION:
        return (
          <div className="flex flex-col gap-4">
            <Heading
              title="Where is your place located?"
              subTitle="Help guests find you!"
            />

            <CountrySelect
              value={location}
              onChange={(value) => setCustomValue("location", value)}
            />
            <Map center={location?.latlng} />
          </div>
        );

      case STEPS.INFO:
        return (
          <div className="flex flex-col gap-4">
            <Heading
              title="Share some basics about your place"
              subTitle="What amenities do you have?"
            />

            <Counter
              title="Guests"
              subtitle="How many guests do you allow?"
              value={guestCount}
              onChange={(value) => setCustomValue("guestCount", value)}
            />
            <hr />
            <Counter
              title="Rooms"
              subtitle="How many rooms do you have?"
              value={roomCount}
              onChange={(value) => setCustomValue("roomCount", value)}
            />
            <hr />
            <Counter
              title="Bathrooms"
              subtitle="How many bathrooms do you have?"
              value={bathroomCount}
              onChange={(value) => setCustomValue("bathroomCount", value)}
            />
          </div>
        );
    }
  }, [
    Map,
    bathroomCount,
    category,
    guestCount,
    location,
    roomCount,
    setCustomValue,
    steps,
  ]);

  return (
    <Modal
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
      onClose={onClose}
      onSubmit={onNext}
      isOpen={isRentModalOpen}
      title="HomeStays your home!"
      body={bodyContent}
    />
  );
}

export default RentModal;
