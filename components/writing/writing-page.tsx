import { StatusBar } from "@/components/status-bar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Shelf } from "@/components/writing/shelf";
import { articles } from "@/lib/writing";

/** The writing shelf. With `openSlug` set, that book starts open on top. */
export function WritingPage({ openSlug }: { openSlug?: string }) {
  return (
    <>
      <StatusBar />
      <div className="page">
        <Header />
        <main>
          <section className="section writing">
            <h1 className="sectionLabel">Writing</h1>
            <Shelf articles={articles} initialSlug={openSlug} />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
