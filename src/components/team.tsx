import CustomCarousel from "./customcarousel";
import { Section, SectionContent, SectionHeader, SectionTitle } from "./section";
import TeamCard from "./teamCard";

type TeamProps = {
  id: number;
  image: string;
  title: string;
  description: string;
}[]

export default function Team() {
  return (
    <Section variant="green">
      <SectionHeader>
        <SectionTitle>
          Nosso Time
        </SectionTitle>
      </SectionHeader>
      <SectionContent>
        <CustomCarousel>
          <TeamCard name="Marcilio Andrade" role="Vice-presidente e Fundador" photo="/avatars/avatar-1.png" />
          <TeamCard name="Dr. Gustavo Chami" role="Médico Parceiro" photo="/avatars/avatar-1.png" />
          <TeamCard name="Bruno Lollato" role="Fundador" photo="/avatars/avatar-1.png" />
          <TeamCard name="Janaina Sales" role="Presidente e Fundadora" photo="/avatars/avatar-1.png" />
          <TeamCard name="Marcilio Andrade" role="Vice-presidente e Fundador" photo="/avatars/avatar-1.png" />
          <TeamCard name="Dr. Gustavo Chami" role="Médico Parceiro" photo="/avatars/avatar-1.png" />
          <TeamCard name="Bruno Lollato" role="Fundador" photo="/avatars/avatar-1.png" />
          <TeamCard name="Janaina Sales" role="Presidente e Fundadora" photo="/avatars/avatar-1.png" />
        </CustomCarousel>
      </SectionContent>
    </Section>
  )
}