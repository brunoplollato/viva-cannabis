import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"

type TeamCardProps = {
  name: string,
  role: string,
  photo: string,
}

export default function TeamCard({ name, role, photo }: TeamCardProps) {
  return (
    <Card className="w-[270px] overflow-hidden border-none relative">
      <CardHeader className="bg-[#6A1B9A] h-[132px] w-full">
      </CardHeader>
      <CardContent className="absolute top-[58px] left-0 right-0 p-0">
        <Image className="m-auto rounded-full border-white border-4" src={photo} alt={name} width={148} height={148} />
      </CardContent>
      <CardFooter className="items-end justify-center h-[160px]">
        <div className="flex flex-col items-center">
          <p className="text-[#212121] text-xl font-bold text-center">{name}</p>
          <p className="text-[#616161] text-base text-center">{role}</p>
        </div>
      </CardFooter>
    </Card>
  )
}