import axios from "axios";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { SafeUser } from "../types";
import { useModal } from "./use-modal-hook";

type Props = {
  listingId: string;
  currUser?: SafeUser | null;
};

const useFavorite = ({ listingId, currUser }: Props) => {
  const { onOpen } = useModal();
  const router = useRouter();

  const hasFavorited = useMemo(() => {
    const lists = currUser?.favouriteIds || [];

    return lists.includes(listingId);
  }, [currUser?.favouriteIds, listingId]);

  const toogleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currUser) {
        return onOpen("login");
      }

      let request;
      try {
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [currUser, hasFavorited, listingId, onOpen, router]
  );

  return {
    hasFavorited,
    toogleFavorite,
  };
};

export default useFavorite;
