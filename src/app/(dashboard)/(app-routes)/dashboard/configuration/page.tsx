import Configuration from "@/components/configuration";
import { ConfigurationService } from "@/services/configuration";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Viva Cannabis - Dashboard | Configuração'
  }
}

const configuration = async () => {
  const configuration = await ConfigurationService.listAll();
  return <Configuration data={configuration as any} />;
};

export default configuration;
