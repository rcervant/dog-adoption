"use client";

import Heading from "@/components/Heading";

interface DogInfoProps {
  name: string;
  age: number;
  zip_code: string;
  breed: string;
  description: string;
}

const DogInfo = ({ name, age, zip_code, breed, description }: DogInfoProps) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Heading title={name} subtitle={""} />
        <div
          className="
            flex 
            flex-row 
            items-start 
            justify-between 
          "
        >
          <div>Breed: {breed}</div>
          <div>Age: {age}</div>
          <div>Zip Code: {zip_code}</div>
        </div>
      </div>
      <div
        className="
        text-lg text-muted-foreground"
      >
        {description}
      </div>
    </div>
  );
};

export default DogInfo;
