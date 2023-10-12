import getCurrentUser from "@/actions/getCurrentUser";
import getDogsById from "@/actions/getDogsById";
import getNearbyDogs from "@/actions/getNearbyDogs";
import DogClient from "@/components/Dogs/DogClient";
import { SIGN_IN_PATH } from "@/lib/constants";
import { redirect } from "next/navigation";

interface DogPageParams {
  params: { dogId: string };
}

export const dynamic = "force-dynamic";

const DogPage = async ({ params }: DogPageParams) => {
  if (!params) throw new Error("No params found");

  const { dogId } = params;
  if (!dogId) throw new Error("No dog id found");

  const currentUser = (await getCurrentUser()) || null;
  if (!currentUser) {
    return redirect(`${process.env.ORIGIN}${SIGN_IN_PATH}`);
  }

  const [dog] =
    (await getDogsById({
      dogIdsToRetrieve: [dogId],
      user: currentUser,
    })) || null;

  if (!dog) {
    throw new Error("No dog found");
  }

  const nearbyDogs = (await getNearbyDogs(dog.zip_code)) || null;

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
