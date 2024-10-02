import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Dropzone from "../dropzone";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

type Props = {
  title: string;
  submit: (values: z.infer<typeof formSchema>) => void;
}

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(150),
})

export const Add = ({ submit, title }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    submit(values);
    onClose()
    form.reset();
  }

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          {title}
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
                    {title}
                  </ModalHeader>
                  <ModalBody>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              variant="bordered"
                              label="Título"
                              isRequired
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              variant="bordered"
                              label="Descrição"
                              isRequired
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
