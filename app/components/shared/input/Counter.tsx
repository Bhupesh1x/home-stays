import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type Props = {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
};

function Counter({ title, subtitle, value, onChange }: Props) {
  const onAdd = () => {
    onChange(value + 1);
  };

  const onReduce = () => {
    if (value === 1) return;
    onChange(value - 1);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        <p className="font-light text-neutral-600">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <div
          onClick={onReduce}
          className="h-8 w-8 border-[1px] border-neutral-400 rounded-full hover:opacity-80 transition text-neutral-600 flex items-center justify-center cursor-pointer"
        >
          <AiOutlineMinus />
        </div>
        <div className="text-xl font-light text-neutral-600 select-none">
          {value}
        </div>
        <div
          onClick={onAdd}
          className="h-8 w-8 border-[1px] border-neutral-400 rounded-full hover:opacity-80 transition text-neutral-600 flex items-center justify-center cursor-pointer"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
}

export default Counter;
