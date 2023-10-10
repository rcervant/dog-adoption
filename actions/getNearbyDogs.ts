"use server";

import getNearbyZipCodes from "./getNearbyZipCodes";
import getCurrentUser from "./getCurrentUser";
import getDogsById from "./getDogsById";
import getDogIdsMetaDataFromParams from "./getDogIdsMetaDataFromParams";

// TODO: add search user radius
const getNearbyDogs = async (zipCode: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("No current user");

    const locationsMetadata = await getNearbyZipCodes({ zipCode });

    const { results } = locationsMetadata;
    const zipCodes = results.map((location) => location.zip_code);

    const dogIdsMetadata = await getDogIdsMetaDataFromParams({
      searchParams: {
        zipCodes,
      },
      user: currentUser,
    });
    if (!dogIdsMetadata) throw new Error(`Could not fetch dogIdsMetadata`);

    const { resultIds } = dogIdsMetadata;
    if (!resultIds) throw new Error(`Could not fetch resultIds`);

    const data = await getDogsById({
      dogIdsToRetrieve: resultIds,
      user: currentUser,
    });

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export default getNearbyDogs;
