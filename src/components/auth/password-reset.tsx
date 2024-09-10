"use client";

import { evaluatePasswordStrength } from "@/lib/utils";
import { AuthService } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Progress } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EyeFilledIcon } from "../icons/eye-filled-icon";
import { EyeSlashFilledIcon } from "../icons/eye-slash-filled-icon";
import { Form, FormControl, FormField, FormItem } from "../ui/form";


const formSchema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
})


export const PasswordReset = ({ token }: { token: string }) => {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false)
  const [passwordScore, setPasswordScore] = useState(0)
  const [passwordStrengthColor, setPasswordStrengthColor] = useState<'danger' | 'warning' | 'success'>('danger')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })
  const passwordWatcher = form.watch('password')
  const confirmPasswordWatcher = form.watch('confirmPassword')

  const toggleVisibility = () => setIsVisible(!isVisible)
  const toggleVisibilityConfirm = () => setIsVisible(!isVisibleConfirm)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await AuthService.redefinePassword(token, values.password, values.confirmPassword)
    if (!res.error)
      router.push('/login')
  }

  useEffect(() => {
    const strength = evaluatePasswordStrength(passwordWatcher)
    if (strength) {
      setPasswordScore(strength?.score)
      if (strength.score <= 2) setPasswordStrengthColor('danger')
      if (strength.score === 3) setPasswordStrengthColor('warning')
      if (strength.score >= 4) setPasswordStrengthColor('success')
    }
  }, [passwordWatcher])

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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      variant="bordered"
                      label='Confirmar Senha'
                      type={isVisible ? "text" : "password"}
                      endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibilityConfirm} aria-label="toggle password visibility">
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
            <Progress value={(passwordScore * 100) / 5} color={passwordStrengthColor} />
          </div>

          <Button
            type="submit"
            variant='solid'
            color='primary'
            className="w-full"
            isDisabled={passwordWatcher !== confirmPasswordWatcher || passwordWatcher === '' || confirmPasswordWatcher === ''}
          >
            Redefinir
          </Button>
        </form>
      </Form>
    </>
  );
};