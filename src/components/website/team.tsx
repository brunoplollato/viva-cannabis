import { PartnersService } from "@/services/partners";
import CustomCarousel from "./customcarousel";
import { Section, SectionContent, SectionHeader, SectionTitle } from "./section";

export default async function Team() {
  const team = await PartnersService.listAll();
  return (
    <Section variant="green">
      <SectionHeader>
        <SectionTitle>
          Nosso Time
        </SectionTitle>
      </SectionHeader>
      <SectionContent>
        <CustomCarousel items={team} />
      </SectionContent>
    </Section>
  )
}