import Container from "../Container";
import Logo from "./Logo";
import { SerializableUser } from "@/types";
import Sort from "./Sort";
import Match from "./Match";
import UserNav from "./UserNav";
import SearchDialog from "../SearchDialog";

interface NavbarProps {
  currentUser?: SerializableUser | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm ">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <SearchDialog />
            <div className="flex flex-row items-center gap-1">
              <div className="hidden gap-6 sm:flex">
                <Sort />
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="hidden sm:flex">
                  <Match />
                </div>
                <UserNav currentUser={currentUser} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
