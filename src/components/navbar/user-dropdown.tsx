import { UserService } from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NavbarItem,
  useDisclosure
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { DarkModeSwitch } from "./darkmodeswitch";

const formSchema = z.object({
  username: z.string({ required_error: 'Campo obrigatório' }).min(2).max(50),
  email: z.string().email(),
  phone: z.string(),
})

export const UserDropdown = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { id, username, email, phone } = user || {};
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: user,
    defaultValues: {
      username,
      email,
      phone,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await UserService.update(values, id as string)
    if (!res.error) {
      onClose()
    }
  }

  const handleLogout = useCallback(async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/login" })
    router.push(data.url)
  }, [router]);

  return (
    <>
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
          aria-label='User menu actions'>
          <DropdownItem
            key='role'
            className='flex flex-col justify-start w-full items-start'>
            <p>{user?.email}</p>
            <p className="font-bold">{user?.role === 'ADMIN' ? 'Administrador' : 'Redator'}</p>
          </DropdownItem>
          <DropdownItem key='profile' onPress={onOpen}>Perfil</DropdownItem>
          <DropdownItem key='change-password'>Trocar senha</DropdownItem>
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
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <ModalHeader className="flex flex-col gap-1">
                  Adicionar Usuário
                </ModalHeader>
                <ModalBody>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field, fieldState: errors }) => {
                      return (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              variant="bordered"
                              label="Nome"
                              isInvalid={!errors ? true : false}
                              isRequired
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState: errors }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            variant="bordered"
                            label="Email"
                            isInvalid={!errors ? true : false}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            variant="bordered"
                            label="Telefone"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </ModalBody>
                <ModalFooter className="justify-between">
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Fechar
                  </Button>
                  <Button color="primary" type="submit">
                    Salvar
                  </Button>
                </ModalFooter>
              </form>
            </Form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
