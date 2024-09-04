import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='2xl:container flex flex-col items-center justify-center h-[calc(100vh-304px)]'>
      <h2 className='text-[200px] text-[#1B5E20] font-extrabold'>404</h2>
      <p className='text-xl font-semibold mb-10'>Página não econtrada</p>
      <Link href="/">
        <Button>
          Voltar para Home
        </Button>
      </Link>
    </div>
  )
}