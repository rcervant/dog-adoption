"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // send error to sentry
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>Try again</Button>
        <Button onClick={() => router.push("/")}>Go home</Button>
      </div>
    </div>
  );
}
