type Props = {
  label: string;
  onClick: () => void;
};

function MenuItem({ label, onClick }: Props) {
  return (
    <div
      className="px-3 py-4 hover:bg-neutral-100 transition font-semibold cursor-pointer"
      onClick={onClick}
    >
      {label}
    </div>
  );
}

export default MenuItem;
