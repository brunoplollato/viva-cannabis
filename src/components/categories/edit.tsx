import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EditIcon } from "../icons/table/edit-icon";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

type CategoryProps = {
  id: string;
  title: string;
  description: string;
}

type Props = {
  title: string;
  category: CategoryProps;
  submit: (values: z.infer<typeof formSchema>, id: string) => void;
}

const formSchema = z.object({
  title: z.string({ required_error: 'Campo obrigatório' }).min(2).max(50),
  description: z.string({ required_error: 'Campo obrigatório' }).min(2).max(150),
})

export const Edit = ({ category, submit, title }: Props) => {
  const { resolvedTheme } = useNextTheme();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: category,
    defaultValues: {
      title: '',
      description: '',
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    submit(values, category.id);
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
                      name="title"
                      render={({ field, fieldState: errors }) => {
                        return (
                          <FormItem className="w-full">
                            <FormControl>
                              <Input
                                variant="bordered"
                                label="Título"
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
                      name="description"
                      render={({ field, fieldState: errors }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              variant="bordered"
                              label="Descrição"
                              isInvalid={!errors ? true : false}
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
    </div>
  );
};
