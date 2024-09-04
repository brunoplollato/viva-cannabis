export const dynamic = 'force-static'
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const data = [
    {
      id: 1,
      image: '',
      category: 'Extrato',
      title: 'Extrato de Cannabis Full Spectrum',
      description: 'Descubra o poder do extrato de cannabis Full Spectrum 1%. Rico em uma variedade de compostos naturais da planta, este extrato oferece uma experiência completa e holística.'
    },
    {
      id: 2,
      image: '',
      category: 'Extrato',
      title: 'Extrato de Cannabis Full Spectrum',
      description: 'Descubra o poder do extrato de cannabis Full Spectrum 1%. Rico em uma variedade de compostos naturais da planta, este extrato oferece uma experiência completa e holística.'
    },
    {
      id: 3,
      image: '',
      category: 'Extrato',
      title: 'Extrato de Cannabis Full Spectrum',
      description: 'Descubra o poder do extrato de cannabis Full Spectrum 1%. Rico em uma variedade de compostos naturais da planta, este extrato oferece uma experiência completa e holística.'
    },
    {
      id: 4,
      image: '',
      category: 'Extrato',
      title: 'Extrato de Cannabis Full Spectrum',
      description: 'Descubra o poder do extrato de cannabis Full Spectrum 1%. Rico em uma variedade de compostos naturais da planta, este extrato oferece uma experiência completa e holística.'
    },
    {
      id: 5,
      image: '',
      category: 'Extrato',
      title: 'Extrato de Cannabis Full Spectrum',
      description: 'Descubra o poder do extrato de cannabis Full Spectrum 1%. Rico em uma variedade de compostos naturais da planta, este extrato oferece uma experiência completa e holística.'
    },
    {
      id: 6 ,
      image: '',
      category: 'Extrato',
      title: 'Extrato de Cannabis Full Spectrum',
      description: 'Descubra o poder do extrato de cannabis Full Spectrum 1%. Rico em uma variedade de compostos naturais da planta, este extrato oferece uma experiência completa e holística.'
    },
  ]
  return NextResponse.json(data);
}