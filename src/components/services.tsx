import { ServicesProps } from "@/types/DTO";
import CustomCard from "./customCard";
import { Section, SectionContent, SectionDescription, SectionHeader, SectionTitle } from "./section";


export default function Services(props: { data: ServicesProps }) {
  const { data } = props;
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>
          Serviços
        </SectionTitle>
        <SectionDescription>
          A colaboração com profissionais de saúde e pesquisadores é fundamental para impulsionar o avanço médico e promover o desenvolvimento de pesquisas científicas em nossa Associação.
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