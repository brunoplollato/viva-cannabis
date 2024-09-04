export const dynamic = 'force-static'
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const data = [
    {
      id: 1,
      icon: 'ExclamationCircleIcon',
      title: 'Missão',
      description: 'Temos uma missão muito simples: oferecer o melhor cuidado possível para o tratamento médico da Cannabis a todos os pacientes.'
    },
    {
      id: 2,
      icon: 'EyeIcon',
      title: 'Visão',
      description: 'Nossa visão é atender milhares de pacientes com informações relevantes sobre seu tratamento e unir-se ao mundo em uma nova abordagem da saúde.'
    },
    {
      id: 3,
      icon: 'HeartIcon',
      title: 'Valores',
      description: 'Acreditamos no poder da planta de cannabis para fomentar a transformação humana, e no bem que dela pode vir para saúde.'
    },
  ]
  return NextResponse.json(data);
}