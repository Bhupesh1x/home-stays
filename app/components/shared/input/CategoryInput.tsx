type Props = {
  label: string;
  icon: JSX.Element;
  selected: boolean;
  onClick: (value: string) => void;
};

function CategoryInput({ label, icon, selected, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex flex-col gap-3 hover:border-black p-4 border-2 transition rounded-xl cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      }`}
    >
      {icon}
      <p className="font-semibold text-sm">{label}</p>
    </div>
  );
}

export default CategoryInput;
