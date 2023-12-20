"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import { useModal } from "@/app/hooks/use-modal-hook";

import Avatar from "../shared/Avatar";
import MenuItem from "./MenuItem";
import { User } from "@prisma/client";

type Props = {
  currUser?: User | null;
};

function UserMenu({ currUser }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { onOpen } = useModal();

  const toogleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative flex items-center gap-3">
      <div className="hidden md:block rounded-full hover:bg-neutral-100 cursor-pointer transition py-3 px-4 text-sm font-semibold">
        HomeStays my home
      </div>
      <div
        className="border-[1px] shadow-sm hover:shadow-md transition p-4 md:py-1 md:px-2 border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer"
        onClick={toogleOpen}
      >
        <AiOutlineMenu />
        <div className="hidden md:block">
          <Avatar />
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-12 right-0 bg-white shadow-md rounded-xl w-[40vw] md:w-3/4 overflow-hidden text-sm">
          {currUser ? (
            <>
              <MenuItem label="My trips" onClick={() => {}} />
              <MenuItem label="My favorites" onClick={() => {}} />
              <MenuItem label="My reservations" onClick={() => {}} />
              <MenuItem label="HomeStays my home" onClick={() => {}} />
              <MenuItem label="Logout" onClick={() => {}} />
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
