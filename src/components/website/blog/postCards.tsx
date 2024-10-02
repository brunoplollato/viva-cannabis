import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import Link from "next/link";

type Props = {
  image: string;
  title: string,
  slug: string,
  category: string;
  created_at: Date;
  description: string;
}

export default function PostCards({ image, title, slug, category, created_at, description }: Props) {
  return (
    <Card className="py-4 max-w-[440px]">
      <CardHeader className="pb-0 pt-0 px-4 flex-col items-start">
        <Image
          // as={NextImage}
          alt={title}
          className="object-cover rounded-xl"
          src={image}
          isZoomed
          width={410}
        />
        <h3 className="font-bold text-xl text-left my-5 h-20">{title}</h3>
        <small className="text-default-500">{new Date(created_at).toLocaleDateString()}</small>
        <p className="text-tiny uppercase font-bold">{category}</p>
      </CardHeader>
      <CardBody className="overflow-visible py-2 justify-between">
        <p className="line-clamp-5 text-sm px-1">
          Ex veniam quis ex tempor elit non aute et do. Minim veniam ut adipisicing cupidatat nostrud consequat cillum veniam officia enim. Ullamco nulla amet sit est ipsum culpa dolor enim. Consectetur quis id duis do laboris eu adipisicing labore culpa. Cillum laborum dolor Lorem commodo non ea reprehenderit adipisicing.
        </p>
        <Button className="mt-8 self-end">
          <Link href={`/noticias/${slug}`}>
            Ler Mais
          </Link>
        </Button>
      </CardBody>
    </Card>
  )
}