"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import { SafeUser } from "@/app/types";
import { useModal } from "@/app/hooks/use-modal-hook";

import Avatar from "../shared/Avatar";
import MenuItem from "./MenuItem";

type Props = {
  currUser?: SafeUser | null;
};

function UserMenu({ currUser }: Props) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const { onOpen } = useModal();

  const toogleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRentClick = () => {
    if (!currUser) {
      return onOpen("login");
    }

    onOpen("rent");
  };

  return (
    <div className="relative flex items-center gap-3">
      <div
        className="hidden md:block rounded-full hover:bg-neutral-100 cursor-pointer transition py-3 px-4 text-sm font-semibold"
        onClick={onRentClick}
      >
        HomeStays my home
      </div>
      <div
        className="border-[1px] shadow-sm hover:shadow-md transition p-4 md:py-1 md:px-2 border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer"
        onClick={toogleOpen}
      >
        <AiOutlineMenu />
        <div className="hidden md:block">
          <Avatar src={currUser?.image} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-12 right-0 bg-white shadow-md rounded-xl w-[40vw] md:w-3/4 overflow-hidden text-sm">
          {currUser ? (
            <>
              <MenuItem
                label="My trips"
                onClick={() => router.push("/trips")}
              />
              <MenuItem
                label="My favorites"
                onClick={() => router.push("/favorites")}
              />
              <MenuItem
                label="My reservations"
                onClick={() => router.push("/reservations")}
              />
              <MenuItem label="HomeStays my home" onClick={onRentClick} />
              <hr />
              <MenuItem label="Logout" onClick={() => signOut()} />
            </>
          ) : (
            <>
              <MenuItem label="Login" onClick={() => onOpen("login")} />
              <MenuItem label="Sign up" onClick={() => onOpen("register")} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default UserMenu;
