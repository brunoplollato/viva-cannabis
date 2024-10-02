import { AboutCards } from "@/components/about";
import { AboutService } from "@/services/about";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Viva Cannabis - Dashboard | Sobre'
  }
}

const about = async () => {
  const aboutCards: any[] = await AboutService.listAll();
  return <AboutCards data={aboutCards} />;
};

export default about;
