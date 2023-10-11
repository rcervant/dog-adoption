"use client";

import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Dog, DogIdsMetadata, SerializableUser } from "@/types";
import getDogIdsMetaDataFromParams from "@/actions/getDogIdsMetaDataFromParams";
import { DEBOUNCE_TIME, NOT_IN_ARRAY, QUESTION_MARK } from "@/lib/constants";
import getDogsById from "@/actions/getDogsById";
import DogCard from "./DogCard";
import signOut from "@/actions/signOut";
import DogCardSkeleton from "../skeletons/DogPage/DogCardSkeleton";
import useSearchStore from "@/hooks/useSearchStore";
import { debounce } from "@/lib/client/utils";
import queryString from "query-string";

interface InfiniteScrollDogsProps {
  initialDogs: Dog[];
  initialDogIdsMetadata: DogIdsMetadata;
  user: SerializableUser | null;
}

const InfiniteScrollDogs = ({
  initialDogs,
  initialDogIdsMetadata,
  user,
}: InfiniteScrollDogsProps) => {
  const [ref, inView] = useInView();

  const [next, setNext] = useState(initialDogIdsMetadata.next);
  const [dogs, setDogs] = useState(initialDogs);
  const [loadMoreDogsCalled, setLoadMoreDogsCalled] = useState(false);

  const { isSearching } = useSearchStore();

  const updateDogsFromSearch = useCallback(async () => {
    if (!user) {
      const res = (await signOut()) || null;
      return null;
    }

    setDogs([...initialDogs]);
    setNext(initialDogIdsMetadata.next);
  }, [user, initialDogs, initialDogIdsMetadata.next]);

  useEffect(() => {
    const debouncedUpdateDogs = debounce(updateDogsFromSearch, DEBOUNCE_TIME);

    // triggers when search modal is submitted
    if (isSearching) {
      debouncedUpdateDogs();
    }

    return () => {
      debouncedUpdateDogs.cancel();
    };
  }, [isSearching, updateDogsFromSearch]);

  const convertUrlToParameters = useCallback((url: string) => {
    const questionMarkIndex = url.indexOf(QUESTION_MARK);
    if (questionMarkIndex === NOT_IN_ARRAY) return JSON.stringify({});

    const queryParams = url.slice(questionMarkIndex + 1);
    const params = queryString.parse(queryParams, {
      arrayFormat: "index",
    });

    return JSON.stringify(params);
  }, []);

  const loadMoreDogs = useCallback(async () => {
    if (!user) {
      await signOut();
      return null;
    }

    if (loadMoreDogsCalled) return null;
    setLoadMoreDogsCalled(true);

    try {
      const nextSearchParamsObj = JSON.parse(convertUrlToParameters(next));

      const nextPageDogIdsMetadata =
        ((await getDogIdsMetaDataFromParams({
          searchParams: nextSearchParamsObj,
          user,
        })) as DogIdsMetadata) || null;

      if (!nextPageDogIdsMetadata) {
        throw new Error("Couldn't fetch dog ids from server");
      }

      if (
        Object.hasOwn(nextPageDogIdsMetadata, "next") &&
        Object.hasOwn(nextPageDogIdsMetadata, "resultIds")
      ) {
        setNext(nextPageDogIdsMetadata.next);

        const { resultIds } = nextPageDogIdsMetadata;
        const dogs =
          (await getDogsById({ dogIdsToRetrieve: resultIds, user })) || null;

        if (!dogs) {
          throw new Error("Couldn't fetch dogs from server");
        }

        setDogs((prevDogs: Dog[] | undefined) => [
          ...(prevDogs?.length ? prevDogs : []),
          ...dogs,
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadMoreDogsCalled(false);
    }
  }, [user, loadMoreDogsCalled, convertUrlToParameters, next]);

  useEffect(() => {
    const debouncedLoadMoreDogs = debounce(loadMoreDogs, DEBOUNCE_TIME);

    if (inView) {
      debouncedLoadMoreDogs();
    }

    return () => {
      debouncedLoadMoreDogs.cancel();
    };
  }, [inView, loadMoreDogs]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 pb-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {dogs.map((dog) => (
          <DogCard currentUser={user} data={dog} key={dog.id} />
        ))}
        {!loadMoreDogsCalled && initialDogIdsMetadata.total > dogs.length && (
          <div ref={ref}>
            <DogCardSkeleton />
          </div>
        )}
      </div>
    </>
  );
};

export default InfiniteScrollDogs;
