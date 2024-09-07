"use client";

import { AuthService } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";


const formSchema = z.object({
  email: z.string().email(),
})


export const PasswordRecovery = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await AuthService.recovery(values.email)
  }

  return (
    <>
      <div className='text-center text-[25px] font-bold mb-6'>Recuperar senha</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[300px]">
          <div className='flex flex-col gap-4 mb-4'>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      variant="bordered"
                      label='Email'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            variant='solid'
            color='primary'
            className="w-full"
          >
            Enviar
          </Button>
        </form>
      </Form>

      <div className='font-light text-slate-400 mt-4 text-sm'>
        Voltar para o{" "}
        <Link href='/login' className='font-bold'>
          login
        </Link>
      </div>
    </>
  );
};