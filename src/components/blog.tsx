import { PostProps } from "@/types/DTO";
import { Section, SectionContent, SectionDescription, SectionHeader, SectionTitle } from "./section";

export default function Blog(props: { data: PostProps }) {
  const { data } = props;
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>
          Notícias
        </SectionTitle>
        <SectionDescription>
          Últimas notícias sobre Cannabis Medicinal no Mundo.
        </SectionDescription>
      </SectionHeader>
      <SectionContent>
      </SectionContent>
    </Section>
  )
}