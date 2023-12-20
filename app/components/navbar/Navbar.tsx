import { SafeUser } from "@/app/types";

import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Container from "../shared/Container";

type Props = {
  currUser?: SafeUser | null;
};

function Navbar({ currUser }: Props) {
  return (
    <nav className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currUser={currUser} />
          </div>
        </Container>
      </div>
    </nav>
  );
}

export default Navbar;
