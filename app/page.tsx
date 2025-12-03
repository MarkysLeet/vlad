import Header from "@/components/layout/Header";
import FooterTeaser from "@/components/layout/FooterTeaser";
import HeroCanvas from "@/components/hero/HeroCanvas";
import ConfiguratorSection from "@/components/configurator/ConfiguratorSection";

export default function Home() {
  return (
    <main className="min-h-screen pt-20">
      <Header />
      
      <HeroCanvas />

      <ConfiguratorSection />

      <FooterTeaser />
    </main>
  );
}
