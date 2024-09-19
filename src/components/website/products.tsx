import { ProductsProps } from "@/types/DTO";
import { Section, SectionContent, SectionDescription, SectionHeader, SectionTitle } from "./section";

export default function Products(props: { data: ProductsProps }) {
  const { data } = props;
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>
          Produtos
        </SectionTitle>
        <SectionDescription>
          Descubra a linha completa de produtos Full Spectrum, projetada para oferecer uma experiência holística e de alta qualidade. Desde nossos extratos de Cannabis em várias concentrações até nosso spray nasal e pomada, cada produto é cuidadosamente formulado para proporcionar benefícios terapêuticos completos.
        </SectionDescription>
      </SectionHeader>
      <SectionContent>
      </SectionContent>
    </Section>
  )
}