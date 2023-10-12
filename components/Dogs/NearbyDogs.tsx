import Heading from "@/components/Heading";
import Container from "@/components/Container";
import DogCard from "@/components/Dogs/DogCard";
import { Dog, SerializableUser } from "../../types";
import { NUM_DOGS_TO_DISPLAY } from "@/lib/constants";
import { useParams } from "next/navigation";

interface NearbyDogsProps {
  nearbyDogs: Dog[];
  currentUser: SerializableUser;
}

const NearbyDogs = ({ nearbyDogs, currentUser }: NearbyDogsProps) => {
  const params = useParams();

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
        {Array.from({ length: NUM_DOGS_TO_DISPLAY }).map((_, i) =>
          i < nearbyDogs.length ? (
            params.dogId !== nearbyDogs[i].id ? (
              <DogCard
                key={nearbyDogs[i].id}
                data={nearbyDogs[i]}
                currentUser={currentUser}
              />
            ) : null
          ) : null,
        )}
      </div>
    </Container>
  );
};

export default NearbyDogs;
