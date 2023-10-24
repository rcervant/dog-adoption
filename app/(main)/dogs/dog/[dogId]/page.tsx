import getCurrentUser from "@/actions/getCurrentUser";
import getDogsById from "@/actions/getDogsById";
import getNearbyDogs from "@/actions/getNearbyDogs";
import DogClient from "@/app/(main)/dogs/_components/DogProfile";
import { SIGN_IN_PATH } from "@/lib/constants";
import { redirect } from "next/navigation";

interface DogPageParams {
  params: { dogId: string };
}

const DogPage = async ({ params }: DogPageParams) => {
  if (!params) throw new Error("No params found");

  const { dogId } = params;
  if (!dogId) throw new Error("No dog id found");

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect(`${process.env.NEXT_PUBLIC_ORIGIN}${SIGN_IN_PATH}`);
  }

  const [dog] = await getDogsById({
    dogIdsToRetrieve: [dogId],
    user: currentUser,
  });

  if (!dog) {
    throw new Error("No dog found");
  }

  const nearbyDogs = await getNearbyDogs(dog.zip_code);

  return (
    <>
      {nearbyDogs && nearbyDogs.length !== 0 ? (
        <DogClient
          dog={dog}
          currentUser={currentUser}
          nearbyDogs={nearbyDogs}
        />
      ) : (
        <DogClient dog={dog} currentUser={currentUser} />
      )}
    </>
  );
};

export default DogPage;
