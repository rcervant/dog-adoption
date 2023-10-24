"use client";

import EmptyState from "@/components/EmptyState";
import BareBonesNavBar from "@/app/(main)/_components/Navbar/BareBonesNavBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <BareBonesNavBar />
      <EmptyState
        title="Something went wrong!"
        subtitle={"Try refreshing the page"}
      />
    </>
  );
};

export default Error;
