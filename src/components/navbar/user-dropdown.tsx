import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { DarkModeSwitch } from "./darkmodeswitch";

export const UserDropdown = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = useCallback(async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/login" })
    router.push(data.url)
  }, [router]);

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as='button'
            color='secondary'
            size='md'
            name="Bruno Lollato"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label='User menu actions'
        onAction={(actionKey) => console.log({ actionKey })}>
        <DropdownItem
          key='profile'
          className='flex flex-col justify-start w-full items-start'>
          <p>{user?.email}</p>
          <p className="font-bold">{user?.role === 'ADMIN' ? 'Administrador' : 'Redator'}</p>
        </DropdownItem>
        <DropdownItem key='settings'>Perfil</DropdownItem>
        <DropdownItem key='configurations'>Configurações</DropdownItem>
        <DropdownItem key='help_and_feedback'>FAQ</DropdownItem>
        <DropdownItem
          key='logout'
          color='danger'
          className='text-danger'
          onPress={handleLogout}>
          Sair
        </DropdownItem>
        <DropdownItem key='switch'>
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
