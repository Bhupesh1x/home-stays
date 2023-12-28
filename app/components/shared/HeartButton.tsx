import { SafeUser } from "@/app/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {
  listingId: string;
  currUser?: SafeUser | null;
};

function HeartButton({ listingId, currUser }: Props) {
  const hasFavourited = false;
  const toogleFavourite = () => {};

  return (
    <div className="relative hover:opacity-80 transition cursor-pointer">
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavourited ? "text-rose-500" : "text-neutral-500/70"}
      />
    </div>
  );
}

export default HeartButton;
