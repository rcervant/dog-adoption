"use server";

import getNearbyZipCodes from "./getNearbyZipCodes";
import getCurrentUser from "./getCurrentUser";
import getDogsById from "./getDogsById";
import getDogIdsMetaDataFromParams from "./getDogIdsMetaDataFromParams";

interface IGetNearbyDogs {
  zipCode: string;
  dogId: string;
}
// TODO: add search user radius
const getNearbyDogs = async ({ zipCode, dogId }: IGetNearbyDogs) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("No current user");

    if (!zipCode) return [];

    const locationsMetadata = await getNearbyZipCodes({ zipCode });
    if (!locationsMetadata)
      throw new Error(`Could not fetch locationsMetadata`);

    const { results } = locationsMetadata;
    if (results.length === 0) return [];

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

    const nearbyDogs = await getDogsById({
      dogIdsToRetrieve: resultIds,
      user: currentUser,
    });
    if (!nearbyDogs) throw new Error(`Could not fetch nearbyDogs`);

    const filteredNearbyDogs = nearbyDogs.filter((dog) => dog.id !== dogId);

    return filteredNearbyDogs;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export default getNearbyDogs;
