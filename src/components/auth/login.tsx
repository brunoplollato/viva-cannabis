"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { z } from "zod";
import { EyeFilledIcon } from "../icons/eye-filled-icon";
import { EyeSlashFilledIcon } from "../icons/eye-slash-filled-icon";
import { Form, FormControl, FormField, FormItem } from "../ui/form";


const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})


export const Login = () => {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ process.env.VERCEL_URL:", process.env.VERCEL_URL)
    console.log("🚀 ~ useEffect ~ process.env.RESEND_API_KEY:", process.env.RESEND_API_KEY)
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

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
                      type={isVisible ? "text" : "password"}
                      endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                          {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
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
        <Link href='/recovery' className='font-bold'>
          Recuperar senha
        </Link>
      </div>
    </>
  );
};