import Heading from "@/components/Heading";
import Container from "@/components/Container";
import DogCard from "@/app/(main)/_components/Dogs/DogCard";

import { NUM_DOGS_TO_DISPLAY } from "@/lib/constants";
import getNearbyDogs from "@/actions/getNearbyDogs";
import getCurrentUser from "@/actions/getCurrentUser";

interface NearbyDogsProps {
  zipCode: string;
  dogId: string;
}

const NearbyDogs = async ({ zipCode, dogId }: NearbyDogsProps) => {
  const currentUser = await getCurrentUser();
  const nearbyDogs = await getNearbyDogs({ zipCode, dogId });

  return (
    <Container>
      <hr />
      <div className="p-5">
        <Heading
          title="Discover Nearby Dogs"
          subtitle="Meet Your Potential Furry Family Member"
          center
        />
      </div>
      <hr />
      <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {nearbyDogs &&
          nearbyDogs.length > 0 &&
          Array.from({ length: NUM_DOGS_TO_DISPLAY }).map((_, i) =>
            i < nearbyDogs.length ? (
              <DogCard
                key={nearbyDogs[i].id}
                data={nearbyDogs[i]}
                currentUser={currentUser}
              />
            ) : null,
          )}
      </div>
    </Container>
  );
};

export default NearbyDogs;
