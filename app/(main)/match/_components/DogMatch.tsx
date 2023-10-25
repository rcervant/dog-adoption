import DogInfo from "@/app/(main)/_components/Dogs/DogInfo";
import DogHead from "@/app/(main)/_components/Dogs/DogHead";
import Heading from "@/components/Heading";
import Container from "@/components/Container";
import { Dog, SerializableUser } from "@/types";

interface DogMatchProps {
  dogMatch: Dog;
  currentUser: SerializableUser;
}

const DogMatch = ({ dogMatch, currentUser }: DogMatchProps) => {
  const { name, img, age, id, zip_code, breed } = dogMatch;

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <DogHead
            name={name}
            imageSrc={img}
            age={age}
            id={id}
            currentUser={currentUser}
            subtitle="Your New Best Friend"
          />
          <Heading
            title="Congratulations on Finding Your Perfect Match! "
            subtitle="We are thrilled to announce that you've found the paw-fect companion! Your journey to find a loyal and loving furry friend has brought you here, and we couldn't be happier for you and your new four-legged family member."
          />
          <Heading title="Meet Your Match:" />
          <DogInfo
            name={name}
            breed={breed}
            age={age}
            zip_code={zip_code}
            description={`${name} is ready to embark on a new adventure with you, bringing joy, love, and endless tail wags into your life. We believe that every dog deserves a loving home, and you've opened your heart and home to one of them.`}
          />
        </div>
      </div>
    </Container>
  );
};

export default DogMatch;
