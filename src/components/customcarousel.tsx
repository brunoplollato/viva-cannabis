import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Children, ReactNode } from 'react';

export default function CustomCarousel({ children }: { children: ReactNode[] }) {
  return (
    <Carousel
      className="2xl:container w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {Children.toArray(children).map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3 xl:basis-1/4">
            {item}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}