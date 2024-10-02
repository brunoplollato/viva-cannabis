import { Partners } from "@/components/partners";
import { PartnersService } from "@/services/partners";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Viva Cannabis - Dashboard | Parceiros'
  }
}

const partners = async () => {
  const partners: any[] = await PartnersService.listAll();
  return <Partners data={partners} />;
};

export default partners;
