# PRD: Incident Investigator AI

## 1. Overview

Incident Investigator AI is a web application for multidisciplinary teams investigating personal accidents. Users provide a short event description and supporting evidence across four categories — parte, posición, papel, and persona — and the system generates a formal, editable investigation report using a systemic analysis methodology.

The MVP goal is not to replace investigators. It is to accelerate the first structured draft, improve consistency, and make it easier for teams to refine a shared investigation.

## 2. Goals

- Reduce time from raw evidence to first investigation draft.
- Standardize investigation structure across cases.
- Preserve traceability between evidence and conclusions.
- Let human investigators edit and refine every generated section.
- Support a multidisciplinary workflow without requiring complex setup.

## 3. Users

Primary users:
- Safety / HSE professionals
- Supervisors and operations leads
- Human factors or process investigators
- Multidisciplinary incident review teams

## 4. MVP Scope

The MVP includes:
- Create a new investigation
- Capture a short event description and basic case metadata
- Upload and classify evidence into four categories:
  - Parte
  - Posición
  - Papel
  - Persona
- Generate a systemic-analysis investigation draft using AI
- Review and edit the generated report
- Save and reopen investigations
- Export or copy the final report

## 5. User Stories

### US-001: Create investigation

**Description:** As an investigator, I want to create a new investigation with basic event context so that the case starts with a clear foundation.

**BDD Spec:**
- Given: I am on the investigation dashboard
- When: I create a new investigation and enter basic event details
- Then: The case is saved and ready for evidence upload

**Acceptance Criteria:**
- [ ] User can create a new investigation
- [ ] Required fields: title, short event description
- [ ] Optional MVP metadata: date, location, severity, people involved
- [ ] Investigation is persisted and visible in the dashboard

### US-002: Upload and classify evidence

**Description:** As an investigator, I want to upload evidence and classify it by evidence type so that the system can use it during analysis.

**BDD Spec:**
- Given: An investigation exists
- When: I upload text or files and assign evidence categories
- Then: Each evidence item is stored with its category and linked to the investigation

**Acceptance Criteria:**
- [ ] User can add evidence items to an investigation
- [ ] Evidence categories supported: parte, posición, papel, persona
- [ ] User can enter free text and attach files
- [ ] Evidence items are editable after creation

### US-003: Generate systemic investigation draft

**Description:** As an investigator, I want the system to generate a first-pass investigation draft so that the team can start from a structured analysis instead of a blank page.

**BDD Spec:**
- Given: An investigation has an event description and evidence items
- When: I click generate
- Then: The system produces a structured draft based on the systemic methodology

**Acceptance Criteria:**
- [ ] System generates a report draft from available evidence
- [ ] Draft includes sections for facts, evidence interpretation, contributing factors, systemic analysis, information gaps, and recommendations
- [ ] Draft clearly reflects missing evidence when input is incomplete
- [ ] Generated draft is saved to the investigation

### US-004: Edit generated report

**Description:** As an investigator, I want to edit the generated report so that the final output reflects human judgment and team consensus.

**BDD Spec:**
- Given: A draft exists
- When: I edit sections of the investigation report
- Then: My edits are saved and shown when the investigation is reopened

**Acceptance Criteria:**
- [ ] Report sections are editable in the UI
- [ ] User edits are saved separately from generated content
- [ ] Investigation can be reopened without losing edits
- [ ] User can regenerate without deleting manual edits unless explicitly confirmed

### US-005: Export final report

**Description:** As an investigator, I want to export the investigation so that I can share or archive it externally.

**BDD Spec:**
- Given: An investigation draft or final report exists
- When: I export the report
- Then: I receive a shareable output format

**Acceptance Criteria:**
- [ ] User can copy/export the report contents
- [ ] MVP export can be markdown or printable HTML
- [ ] Export preserves section structure and evidence references

## 6. Functional Requirements

- FR-1: The system must allow users to create and save investigations.
- FR-2: Each investigation must store a short event description and basic metadata.
- FR-3: The system must support four evidence categories: parte, posición, papel, persona.
- FR-4: The system must allow free-text evidence entry and file attachments.
- FR-5: The system must generate a systemic-analysis draft based on the investigation input.
- FR-6: The generated report must include a formal structured output.
- FR-7: Users must be able to edit the generated report before finalizing it.
- FR-8: The system must preserve both source evidence and generated analysis.
- FR-9: Users must be able to export the investigation output.

## 7. Report Structure for MVP

The generated report should include these sections:
- Executive summary
- Event description
- Evidence reviewed
- Evidence analysis by category
- Contributing factors
- Systemic interpretation
- Hypotheses / causal understanding
- Information gaps
- Recommended actions
- Conclusion

## 8. Non-Goals

Out of scope for MVP:
- Multiple methodologies beyond systemic analysis
- Real-time multi-user collaboration
- Approval workflows
- Industry-specific regulatory reasoning engines
- Deep OCR / document intelligence pipelines
- Automatic action tracking after investigation closure

## 9. Design Considerations

- The workflow should feel guided, not bureaucratic.
- Evidence entry should be simple and forgiving.
- The generated report should look formal and professional.
- Investigators should always feel in control of the final output.

## 10. Technical Considerations

- Start with a single AI generation workflow using structured prompts.
- Store uploaded files and extracted text separately.
- Keep report sections addressable so individual sections can be edited or regenerated later.
- Optimize first for internal beta quality, not scale.

## 11. Success Metrics

- A user can create an investigation draft in under 15 minutes.
- Teams report meaningful reduction in time-to-first-report.
- Users judge the first generated draft as structurally useful, even if edits are still needed.
- At least one real beta investigation reaches a complete report using the app.

## 12. Open Questions

- What file types should be supported in beta?
- How much evidence traceability is required in the final report?
- Should recommendations be generated automatically in the MVP or remain investigator-authored?
- Is export-to-PDF required in beta, or is markdown/HTML enough?
