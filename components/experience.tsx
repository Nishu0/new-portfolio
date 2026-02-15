import { AccordionItem } from "@/components/accordion-item";
import { Tags } from "@/components/tags";
import { Timeline } from "@/components/timeline";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section style={{ marginBottom: 64 }}>
      <h2 style={{ fontSize: 14, color: "#fff", marginBottom: 24 }}>
        Work experience ({experience.length})
      </h2>
      {experience.map((exp, i) => (
        <AccordionItem
          key={i}
          header={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <span style={{ fontSize: 14, color: "#ccc" }}>
                {exp.company}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#555",
                  letterSpacing: "0.1em",
                }}
              >
                {exp.role} / {exp.period}
              </span>
            </div>
          }
        >
          <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>
            {exp.description}
          </p>
          {exp.timeline && <Timeline items={exp.timeline} />}
          <Tags items={exp.tags} />
        </AccordionItem>
      ))}
    </section>
  );
}
