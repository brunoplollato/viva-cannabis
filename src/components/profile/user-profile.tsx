import { UserService } from "@/services/users";
import { UserProps } from "@/types/DTO";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  DropdownItem,
  Input,
  InputProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import InputMask from 'react-input-mask';
import validator from "validator";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

const formSchema = z.object({
  username: z.string({ required_error: 'Campo obrigatório' }).min(2).max(50),
  email: z.string().email(),
  phone: z.string().refine(validator.isMobilePhone),
})

export const UserProfile = ({ user }: { user: UserProps }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { id, username, email, phone } = user;
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

  return (
    <>
      <DropdownItem key='profile' onPress={onOpen}>Perfil</DropdownItem>
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
                          <InputMask
                            mask={'(99) 99999-9999'}
                            {...field}
                          >
                            {(inputProps: InputProps) => (
                              <Input
                                variant="bordered"
                                label="Telefone"
                                {...inputProps}
                              />
                            )}
                          </InputMask>
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
