import DogInfo from "@/app/(main)/_components/Dogs/DogInfo";
import DogHead from "@/app/(main)/_components/Dogs/DogHead";
import { Dog } from "@/types";
import Container from "@/components/Container";
import NearbyDogs from "./NearbyDogs";
import getCurrentUser from '@/actions/getCurrentUser';
import getNearbyDogs from '@/actions/getNearbyDogs';

interface DogProfileProps {
  dog: Dog;
}

const DogProfile = async ({ dog }: DogProfileProps) => {
  const currentUser = await getCurrentUser();
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
        <NearbyDogs zipCode={zip_code} dogId={id} />
      </div>
    </Container>
  );
};

export default DogProfile;
