import About from "@/components/about";
import Blog from "@/components/blog";
import Contact from "@/components/contact";
import Donation from "@/components/donation";
import Hero from "@/components/hero";
import Products from "@/components/products";
import Services from "@/components/services";
import Team from "@/components/team";
import WorkWithUs from "@/components/workWithUs";
import { get } from "@/lib/api";
import { AboutProps, PostProps, ProductsProps, ServicesProps } from "@/types/DTO";


export default async function Home() {
  const aboutCards: AboutProps = await get('/about/')
  const services: ServicesProps = await get('/services/')
  const products: ProductsProps = await get('/products/')
  const posts: PostProps = await get('/posts/')

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero header="Seja um apoiador da" highlight="Cannabis Medicinal" body="Experimente uma vida livre de dores e dependência demedicamentos convencionais, conheça a Cannabis medicinal. São mais de 100 pacientes com acesso a uma melhor qualidade de vida." image="/banner-1.png" />
      <Products data={products} />
      <Donation />
      <About data={aboutCards} />
      <Team />
      <Services data={services} />
      <Hero header="Seja um apoiador da" highlight="Cannabis Medicinal" body="Experimente uma vida livre de dores e dependência demedicamentos convencionais, conheça a Cannabis medicinal. São mais de 100 pacientes com acesso a uma melhor qualidade de vida." image="/banner-1.png" />
      <Contact />
      <WorkWithUs />
      <Blog data={posts} />
    </main>
  );
}
