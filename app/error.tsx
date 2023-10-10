"use client";

import ButtonWithIcon from "@/components/ButtonWithIcon";
import EmptyState from "@/components/EmptyState";
import BareBonesNavBar from "@/components/Navbar/BareBonesNavBar";
import { ChevronLeft, Home, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <div>
        <BareBonesNavBar />
        <EmptyState
          title="Whoops!"
          subtitle={`Something went wrong. Please try again. \n Message: ${
            error.message
          } \n Stack: ${error.stack} \n Name: ${
            error.name
          } \n ToString(): ${error.toString()} \n ErrorStringified: ${JSON.stringify(
            error,
          )}`}
        />

        <div className="flex gap-4">
          <ButtonWithIcon
            label="Reset"
            onClick={() => reset()}
            icon={ChevronLeft}
          />
          <ButtonWithIcon
            label="Go Home"
            onClick={
              // Go back to the homepage
              () => router.push("/")
            }
            icon={Home}
          />

          <ButtonWithIcon
            label="Refresh"
            onClick={
              // Refresh
              () => router.refresh()
            }
            icon={RefreshCcw}
          />
        </div>
      </div>
    </>
  );
};

export default Error;
