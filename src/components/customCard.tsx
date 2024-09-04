import { ReactElement } from "react";
import HeroIcon from "./heroIcon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

type CustomCardProps = {
  icon: ReactElement,
  title: string,
  body: string,
}

export default function CustomCard({ icon, title, body }: CustomCardProps) {
  return (
    <Card className="basis-full xl:basis-1/3 p-5 rounded-[18px] max-w-[395px] xl:max-w-[375px]">
      <CardHeader className="items-center">
        <div className="h-[60px] w-[60px] rounded-full bg-[#F1F8E9] flex items-center justify-center">
          <HeroIcon name={icon} type='outline' />
        </div>
      </CardHeader>
      <CardContent className="flex-row">
        <CardTitle className="mb-4 mt-6">
          {title}
        </CardTitle>
        <CardDescription className="">
          {body}
        </CardDescription>
      </CardContent>
    </Card>
  )
}