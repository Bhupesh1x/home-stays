"use client";

import useCountries from "@/app/hooks/use-countries";
import Select from "react-select";

export type CountrySelectValue = {
  flag: string;
  label: string;
  region: string;
  value: string;
  latlng: number[];
};

type Props = {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
};

function CountrySelect({ value, onChange }: Props) {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(options: any) => (
          <div className="flex items-center gap-3">
            <div>{options.flag}</div>
            <p>
              {options.label},{" "}
              <span className="text-neutral-800 ml-1">{options.region}</span>
            </p>
          </div>
        )}
        classNames={{
          control: () => "p-2 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#72cafc",
          },
        })}
      />
    </div>
  );
}

export default CountrySelect;
