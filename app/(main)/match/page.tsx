import getCurrentUser from "@/actions/getCurrentUser";
import getDogMatch from "@/actions/getDogMatch";
import DogMatch from "@/app/(main)/match/_components/DogMatch";
import EmptyState from "@/components/EmptyState";
import { SIGN_IN_PATH } from "@/lib/constants";
import { Dog } from "@/types";
import { redirect } from "next/navigation";

const DogMatchPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect(`${process.env.NEXT_PUBLIC_ORIGIN}${SIGN_IN_PATH}`);
  }

  const dogMatch = (await getDogMatch()) as Dog;
  if (!dogMatch) throw new Error("No dog match found");

  if (Object.keys(dogMatch).length === 0) {
    return (
      <EmptyState
        title="No match generated"
        subtitle="Favorite pups to generate match."
      />
    );
  }

  return <DogMatch dogMatch={dogMatch} currentUser={currentUser} />;
};

export default DogMatchPage;
