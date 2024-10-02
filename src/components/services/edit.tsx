import * as outline from '@heroicons/react/24/outline';
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Tooltip,
  useDisclosure
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EditIcon } from "../icons/table/edit-icon";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import HeroIcon from '../website/heroIcon';

type ServiceProps = {
  id: string;
  title: string;
  description: string;
  icon: string;
}

type Props = {
  title: string;
  service: ServiceProps;
  submit: (values: z.infer<typeof formSchema>, id: string) => void;
}

const formSchema = z.object({
  title: z.string({ required_error: 'Campo obrigatório' }).min(2).max(50),
  description: z.string({ required_error: 'Campo obrigatório' }).min(2).max(500),
  icon: z.string({ required_error: 'Campo obrigatório' }),
})

export const Edit = ({ service, submit, title }: Props) => {
  const { resolvedTheme } = useNextTheme();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedValue, setSelectedValue] = useState(service.icon)
  const [iconNames, setIconNames] = useState<any[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: service,
  })

  useEffect(() => {
    Object.keys(outline).forEach(value => {
      setIconNames(prev => [...prev, {
        value,
        label: value
      }])
    });
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.icon = selectedValue
    submit(values, service.id);
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
                      name="icon"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Autocomplete
                              variant="bordered"
                              label="Ícone"
                              isRequired
                              startContent={selectedValue ? <HeroIcon name={selectedValue} type="outline" /> : null}
                              defaultItems={iconNames}
                              selectedKey={selectedValue}
                              onSelectionChange={(value) => setSelectedValue(value as string)}
                              {...field}
                            >
                              {(item) => (
                                <AutocompleteItem key={item.value} startContent={<HeroIcon name={item.value} type="outline" />}>
                                  {item.label}
                                </AutocompleteItem>
                              )}
                            </Autocomplete>
                          </FormControl>
                        </FormItem>
                      )}
                    />
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
                            <Textarea
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
