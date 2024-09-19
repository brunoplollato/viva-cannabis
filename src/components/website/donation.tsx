import { Button } from "../ui/button";
import { Section, SectionContent, SectionDescription, SectionHeader, SectionSubtitle, SectionTitle } from "./section";

export default function Donation() {
  return (
    <Section variant="green">
      <SectionHeader>
        <SectionSubtitle>
          Campanha de Doação
        </SectionSubtitle>
        <SectionTitle>
          Ajude a VivaCannabis Doando
        </SectionTitle>
      </SectionHeader>
      <SectionContent>
        <SectionDescription>
          Junte-se a nós como agente de mudança ao doar para nossa causa! Seus fundos impulsionarão projetos de pesquisa inovadores e divulgação de informaçõessobre os usos terapêuticos da cannabis.
        </SectionDescription>
        <Button className="bg-[#512DA8]">
          Contribuir
        </Button>
      </SectionContent>
    </Section>
  )
}