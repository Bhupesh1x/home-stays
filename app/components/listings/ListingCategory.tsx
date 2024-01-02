type Props = {
  icon: JSX.Element;
  label: string;
  description: string;
};

function ListingCategory({ label, description, icon }: Props) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div className="flex flex-col">
        <p className="font-semibold text-lg">{label}</p>
        <p className="text-sm font-light text-neutral-500">{description}</p>
      </div>
    </div>
  );
}

export default ListingCategory;
