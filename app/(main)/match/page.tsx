import DogMatch from "@/app/(main)/match/_components/DogMatch";
import EmptyState from "@/components/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getDogMatch from "@/actions/getDogMatch";

import { SIGN_IN_PATH } from "@/lib/constants";
import { redirect } from "next/navigation";

const DogMatchPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect(`${process.env.NEXT_PUBLIC_ORIGIN}${SIGN_IN_PATH}`);
  }

  const dogMatch = await getDogMatch();

  return (
    <>
      {dogMatch !== null && Object.keys(dogMatch).length > 0 ? (
        <DogMatch dogMatch={dogMatch} currentUser={currentUser} />
      ) : (
        <EmptyState
          title="No match generated"
          subtitle="Favorite pups to generate match."
        />
      )}
    </>
  );
};

export default DogMatchPage;
