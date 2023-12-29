import { SafeUser } from "@/app/types";
import useFavorite from "@/app/hooks/use-favorite";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {
  listingId: string;
  currUser?: SafeUser | null;
};

function HeartButton({ listingId, currUser }: Props) {
  const { hasFavorited, toogleFavorite } = useFavorite({
    listingId,
    currUser,
  });

  return (
    <div
      onClick={toogleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "text-rose-500" : "text-transparent"}
      />
    </div>
  );
}

export default HeartButton;
