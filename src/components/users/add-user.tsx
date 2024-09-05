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
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import validator from "validator";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().refine(validator.isMobilePhone),
  role: z.enum(['ADMIN', 'REDATOR'])
})

const roles = [
  { key: "ADMIN", label: 'Administrador' },
  { key: "REDATOR", label: 'Redator' }
]

export const AddUser = ({ update }: { update: () => void }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      role: "REDATOR",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await UserService.create(values)
    if (!res.error) {
      onClose()
      update()
    }
  }

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          Adicionar Usuário
        </Button>
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
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              variant="bordered"
                              label="Nome"
                              isRequired
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              variant="bordered"
                              label="Email"
                              isRequired
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
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Select
                              variant="bordered"
                              label="Função"
                              isRequired
                              items={roles}
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
