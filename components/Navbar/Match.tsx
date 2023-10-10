"use client";

import { useRouter } from "next/navigation";
import ButtonWithIcon from "../ButtonWithIcon";
import { Dog } from "lucide-react";
import { MATCH_PATH } from "@/lib/constants";

const Match = () => {
  const router = useRouter();

  return (
    <ButtonWithIcon
      label="Match"
      icon={Dog}
      onClick={() => router.push(MATCH_PATH)}
    />
  );
};
export default Match;
