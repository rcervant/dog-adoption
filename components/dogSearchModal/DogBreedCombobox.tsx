"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { ChevronsUpDown } from "lucide-react";
import { transformArrayToOptions } from "@/lib/client/utils";
import useSearchStore from "@/hooks/useSearchStore";
import useBreedList from "@/hooks/useBreedList";
import { useCallback, useState } from "react";

const DogBreedCombobox = () => {
  const breedStore = useSearchStore();
  const { breedList, status } = useBreedList();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const getDogBreedOptions = useCallback(
    () => transformArrayToOptions(breedList),
    [breedList],
  );
  const dogBreedOptions = getDogBreedOptions();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? dogBreedOptions.find((dogBreed) => dogBreed.value === value)
                ?.label
            : "Select dog breed..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] overflow-auto p-0">
        {status === "loaded" && (
          <Command>
            <CommandInput placeholder="Search dog breed..." />
            <CommandEmpty>No dog breed found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-48 w-full">
                {dogBreedOptions.map((dogBreed) => (
                  <CommandItem
                    key={dogBreed.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      breedStore.addBreed(dogBreed.label);
                      setOpen(false);
                    }}
                  >
                    {dogBreed.label}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default DogBreedCombobox;
