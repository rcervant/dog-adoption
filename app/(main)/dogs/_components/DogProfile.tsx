"use client";

import { Dog, SerializableUser } from "@/types";
import Container from "@/components/Container";
import DogInfo from "../../_components/Dogs/DogInfo";
import DogHead from "../../_components/Dogs/DogHead";
import NearbyDogs from "./NearbyDogs";

interface DogProfileProps {
  dog: Dog;
  currentUser?: SerializableUser | null;
  nearbyDogs?: Dog[];
}

const DogProfile = ({ dog, currentUser, nearbyDogs }: DogProfileProps) => {
  if (!currentUser) {
    return null;
  }

  if (!dog) {
    return null;
  }

  const { name, img, age, id, zip_code, breed } = dog;

  const vowels = ["a", "e", "i", "o", "u"];
  const description = `Meet ${name}, a charming canine waiting to steal your heart. With ${age} ${
    age === 1 ? `year` : `years`
  } of wisdom and ${
    vowels.includes(breed[0].toLowerCase()) ? "an" : "a"
  } ${breed} pedigree, this pup is ready to embark on a new adventure by your side. Whether you're seeking a loyal companion for long walks, cuddles on the couch, or a partner in play, ${name} is up for the challenge.`;

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col justify-center gap-6 ">
          <DogHead
            name={name}
            imageSrc={img}
            age={age}
            id={id}
            currentUser={currentUser}
            subtitle={"Your Potential New Best Friend"}
          />
          <DogInfo
            name={name}
            breed={breed}
            age={age}
            zip_code={zip_code}
            description={description}
          />
        </div>
      </div>
      <div className="mt-10">
        {nearbyDogs && nearbyDogs.length > 0 && (
          <NearbyDogs nearbyDogs={nearbyDogs} currentUser={currentUser} />
        )}
      </div>
    </Container>
  );
};

export default DogProfile;
