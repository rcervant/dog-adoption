"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dog, SerializableUser } from "@/types";
import HeartButton from "./HeartButton";
import { DOG_PATH } from "@/lib/constants";

interface DogCardProps {
  data: Dog;
  currentUser?: SerializableUser | null;
}

const DogCard = ({ data, currentUser }: DogCardProps) => {
  const router = useRouter();
  const { id, name, breed, img, age, zip_code } = data;

  return (
    <div
      onClick={() => router.push(`${DOG_PATH}/${id}`)}
      className="group col-span-1 cursor-pointer"
      data-testid={`dog-card-${id}`}
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            className="
            h-full 
            w-full 
            object-cover 
            transition 
            group-hover:scale-110
            "
            src={img}
            alt={`Image of ${name}`}
            fill
            sizes="100%"
          />
          <div className="absolute right-3 top-3">
            <HeartButton
              dogId={id}
              currentUser={currentUser}
              data-testid={`heart-button-${id}`}
            />
          </div>
        </div>
        <div className="flex flex-row items-center gap-3">
          <div className="text-xl font-semibold">{name}</div>
          <div className="text-lg font-medium text-muted-foreground">{age}</div>
        </div>
        <div className="font-light">{breed}</div>
        <div className="font-light text-muted-foreground">{zip_code}</div>
      </div>
    </div>
  );
};

export default DogCard;
