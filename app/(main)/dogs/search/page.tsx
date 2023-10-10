import getCurrentUser from "@/actions/getCurrentUser";
import getDogIdsMetaDataFromParams from "@/actions/getDogIdsMetaDataFromParams";
import getDogsById from "@/actions/getDogsById";
import Container from "@/components/Container";
import InfiniteScrollDogs from "@/components/Dogs/InfiniteScrollDogs";
import EmptyState from "@/components/EmptyState";
import { SIGN_IN_PATH } from "@/lib/constants";
import { DogIdsMetadata } from "@/types";

import { redirect } from "next/navigation";

interface SearchProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const DogSearchPage = async ({ searchParams }: SearchProps) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    <EmptyState title="You have been logged out. Redirecting to sign in" />;
    return redirect(`${process.env.ORIGIN}${SIGN_IN_PATH}`);
  }

  const dogIdsMetadata = (await getDogIdsMetaDataFromParams({
    searchParams,
    user: currentUser,
  })) as DogIdsMetadata;

  if (!dogIdsMetadata) {
    throw new Error("No dog ids found");
  }

  const { resultIds } = dogIdsMetadata;
  const dogs = await getDogsById({
    dogIdsToRetrieve: resultIds,
    user: currentUser,
  });

  if (!dogs) {
    throw new Error("No dogs found");
  }

  if (dogs.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <InfiniteScrollDogs
        initialDogs={dogs}
        initialDogIdsMetadata={dogIdsMetadata}
        user={currentUser}
      />
    </Container>
  );
};

export default DogSearchPage;
