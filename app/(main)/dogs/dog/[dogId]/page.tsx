import getCurrentUser from "@/actions/getCurrentUser";
import getDogsById from "@/actions/getDogsById";

import { SIGN_IN_PATH } from "@/lib/constants";
import { redirect } from "next/navigation";

import DogProfile from "@/app/(main)/dogs/_components/DogProfile";

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

  return (
    <>
      <DogProfile dog={dog} />
    </>
  );
};

export default DogPage;
