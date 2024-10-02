import About from "@/components/website/about";
import Blog from "@/components/website/blog";
import Contact from "@/components/website/contact";
import Donation from "@/components/website/donation";
import Hero from "@/components/website/hero";
import Products from "@/components/website/products";
import Services from "@/components/website/services";
import Team from "@/components/website/team";
import WorkWithUs from "@/components/website/workWithUs";
import { get } from "@/lib/api";
import { PostProps, ProductsProps } from "@/types/DTO";


export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero header="Seja um apoiador da" highlight="Cannabis Medicinal" body="Experimente uma vida livre de dores e dependência demedicamentos convencionais, conheça a Cannabis medicinal. São mais de 100 pacientes com acesso a uma melhor qualidade de vida." image="/banner-1.png" />
      {/* <Products /> */}
      <Donation />
      <About />
      <Team />
      <Services />
      <Hero header="Seja um apoiador da" highlight="Cannabis Medicinal" body="Experimente uma vida livre de dores e dependência demedicamentos convencionais, conheça a Cannabis medicinal. São mais de 100 pacientes com acesso a uma melhor qualidade de vida." image="/banner-1.png" />
      <Contact />
      <WorkWithUs />
      <Blog />
    </main>
  );
}
