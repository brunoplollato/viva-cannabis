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
  useDisclosure
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import HeroIcon from '../website/heroIcon';

type Props = {
  title: string;
  submit: (values: z.infer<typeof formSchema>) => void;
}

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  icon: z.string(),
})

export const Add = ({ submit, title }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [iconNames, setIconNames] = useState<any[]>([])
  const [selectedValue, setSelectedValue] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "",
    },
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
    submit(values);
    onClose()
    form.reset();
    setSelectedValue('')
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
