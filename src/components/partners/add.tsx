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
  submit: (values: z.infer<typeof formSchema>, file: File) => void;
}

const formSchema = z.object({
  name: z.string().min(2).max(50),
  occupation: z.string().min(2).max(50),
  photo: z.string(),
})

export const Add = ({ submit, title }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      occupation: "",
      photo: "",
    },
  })

  const handleFile = (file: File) => {
    form.setValue('photo', file.name)
    setFile(file);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (file) {
      submit(values, file);
      onClose()
      form.reset();
    }
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
                    <div className="w-full flex justify-center">
                      <Dropzone onFileSelect={handleFile} />
                    </div>
                    <FormField
                      control={form.control}
                      name="name"
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
                      name="occupation"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              variant="bordered"
                              label="Ocupação"
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
