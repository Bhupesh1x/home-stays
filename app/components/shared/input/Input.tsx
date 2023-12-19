import { BiDollar } from "react-icons/bi";

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

type Props = {
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  formatPrice?: boolean;
};

function Input({
  id,
  label,
  errors,
  register,
  disabled,
  formatPrice,
  required,
  type = "text",
}: Props) {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute top-5 left-2 text-neutral-700"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        type={type}
        className={`peer w-full pt-6 p-3 font-light bg-white rounded-md border-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          formatPrice ? "pl-9" : "pl-4"
        } ${
          errors[id]
            ? "border-rose-500 focus:border-rose-500"
            : "border-neutral-300 focus:border-black"
        }`}
        placeholder=" "
      />
      <label
        className={`absolute top-5 z-10 origin-[0] text-md duration-150 transform -translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          formatPrice ? "left-9" : "left-4"
        } ${errors[id] ? "text-rose-500" : "text-zinc-400"}`}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
