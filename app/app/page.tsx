"use client";

import { useMemo, useState } from "react";

type EvidenceType = "parte" | "posicion" | "papel" | "persona";

type EvidenceItem = {
  id: string;
  type: EvidenceType;
  title: string;
  content: string;
  fileName?: string;
};

type Investigation = {
  id: string;
  title: string;
  eventDescription: string;
  date: string;
  location: string;
  severity: string;
  peopleInvolved: string;
  methodology: "systemic";
  status: "draft" | "generated";
  evidence: EvidenceItem[];
  report: ReportSections | null;
};

type ReportSections = {
  executiveSummary: string;
  factualDescription: string;
  evidenceReviewed: string;
  categoryAnalysis: string;
  contributingFactors: string;
  systemicInterpretation: string;
  causalHypotheses: string;
  informationGaps: string;
  recommendations: string;
  conclusion: string;
};

const evidenceOptions: Array<{ value: EvidenceType; label: string; cue: string }> = [
  { value: "parte", label: "Parte", cue: "Hecho inmediato, lesión, daño, secuencia visible" },
  { value: "posicion", label: "Posición", cue: "Ubicación, postura, entorno físico, distancias, layout" },
  { value: "papel", label: "Papel", cue: "Procedimientos, permisos, normas, registros, documentos" },
  { value: "persona", label: "Persona", cue: "Decisiones, capacitación, carga mental, comunicación, roles" },
];

const seedInvestigation: Investigation = {
  id: "inv-demo",
  title: "Caída al descender de plataforma móvil",
  eventDescription:
    "Un operario sufrió una caída leve al descender de una plataforma móvil durante el cierre del turno. El equipo multidisciplinario necesita ordenar la evidencia y generar un primer borrador de investigación sistémica.",
  date: "2026-03-26",
  location: "Planta piloto / sector despacho",
  severity: "Lesión leve",
  peopleInvolved: "Operario de turno tarde, supervisor, mantenimiento",
  methodology: "systemic",
  status: "generated",
  evidence: [
    {
      id: "ev-1",
      type: "parte",
      title: "Parte inicial del evento",
      content:
        "El operario refirió resbalón al apoyar el pie derecho fuera de la plataforma. Se observó golpe en rodilla y detención breve de tareas.",
    },
    {
      id: "ev-2",
      type: "posicion",
      title: "Observación del entorno",
      content:
        "La plataforma estaba orientada en diagonal respecto del pasillo. Había humedad superficial y un desnivel leve entre el borde y el piso del sector.",
    },
    {
      id: "ev-3",
      type: "papel",
      title: "Procedimiento vigente",
      content:
        "El instructivo de uso de plataforma no menciona verificación de superficie húmeda ni chequeo del punto de descenso antes del cierre de turno.",
    },
    {
      id: "ev-4",
      type: "persona",
      title: "Declaración del supervisor",
      content:
        "El supervisor indicó que el cierre del turno venía demorado y que el equipo estaba apurado por liberar el sector para limpieza.",
    },
  ],
  report: null,
};

seedInvestigation.report = buildReport(seedInvestigation);

