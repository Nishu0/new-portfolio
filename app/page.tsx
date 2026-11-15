import { StatusBar } from "@/components/status-bar";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { EntrySection } from "@/components/entry-section";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { LogoTicker } from "@/components/logo-ticker";
import { Footer } from "@/components/footer";
import { experience, projects } from "@/lib/data";

export default function Page() {
  return (
    <>
      <StatusBar />
      <div className="page">
        <Header />
        <main>
          <Hero />
          <EntrySection label="Experience" entries={experience} timeline />
          <EntrySection label="Projects" entries={projects} />
          <Testimonials />
          <Contact />
          <LogoTicker />
        </main>
        <Footer />
      </div>
    </>
  );
}
