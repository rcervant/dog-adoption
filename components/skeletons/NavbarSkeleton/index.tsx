import Container from "@/components/Container";
import React from "react";
import { LogoSkeleton } from "./LogoSkeleton";
import ButtonSkeleton from "../ButtonSkeleton";
import AvatarSkeleton from "./AvatarSkeleton";

const NavbarSkeleton = () => {
  return (
    <div className="w-full">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-5">
            <LogoSkeleton />
            <ButtonSkeleton />
            <div className="flex flex-row items-center gap-1">
              <div className="hidden gap-4 sm:flex">
                <ButtonSkeleton />
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="">
                  <ButtonSkeleton />
                </div>
                <AvatarSkeleton />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavbarSkeleton;
