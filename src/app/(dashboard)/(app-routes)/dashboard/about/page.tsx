import { AboutCards } from "@/components/about";
import { AboutService } from "@/services/about";

const about = async () => {
  const aboutCards: any[] = await AboutService.listAll();
  return <AboutCards data={aboutCards} />;
};

export default about;
