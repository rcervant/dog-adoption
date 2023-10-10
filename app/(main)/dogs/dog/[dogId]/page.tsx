import getCurrentUser from "@/actions/getCurrentUser";
import getDogsById from "@/actions/getDogsById";
import getNearbyDogs from "@/actions/getNearbyDogs";
import DogClient from "@/components/Dogs/DogClient";
import EmptyState from "@/components/EmptyState";
import { SIGN_IN_PATH } from "@/lib/constants";
import { redirect } from "next/navigation";

interface DogPageParams {
  params: { dogId: string };
}

const DogPage = async ({ params }: DogPageParams) => {
  const { dogId } = params;
  if (!dogId) {
    throw new Error("No dog id found");
  }

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    <EmptyState title="You have been logged out. Redirecting to sign in" />;
    return redirect(`${process.env.ORIGIN}${SIGN_IN_PATH}`);
  }

  const [dog] = await getDogsById({
    dogIdsToRetrieve: [dogId],
    user: currentUser,
  });

  if (!dog) {
    throw new Error("No dog found");
  }

  const nearbyDogs = await getNearbyDogs(dog.zip_code);
  if (!nearbyDogs) {
    <EmptyState title="No nearby dogs found" />;
  }

  return (
    <DogClient dog={dog} currentUser={currentUser} nearbyDogs={nearbyDogs} />
  );
};

export default DogPage;
