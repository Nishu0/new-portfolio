import type { Metadata } from "next";
import { WritingPage } from "@/components/writing/writing-page";

export const metadata: Metadata = {
  title: "Writing | Nisarg Thakkar",
  description:
    "Essays on building, shipping, and staying sane while doing it.",
};

export default function Page() {
  return <WritingPage />;
}
