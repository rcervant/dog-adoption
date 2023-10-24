"use client";

import { useRouter } from "next/navigation";
import { Dog } from "lucide-react";
import { MATCH_PATH } from "@/lib/constants";
import { Button } from "@/components/base/button";

const MatchButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(MATCH_PATH)}>
      Match
      <Dog className="ml-2 h-5 w-5" />
    </Button>
  );
};
export default MatchButton;
