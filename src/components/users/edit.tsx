import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  InputProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { useForm } from "react-hook-form";
import InputMask from 'react-input-mask';
import validator from "validator";
import { z } from "zod";
import { EditIcon } from "../icons/table/edit-icon";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

type UserProps = {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'REDATOR';
}

type Props = {
  title: string;
  user: UserProps;
  submit: (values: z.infer<typeof formSchema>, id: string) => void;
}

const formSchema = z.object({
  username: z.string({ required_error: 'Campo obrigatório' }).min(2).max(50),
  email: z.string().email(),
  phone: z.string().refine(validator.isMobilePhone),
  role: z.enum(['ADMIN', 'REDATOR'])
})

const roles = [
  { key: "ADMIN", label: 'Administrador' },
  { key: "REDATOR", label: 'Redator' }
]

export const Edit = ({ user, submit, title }: Props) => {
  const { resolvedTheme } = useNextTheme();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { id, username, email, phone, role } = user;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: user,
    defaultValues: {
      username,
      email,
      phone,
      role,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    submit(values, user.id);
    onClose()
  }

  return (
    <div>
      <>
        <Tooltip
          content={title}
          color="danger"
        >
          <button
            onClick={onOpen}
          >
            <EditIcon size={20} fill={resolvedTheme === "dark" ? "#aaa" : "#222"} />
          </button>
        </Tooltip>
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
                    {title}
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
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field, fieldState: errors }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Select
                              variant="bordered"
                              label="Função"
                              isRequired
                              items={roles}
                              isInvalid={!errors ? true : false}
                              defaultSelectedKeys={[field.value]}
                              {...field}
                            >
                              {(role) => <SelectItem key={role.key}>{role.label}</SelectItem>}
                            </Select>
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
    </div>
  );
};
