import { Services } from "@/components/services";
import { ServicesService } from "@/services/services";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Viva Cannabis - Dashboard | Serviços'
  }
}

const services = async () => {
  const services: any[] = await ServicesService.listAll();
  return <Services data={services} />;
};

export default services;
