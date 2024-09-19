import { Button } from "../ui/button";
import { Section, SectionContent, SectionHeader, SectionTitle } from "./section";

export default function WorkWithUs() {
  return (
    <Section variant="green">
      <div className="2xl:container flex items-center justify-center">
        <SectionHeader>
          <SectionTitle className="text-left text-[48px] pr-16">
            Quer fazer parte da Equipe da VIVA CANNABIS?
          </SectionTitle>
        </SectionHeader>
        <SectionContent className="w-auto">
          <Button>Trabalhe Conosco</Button>
        </SectionContent>
      </div>
    </Section>
  )
}