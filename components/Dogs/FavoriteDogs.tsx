import Heading from "@/components/Heading";
import Container from "@/components/Container";
import DogCard from "@/components/Dogs/DogCard";
import { Dog, SerializableUser } from "../../types";

interface FavoriteDogsProps {
  favoriteDogs: Dog[];
  currentUser: SerializableUser;
}

const FavoriteDogs = ({ favoriteDogs, currentUser }: FavoriteDogsProps) => {
  return (
    <Container>
      <Heading
        title="Your Favorite Dogs"
        subtitle="Explore and Choose Your Paw-fect Companion"
        center
      />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          gap-8 
          sm:grid-cols-2 
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        {favoriteDogs.map((dog: Dog) => (
          <DogCard key={dog.id} data={dog} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteDogs;
