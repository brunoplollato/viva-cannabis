import { Services } from "@/components/services";
import { ServicesService } from "@/services/services";

const services = async () => {
  const services: any[] = await ServicesService.listAll();
  return <Services data={services} />;
};

export default services;
