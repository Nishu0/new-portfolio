import { EntryRow } from "@/components/entry-row";
import { Reveal } from "@/components/reveal";
import type { Entry } from "@/lib/data";

export function EntrySection({
  label,
  entries,
  timeline = false,
}: {
  label: string;
  entries: Entry[];
  /** Join the rows with a dashed line running down through the logos. */
  timeline?: boolean;
}) {
  return (
    <section className="section">
      <Reveal>
        <h2 className="sectionLabel">{label}</h2>
      </Reveal>
      <div className={timeline ? "timeline" : undefined}>
        {entries.map((entry, i) => (
          <Reveal key={`${entry.org}-${entry.role}`} delay={i * 60}>
            <EntryRow entry={entry} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
