import Container from "@/components/Container";
import Logo from "./Logo";
import { SerializableUser } from "@/types";
import UserNav from "./UserNav";
import SearchDialog from "../DogSearch/DogSearchDialog";
import SortButton from "./SortButton";
import MatchButton from "./MatchButton";

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
                <SortButton />
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="hidden sm:flex">
                  <MatchButton />
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
