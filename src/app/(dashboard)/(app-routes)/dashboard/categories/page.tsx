import { CategoriesService } from "@/services/categories";
import { Metadata } from "next";
import { Categories } from '../../../../../components/categories/index';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Viva Cannabis - Dashboard | Sobre'
  }
}

const categories = async () => {
  const categories = await CategoriesService.listAll();
  return <Categories data={categories as any} />;
};

export default categories;
