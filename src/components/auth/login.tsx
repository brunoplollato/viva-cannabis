"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";


const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})


export const Login = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false
    });
    console.log("🚀 ~ onSubmit ~ res:", res)
    if (res?.ok) {
      toast.success('Login realizado com sucesso!');
      router.push('/dashboard')
      return;
    } else {
      toast.error('Credenciais inválidas, tente novamente!');
    }
    return res;
  }

  return (
    <>
      <div className='text-center text-[25px] font-bold mb-6'>Login</div>
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
          </div>

          <Button
            type="submit"
            variant='solid'
            color='primary'
            className="w-full"
          >
            Login
          </Button>
        </form>
      </Form>

      <div className='font-light text-slate-400 mt-4 text-sm'>
        Esqueceu a senha?{" "}
        <Link href='/register' className='font-bold'>
          Recuperar senha
        </Link>
      </div>
    </>
  );
};