export default function Home() {
  const [investigation, setInvestigation] = useState<Investigation>(seedInvestigation);
  const [evidenceDraft, setEvidenceDraft] = useState<EvidenceItem>({
    id: "",
    type: "parte",
    title: "",
    content: "",
    fileName: "",
  });

  const groupedEvidence = useMemo(() => {
    return evidenceOptions.map((option) => ({
      ...option,
      items: investigation.evidence.filter((item) => item.type === option.value),
    }));
  }, [investigation.evidence]);

  function updateField<K extends keyof Investigation>(key: K, value: Investigation[K]) {
    setInvestigation((current) => ({ ...current, [key]: value }));
  }

  function addEvidence() {
    if (!evidenceDraft.title.trim() || !evidenceDraft.content.trim()) return;
    setInvestigation((current) => ({
      ...current,
      status: "draft",
      evidence: [
        ...current.evidence,
        {
          ...evidenceDraft,
          id: crypto.randomUUID(),
        },
      ],
    }));
    setEvidenceDraft({ id: "", type: "parte", title: "", content: "", fileName: "" });
  }

  function generateReport() {
    setInvestigation((current) => ({
      ...current,
      status: "generated",
      report: buildReport(current),
    }));
  }

  function updateReport(section: keyof ReportSections, value: string) {
    setInvestigation((current) => {
      if (!current.report) return current;
      return {
        ...current,
        report: {
          ...current.report,
          [section]: value,
        },
      };
    });
  }

  const report = investigation.report;

  return (
    <main className="workspace-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Incident Investigator AI</p>
          <h1>Investigación sistémica asistida, sin humo y sin base de datos.</h1>
          <p className="hero-copy">
            Demo en memoria para mostrar el flujo completo: descripción del evento, evidencia clasificada,
            generación de borrador y edición humana del informe final.
          </p>
        </div>
        <div className="hero-stats">
          <StatCard label="Metodología" value="Enfoque sistémico" />
          <StatCard label="Modo" value="In-memory MVP" />
          <StatCard label="Estado" value={investigation.status === "generated" ? "Borrador listo" : "Pendiente de generar"} />
        </div>
      </section>

      <section className="grid-shell">
        <div className="column stack-lg">
          <Panel title="1. Contexto del caso" subtitle="Base mínima para que el equipo empiece con algo serio.">
            <div className="form-grid two-up">
              <Field label="Título del caso">
                <input value={investigation.title} onChange={(e) => updateField("title", e.target.value)} />
              </Field>
              <Field label="Fecha">
                <input type="date" value={investigation.date} onChange={(e) => updateField("date", e.target.value)} />
              </Field>
              <Field label="Ubicación">
                <input value={investigation.location} onChange={(e) => updateField("location", e.target.value)} />
              </Field>
              <Field label="Severidad">
                <input value={investigation.severity} onChange={(e) => updateField("severity", e.target.value)} />
              </Field>
            </div>
            <Field label="Personas / roles involucrados">
              <input value={investigation.peopleInvolved} onChange={(e) => updateField("peopleInvolved", e.target.value)} />
            </Field>
            <Field label="Descripción breve del evento">
              <textarea value={investigation.eventDescription} onChange={(e) => updateField("eventDescription", e.target.value)} rows={5} />
            </Field>
          </Panel>

          <Panel title="2. Evidencias" subtitle="Texto manual + referencia de adjuntos. Todo queda clasificado por tipo.">
            <div className="evidence-hints">
              {evidenceOptions.map((option) => (
                <div key={option.value} className="hint-card">
                  <strong>{option.label}</strong>
                  <span>{option.cue}</span>
                </div>
              ))}
            </div>

            <div className="form-grid two-up">
              <Field label="Tipo de evidencia">
                <select value={evidenceDraft.type} onChange={(e) => setEvidenceDraft((c) => ({ ...c, type: e.target.value as EvidenceType }))}>
                  {evidenceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Nombre del archivo (opcional)">
                <input value={evidenceDraft.fileName} onChange={(e) => setEvidenceDraft((c) => ({ ...c, fileName: e.target.value }))} placeholder="foto-escena.jpg / entrevista.pdf" />
              </Field>
            </div>
            <Field label="Título de la evidencia">
              <input value={evidenceDraft.title} onChange={(e) => setEvidenceDraft((c) => ({ ...c, title: e.target.value }))} />
            </Field>
            <Field label="Contenido / resumen">
              <textarea value={evidenceDraft.content} onChange={(e) => setEvidenceDraft((c) => ({ ...c, content: e.target.value }))} rows={5} />
            </Field>
            <div className="actions-row">
              <button className="primary" onClick={addEvidence}>Agregar evidencia</button>
              <button className="ghost" onClick={generateReport}>Generar borrador sistémico</button>
            </div>

            <div className="evidence-groups">
              {groupedEvidence.map((group) => (
                <div key={group.value} className="evidence-group">
                  <div className="group-heading">
                    <h3>{group.label}</h3>
                    <span>{group.items.length} items</span>
                  </div>
                  <div className="group-list">
                    {group.items.map((item) => (
                      <article key={item.id} className="evidence-card">
                        <div className="evidence-title-row">
                          <strong>{item.title}</strong>
                          {item.fileName ? <span>{item.fileName}</span> : null}
                        </div>
                        <p>{item.content}</p>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="column stack-lg">
          <Panel title="3. Informe generado" subtitle="Borrador formal, editable por el equipo. Nada se persiste: es solo demo en memoria.">
            <div className="report-toolbar">
              <span className="method-chip">Systemic / editable</span>
              <button className="primary" onClick={generateReport}>Regenerar borrador</button>
            </div>

            {report ? (
              <div className="report-editor">
                <ReportSection title="Resumen ejecutivo" value={report.executiveSummary} onChange={(value) => updateReport("executiveSummary", value)} />
                <ReportSection title="Descripción factual" value={report.factualDescription} onChange={(value) => updateReport("factualDescription", value)} />
                <ReportSection title="Evidencia revisada" value={report.evidenceReviewed} onChange={(value) => updateReport("evidenceReviewed", value)} />
                <ReportSection title="Análisis por categoría" value={report.categoryAnalysis} onChange={(value) => updateReport("categoryAnalysis", value)} />
                <ReportSection title="Factores contribuyentes" value={report.contributingFactors} onChange={(value) => updateReport("contributingFactors", value)} />
                <ReportSection title="Interpretación sistémica" value={report.systemicInterpretation} onChange={(value) => updateReport("systemicInterpretation", value)} />
                <ReportSection title="Hipótesis causales" value={report.causalHypotheses} onChange={(value) => updateReport("causalHypotheses", value)} />
                <ReportSection title="Vacíos de información" value={report.informationGaps} onChange={(value) => updateReport("informationGaps", value)} />
                <ReportSection title="Recomendaciones" value={report.recommendations} onChange={(value) => updateReport("recommendations", value)} />
                <ReportSection title="Conclusión" value={report.conclusion} onChange={(value) => updateReport("conclusion", value)} />
              </div>
            ) : (
              <div className="empty-report">
                <p>No hay borrador todavía.</p>
                <button className="primary" onClick={generateReport}>Generar informe</button>
              </div>
            )}
          </Panel>
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function ReportSection({ title, value, onChange }: { title: string; value: string; onChange: (value: string) => void }) {
  return (
    <section className="report-section">
      <div className="report-head">
        <h3>{title}</h3>
      </div>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={6} />
    </section>
  );
}

function buildReport(investigation: Investigation): ReportSections {
  const grouped = evidenceOptions
    .map((option) => {
      const items = investigation.evidence.filter((item) => item.type === option.value);
      return { option, items };
    })
    .filter((group) => group.items.length > 0);

  const evidenceReviewed = grouped
    .map((group) => `- ${group.option.label}: ${group.items.map((item) => item.title).join(", ")}`)
    .join("\n");

  const categoryAnalysis = grouped
    .map(
      (group) =>
        `${group.option.label}: ${group.items
          .map((item) => item.content)
          .join(" ")}`
    )
    .join("\n\n");

  const missing = evidenceOptions
    .filter((option) => !investigation.evidence.some((item) => item.type === option.value))
    .map((option) => option.label);

  return {
    executiveSummary: `El evento "${investigation.title}" se analiza como una interacción entre condiciones del entorno, decisiones operativas, diseño del trabajo y controles insuficientes. La app propone un borrador inicial para que el equipo multidisciplinario refine la investigación, sin presentar las conclusiones como verdad cerrada.`,
    factualDescription: `${investigation.eventDescription}\n\nFecha: ${investigation.date || "No informada"}. Lugar: ${investigation.location || "No informado"}. Severidad: ${investigation.severity || "Sin clasificar"}. Involucrados: ${investigation.peopleInvolved || "No detallados"}.`,
    evidenceReviewed: evidenceReviewed || "Todavía no se cargaron evidencias suficientes para un análisis serio.",
    categoryAnalysis:
      categoryAnalysis ||
      "La evidencia disponible todavía es limitada. El equipo debería reforzar observaciones del entorno, documentos aplicables y testimonios clave.",
    contributingFactors:
      "Se observan factores combinados: presión operativa o temporal, controles preventivos poco específicos, dependencia de criterio individual y condiciones del entorno físico que habilitan el desvío o aumentan la exposición.",
    systemicInterpretation:
      "Desde un enfoque sistémico, el evento no se interpreta como una falla aislada de una persona sino como una salida emergente de múltiples capas: contexto de producción, procedimientos, supervisión, entorno físico y capacidad del sistema para anticipar variabilidad normal del trabajo.",
    causalHypotheses:
      "Hipótesis 1: el sistema no aseguró un punto de operación/descenso suficientemente controlado.\nHipótesis 2: el procedimiento o los controles no contemplaron explícitamente la condición real del trabajo.\nHipótesis 3: el apuro operativo redujo márgenes de chequeo antes de ejecutar la maniobra.",
    informationGaps:
      missing.length
        ? `Falta reforzar evidencia en estas categorías: ${missing.join(", ")}. También conviene confirmar secuencia temporal, condiciones ambientales y antecedentes de eventos similares.`
        : "Aunque las cuatro categorías están presentes, todavía sería útil contar con cronología detallada, registros históricos y validación cruzada entre testimonios y documentación.",
    recommendations:
      "1. Revisar el punto exacto de exposición y rediseñar barreras o controles físicos.\n2. Ajustar procedimiento y checklist para contemplar condiciones reales de operación.\n3. Reforzar supervisión del cierre de turno y gestión de presión temporal.\n4. Validar entrenamiento y criterio de uso seguro en situaciones no ideales.\n5. Registrar hallazgos y acciones para aprendizaje sistémico, no solo corrección puntual.",
    conclusion:
      "El borrador sugiere que el accidente surge de una combinación de contexto, decisiones operativas y defensas incompletas. La versión final debe cerrarse con revisión humana del equipo, contraste entre evidencias y priorización de acciones correctivas proporcionales.",
  };
}
