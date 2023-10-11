import getDogBreeds from "@/actions/getDogBreeds";
import { useEffect, useState } from "react";

const useBreedList = () => {
  const [breedList, setBreedList] = useState<string[]>([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    const getBreedList = async () => {
      setBreedList([]);
      setStatus("loading");

      setBreedList((await getDogBreeds()) || []);
      setStatus("loaded");
    };

    getBreedList();
  }, []);

  return { breedList, status };
};

export default useBreedList;
