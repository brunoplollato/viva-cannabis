"use client";

import { AuthService } from "@/services/auth";
import { Button } from "@nextui-org/react";
import NextLink from 'next/link';
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Loading from "../loading";

type Response = {
  error?: boolean,
  message: string,
  status?: number,
}

export const AccountVerify = ({ token }: { token: string }) => {
  const router = useRouter()
  const [timer, setTimer] = useState(30)
  const [response, setResponse] = useState<Response>()
  const [isLoading, setIsLoading] = useState(false)

  const handleVerification = useCallback(async () => {
    try {
      setIsLoading(true)
      const res: Response = await AuthService.verify(token)
      console.log("🚀 ~ handleVerification ~ res:", res)
      setResponse(res)
    } catch (err) {
      console.error(err)
    }
    finally {
      setIsLoading(false)
    }
  }, [])

  const handleMessage = useMemo(() => {
    // if (response && response.error) {
    //   return <p className='text-center text-[25px] font-bold mb-6'>{response.message}</p>
    // }
    return (
      <>
        <p className='text-center text-[25px] font-bold mb-6'>{response && response.message}</p>
      </>
    )
  }, [response])

  useEffect(() => {
    handleVerification()
  }, [])

  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000)
    if (timer === 0)
      router.push('/dashboard')
  }, [timer])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {response && handleMessage}
          <p className='font-light text-slate-400 mt-4 text-sm text-center'>Você será redirecionado para o Dashboard em {timer}</p>
          <NextLink href='/dashboard'>
            <Button
              variant='solid'
              color='primary'
              className="w-full mt-10"
            >
              Dashboard
            </Button>
          </NextLink>
        </>
      )}
    </>
  );
};