import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { NavigationMenuArray } from "@/jsons/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <NavigationMenu className="justify-between w-full 2xl:container h-[68px] px-6">
      <NavigationMenuList>
        <Image src="/logo.png" width={225} height={55} alt="viva cannabis" />
      </NavigationMenuList>
      <NavigationMenuList>
        {NavigationMenuArray.map(menu => (
          <NavigationMenuItem key={menu.href}>
            <Link href={menu.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {menu.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem className="ps-3">
          <Link href="#" legacyBehavior passHref>
            <Button>
              Cadastre-se
            </Button>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}