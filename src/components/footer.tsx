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
import { cn } from '../lib/utils';

export default function Footer() {
  return (
    <div className="bg-[#0B280D] pt-20 pb-5">
      <NavigationMenu className="justify-between items-center w-full 2xl:container h-[68px] px-6 pb-12 border-b border-[#558B2F]">
        <NavigationMenuList>
          <Image src="/logo-white.svg" width={225} height={55} alt="viva cannabis" />
        </NavigationMenuList>
        <NavigationMenuList>
          {NavigationMenuArray.map(menu => (
            <NavigationMenuItem key={menu.href}>
              <Link href={menu.href} legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-white font-normal hover:bg-transparent hover:text-white hover:underline")}>
                  {menu.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
        <NavigationMenuList className="justify-end w-[225px]">
          <NavigationMenuItem className="rounded-full bg-[#7CB342] hover:bg-[#33691E] w-7 h-7 flex justify-center items-center">
            <Link href="#" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-white hover:bg-transparent")}>
                <Image src='/youtube.svg' alt='youtube viva cannabis' width={14} height={14} />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="rounded-full bg-[#7CB342] hover:bg-[#33691E] w-7 h-7 flex justify-center items-center">
            <Link href="#" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-white hover:bg-transparent")}>
                <Image src='/facebook.svg' alt='facebook viva cannabis' width={14} height={14} />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="rounded-full bg-[#7CB342] hover:bg-[#33691E] w-7 h-7 flex justify-center items-center">
            <Link href="#" legacyBehavior passHref>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-white hover:bg-transparent")}>
                <Image src='/instagram.svg' alt='instagram viva cannabis' width={14} height={14} />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <p className="mt-12 text-sm text-center text-white">Todos os direitos reservados</p>
    </div>
  )
}