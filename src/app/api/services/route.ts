export const dynamic = 'force-static'
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const data = [
    {
      id: 1,
      icon: 'BriefcaseIcon',
      title: 'Orientação Médica',
      description: 'As parcerias com profissionais de Saúde e pesquisadores promovem o fomento necessário para a evolução no conhecimento e no desenvolvimento de pesquisas científicas com a Associação.'
    },
    {
      id: 2,
      icon: 'FaceSmileIcon',
      title: 'Acolhimento ao Paciente',
      description: 'Entre em contato e encontre todas as informações necessárias para começar um tratamento usando a terapêutica canabinoide.'
    },
    {
      id: 3,
      icon: 'LifebuoyIcon',
      title: 'Suporte ao Tratamento',
      description: 'A VIVACANNABIS conta com uma equipe para tirar dúvidas e acompanhar o tratamento com a terapêutica canabinoide.'
    },
    {
      id: 4,
      icon: 'ScaleIcon',
      title: 'Apoio Jurídico',
      description: 'Na nossa associação, defendemos os direitos dos nossos associados, fornecendo o apoiojurídico necessário para garantir o acesso ao remédio.'
    },
    {
      id: 5,
      icon: 'MagnifyingGlassCircleIcon',
      title: 'Pesquisas VivaCannabis',
      description: 'Buscamos a inovação e incentivamos as pesquisas sobre cannabis. Na Viva Cannabis, nosso compromisso com o desenvolvimento científico e social é evidente.'
    },
    {
      id: 6,
      icon: 'CalendarDaysIcon',
      title: 'Cursos & Eventos',
      description: 'Promovemos cursos, palestras e eventos para expandir o conhecimento a cerca do temae fortalecer a união da comunidade Canábica em todo o Brasil'
    },
  ]
  return NextResponse.json(data);
}