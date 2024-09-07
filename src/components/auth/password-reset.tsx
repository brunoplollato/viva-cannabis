"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";


const formSchema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
})


export const PasswordReset = ({ token }: { token: string }) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("🚀 ~ onSubmit ~ values:", values)
  }

  return (
    <>
      <div className='text-center text-[25px] font-bold mb-6'>Redefinir Senha</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[300px]">
          <div className='flex flex-col gap-4 mb-4'>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      variant="bordered"
                      label='Senha'
                      type="password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      variant="bordered"
                      label='Confirmar Senha'
                      type="password"
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
            Redefinir
          </Button>
        </form>
      </Form>
    </>
  );
};