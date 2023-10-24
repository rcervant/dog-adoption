import getCurrentUser from "@/actions/getCurrentUser";
import getDogIdsMetaDataFromParams from "@/actions/getDogIdsMetaDataFromParams";
import getDogsById from "@/actions/getDogsById";

import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import InfiniteScrollDogs from "@/app/(main)/dogs/search/_components/InfiniteScrollDogs";

import { ASCENDING, SIGN_IN_PATH } from "@/lib/constants";
import { getSanitizedSearchParams } from "@/lib/server/utils";
import { redirect } from "next/navigation";

interface SearchProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const DogSearchPage = async ({
  searchParams = { sort: ASCENDING },
}: SearchProps) => {
  if (searchParams) throw new Error("No search params found");

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect(`${process.env.ORIGIN}${SIGN_IN_PATH}`);
  }

  const sanitizedSearchParams = await getSanitizedSearchParams({
    searchParams,
  });
  if (!sanitizedSearchParams)
    throw new Error("No sanitized search params found");

  const dogIdsMetadata = await getDogIdsMetaDataFromParams({
    searchParams: sanitizedSearchParams,
    user: currentUser,
  });

  if (!dogIdsMetadata) throw new Error("Id metadata not found");

  const { resultIds } = dogIdsMetadata;
  if (!resultIds) throw new Error("No dog ids found");
  if (resultIds.length === 0) {
    return <EmptyState showReset />;
  }

  const dogs = await getDogsById({
    dogIdsToRetrieve: resultIds,
    user: currentUser,
  });

  if (!dogs) throw new Error("No dogs retrieved");

  return (
    <>
      {dogs.length !== 0 ? (
        <Container>
          <InfiniteScrollDogs
            initialDogs={dogs}
            initialDogIdsMetadata={dogIdsMetadata}
            user={currentUser}
          />
        </Container>
      ) : (
        <EmptyState showReset />
      )}
    </>
  );
};

export default DogSearchPage;
