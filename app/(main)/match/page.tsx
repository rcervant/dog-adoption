import getCurrentUser from "@/actions/getCurrentUser";
import getDogMatch from "@/actions/getDogMatch";
import DogMatch from "@/components/Dogs/DogMatch";
import EmptyState from "@/components/EmptyState";
import { SIGN_IN_PATH } from "@/lib/constants";
import { Dog } from "@/types";
import { redirect } from "next/navigation";

const DogMatchPage = async () => {
  const currentUser = (await getCurrentUser()) || null;

  if (!currentUser) {
    <EmptyState title="You have been logged out. Redirecting to sign in" />;
    return redirect(`${process.env.ORIGIN}${SIGN_IN_PATH}`);
  }

  const dogMatch = ((await getDogMatch()) as Dog) || null;
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
