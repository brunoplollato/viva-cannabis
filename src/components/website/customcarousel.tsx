import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TeamCard from "./teamCard";

export default function CustomCarousel({ items }: { items: any[] }) {
  return (
    <Carousel
      className="2xl:container w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id} className="md:basis-1/3 lg:basis-1/3 xl:basis-1/4">
            <TeamCard name={item.name} role={item.occupation} photo={item.photo} key={item.id} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}