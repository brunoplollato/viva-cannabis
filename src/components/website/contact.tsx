'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import validator from "validator";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../ui/form";
import HeroIcon from "./heroIcon";
import { Section, SectionContent, SectionDescription, SectionHeader, SectionTitle } from "./section";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().refine(validator.isMobilePhone),
})

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
  }

  return (
    <Section className="flex container w-full">
      <SectionHeader className="w-1/2 text-left items-start justify-start">
        <SectionTitle>
          Quero marcar uma consulta Médica
        </SectionTitle>
        <SectionDescription>
          Contamos com um time de médicos parceiros para atender nossos pacientes por tele medicina ou consultas presenciais.
        </SectionDescription>
        <SectionDescription className="text-[#558B2F] font-bold text-2xl flex gap-x-5 xl:w-3/4">
          <HeroIcon name="PhoneIcon" type="outline" />
          (16) 99434 6419
        </SectionDescription>
      </SectionHeader>
      <SectionContent className="flex-row justify-end gap-x-10 w-1/2 p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-[468px] flex flex-col items-center border border-[#E0E0E0] rounded-xl py-20 px-12">
            <FormDescription className="text-base font-semibold text-[#1B5E20] w-2/3 text-center m-auto">
              PREENCHA OS DADOS NO FORMULÁRIO ABAIXO
            </FormDescription>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      variant="bordered"
                      placeholder="Nome"
                      classNames={{
                        inputWrapper: 'rounded-lg'
                      }}
                      startContent={
                        <HeroIcon name="UserIcon" type="outline" className="text-[#BDBDBD]" />
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                      placeholder="Email"
                      classNames={{
                        inputWrapper: 'rounded-lg'
                      }}
                      startContent={
                        <HeroIcon name="EnvelopeIcon" type="outline" className="text-[#BDBDBD]" />
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                      placeholder="Telefone"
                      classNames={{
                        inputWrapper: 'rounded-lg'
                      }}
                      startContent={
                        <HeroIcon name="PhoneIcon" type="outline" className="text-[#BDBDBD]" />
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">ENVIAR</Button>
          </form>
        </Form>
      </SectionContent>
    </Section>
  )
}