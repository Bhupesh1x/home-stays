import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../shared/Avatar";

function UserMenu() {
  return (
    <div className="flex items-center gap-3">
      <div className="hidden md:block rounded-full hover:bg-neutral-100 cursor-pointer transition py-3 px-4 text-sm font-semibold">
        HomeStays your home
      </div>
      <div className="border-[1px] shadow-sm hover:shadow-md transition p-4 md:py-1 md:px-2 border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer">
        <AiOutlineMenu />
        <div className="hidden md:block">
          <Avatar />
        </div>
      </div>
    </div>
  );
}

export default UserMenu;
