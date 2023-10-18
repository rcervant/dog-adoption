"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "../ui/badge";
import useSearchStore from "@/hooks/useSearchStore";
import { ScrollArea } from "../ui/scroll-area";

const SelectedBreedsAccordion = () => {
  const { selectedBreeds, removeBreed } = useSearchStore();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const breed = e.currentTarget.textContent;
    if (!breed) return;
    removeBreed(breed);
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Dog breeds selected</AccordionTrigger>
        <AccordionContent>
          <ScrollArea
            className={`${
              selectedBreeds.length < 9 ? "h-auto" : "h-[10vh]"
            } w-full rounded-lg`}
          >
            <div
              className="grid grid-cols-3 gap-1"
              data-testid="selected-breed-badges"
            >
              {selectedBreeds.map((breed) => (
                <Badge onClick={handleClick} key={breed}>
                  {breed}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SelectedBreedsAccordion;
