import { AboutService } from "@/services/about";
import CustomCard from "./customCard";
import { Section, SectionContent, SectionDescription, SectionHeader, SectionTitle } from "./section";

export default async function About() {
  const data = await AboutService.listAll();
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>
          Quem Somos
        </SectionTitle>
        <SectionDescription>
          Nosso compromisso é humanizar o acesso à Cannabis medicinal, oferecendo suporte e orientações que promovem um cuidado integral, enquanto incentivamos estudos para aprimorar sua aplicação.Visamos alcançar milhares de pacientes com informações relevantes sobre seus Tratamentos. Trabalhamos também para que haja uma conscientização sobre o uso terapêutico da Cannabis, rompendo tabus e preconceitos.
        </SectionDescription>
      </SectionHeader>
      <SectionContent className="flex-row gap-x-10 mt-20 items-stretch flex-wrap justify-center">
        {data.map((item: any) => (
          <CustomCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            body={item.description}
          />
        ))}
      </SectionContent>
    </Section>
  )
}