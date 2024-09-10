import { Partners } from "@/components/partners";
import { PartnersService } from "@/services/partners";

const partners = async () => {
  const partners: any[] = await PartnersService.listAll();
  return <Partners data={partners} />;
};

export default partners;
