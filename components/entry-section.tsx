import { EntryRow } from "@/components/entry-row";
import { Reveal } from "@/components/reveal";
import type { Entry } from "@/lib/data";

export function EntrySection({
  label,
  entries,
}: {
  label: string;
  entries: Entry[];
}) {
  return (
    <section className="section">
      <Reveal>
        <h2 className="sectionLabel">{label}</h2>
      </Reveal>
      <div>
        {entries.map((entry, i) => (
          <Reveal key={`${entry.org}-${entry.role}`} delay={i * 60}>
            <EntryRow entry={entry} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
