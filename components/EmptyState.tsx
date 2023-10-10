"use client";

import { useRouter } from "next/navigation";

import Heading from "./Heading";
import ButtonWithIcon from "./ButtonWithIcon";
import { ChevronLeft, Home } from "lucide-react";

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
      <div className="mt-4 w-48">
        {showReset && (
          <ButtonWithIcon
            outline
            label={`${sendHome ? "Go Home" : "Go Back"}`}
            onClick={sendHome ? () => router.push("/") : () => router.back()}
            icon={sendHome ? Home : ChevronLeft}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
