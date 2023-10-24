"use client";

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import { ChevronLeft } from "lucide-react";
import { Button } from "./base/button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  sendHome?: boolean;
}

const EmptyState = ({
  title = "Nothing to see here",
  subtitle = "Try changing your filters",
  showReset = true,
  sendHome = false,
}: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div className="flex h-[80vh] flex-col items-center justify-center gap-2 pt-24 ">
      <Heading center title={title} subtitle={subtitle} />
      <div className="mt-4 w-48 ">
        <div className="flex justify-center">
          {showReset && (
            <Button
              onClick={sendHome ? () => router.push("/") : () => router.back()}
              variant={"outline"}
              size={"lg"}
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              {`${sendHome ? "Go Home" : "Go Back"}`}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
