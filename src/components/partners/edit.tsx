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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Dropzone from "../dropzone";
import { EditIcon } from "../icons/table/edit-icon";
import { Form, FormControl, FormField, FormItem } from "../ui/form";

type PartnerProps = {
  id: string;
  name: string;
  occupation: string;
  photo: string;
}

type Props = {
  title: string;
  partner: PartnerProps;
  submit: (values: z.infer<typeof formSchema>, id: string, file: File) => void;
}

const formSchema = z.object({
  name: z.string({ required_error: 'Campo obrigatório' }).min(2).max(50),
  occupation: z.string({ required_error: 'Campo obrigatório' }).min(2).max(50),
  photo: z.string({ required_error: 'Campo obrigatório' }),
})

export const Edit = ({ partner, submit, title }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { id, name, occupation, photo } = partner;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: partner,
    defaultValues: {
      name,
      occupation,
      photo,
    },
  })

  const handleFile = (file: File) => {
    form.setValue('photo', file.name)
    setFile(file);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (file) {
      submit(values, partner.id, file);
      onClose()
    }
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
                    {title}
                  </ModalHeader>
                  <ModalBody>
                    <div className="w-full flex justify-center">
                      <Dropzone onFileSelect={handleFile} src={partner.photo} />
                    </div>
                    <FormField
                      control={form.control}
                      name="name"
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
                      name="occupation"
                      render={({ field, fieldState: errors }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              variant="bordered"
                              label="Ocupação"
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
