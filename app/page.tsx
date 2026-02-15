import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Photos } from "@/components/photos";
import { Experience } from "@/components/experience";
import { Posts } from "@/components/posts";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <div
      style={{
        maxWidth: 620,
        margin: "0 auto",
        padding: "40px 20px 80px",
      }}
    >
      <Navbar />
      <Hero />
      <Photos />
      <Experience />
      <Posts />
      <Footer />
    </div>
  );
}
