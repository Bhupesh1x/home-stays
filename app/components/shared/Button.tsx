import { IconType } from "react-icons";

type Props = {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button({
  label,
  icon: Icon,
  onClick,
  disabled,
  outline,
  small,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition rounded-lg w-full ${
        outline
          ? "border-black bg-white text-black"
          : "text-white bg-primary border-primary"
      } ${
        small
          ? "py-1 font-light text-sm border-[1px]"
          : "py-3 font-semibold text-md border-2"
      }`}
    >
      {Icon && <Icon size={18} className="absolute top-4 left-4" />}
      {label}
    </button>
  );
}

export default Button;
