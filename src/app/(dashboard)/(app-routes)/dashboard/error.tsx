'use client' // Error boundaries must be Client Components

import { Button } from '@nextui-org/react'
import { ServerOffIcon } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className='flex flex-col justify-center items-center h-[calc(100vh-64px)]'>
      <ServerOffIcon size={100} />
      <h2 className='leading-10'>Alguma coisa deu errado!</h2>
      <Button
        color='success'
        className='text-white'
        onClick={
          () => reset()
        }
      >
        Tente novamente
      </Button>
    </div>
  )
}