import { UserService } from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
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
import { useForm } from "react-hook-form";
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

export const EditUser = ({ user }: { user: UserProps }) => {
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
    const res = await UserService.update(values, id)
    if (!res.error) {
      onClose()
    }
  }

  return (
    <div>
      <>
        <Tooltip
          content="Delete user"
          color="danger"
        >
          <button
            onClick={onOpen}
          >
            <EditIcon size={20} fill="#222" />
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
