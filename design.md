# Technical Design: Incident Investigator AI

## 1. Objective

Build a lightweight web application that lets a multidisciplinary team create a personal-accident investigation, upload evidence across four categories, generate a structured systemic-analysis draft using AI, and edit/export the final report.

## 2. Architecture

MVP architecture:
- **Frontend:** Next.js web app
- **Backend:** Next.js server actions / API routes or a small Node backend
- **Database:** Postgres (or Supabase Postgres for speed)
- **File storage:** Supabase Storage or S3-compatible storage
- **AI generation:** OpenAI-compatible model via server-side prompt orchestration

Recommended MVP path:
- Next.js + Supabase + Vercel
- Keep the stack small and fast to ship

## 3. Core Domain Model

### Investigation
- `id`
- `title`
- `event_description`
- `methodology` (`systemic` for MVP)
- `date`
- `location`
- `severity`
- `status` (`draft`, `generated`, `reviewed`, `final`)
- `created_at`
- `updated_at`

### Evidence
- `id`
- `investigation_id`
- `type` (`parte`, `posicion`, `papel`, `persona`)
- `title`
- `notes`
- `file_url`
- `extracted_text`
- `created_at`

### Report
- `id`
- `investigation_id`
- `version`
- `generated_summary`
- `generated_content`
- `edited_content`
- `created_at`
- `updated_at`

## 4. Main Workflow

### Step 1: Create investigation
User creates a case with:
- title
- short event description
- optional metadata

### Step 2: Add evidence
User uploads or writes evidence entries and tags each item as:
- parte
- posición
- papel
- persona

### Step 3: Generate draft
Server collects:
- event description
- metadata
- evidence text / summaries

Then sends a structured prompt to the model asking for a formal report with predefined sections.

### Step 4: Review and edit
The generated report is shown in editable sections.
Users can adjust language, conclusions, and recommendations.

### Step 5: Export
The final report is exported as markdown or printable HTML in MVP.

## 5. Prompting Strategy

The prompt should enforce:
- systemic methodology
- formal professional tone
- explicit treatment of uncertainty
- separation of facts, interpretation, and recommendations

### Prompt Inputs
- investigation metadata
- event description
- grouped evidence by category

### Prompt Output Shape
Use a structured JSON response with sections:
- executive_summary
- event_description
- evidence_reviewed
- evidence_analysis
- contributing_factors
- systemic_interpretation
- causal_hypotheses
- information_gaps
- recommendations
- conclusion

Then render that JSON into editable UI sections.

## 6. UI Structure

### Page 1: Dashboard
- list of investigations
- create new investigation
- filter by status

### Page 2: Investigation setup
- title
- description
- metadata
- methodology badge (`systemic` only)

### Page 3: Evidence workspace
- add evidence item
- upload file
- categorize item
- preview current evidence grouped by type

### Page 4: Report editor
- generate draft button
- loading/progress state
- editable report sections
- save changes
- export report

## 7. API Endpoints

### Investigations
- `POST /api/investigations`
- `GET /api/investigations`
- `GET /api/investigations/:id`
- `PATCH /api/investigations/:id`

### Evidence
- `POST /api/investigations/:id/evidence`
- `PATCH /api/evidence/:id`
- `DELETE /api/evidence/:id`

### Report generation
- `POST /api/investigations/:id/generate`
- `PATCH /api/investigations/:id/report`
- `GET /api/investigations/:id/report`

## 8. Generation Rules

The model should:
- use only the provided input
- clearly mark unknowns and information gaps
- avoid overclaiming certainty
- produce actionable but proportionate recommendations
- preserve traceability to evidence categories

## 9. Risks

### Risk 1: Hallucinated causal claims
Mitigation:
- prompt with explicit evidence boundaries
- separate facts from interpretation
- surface information gaps

### Risk 2: Weak report quality with sparse evidence
Mitigation:
- require minimum event description
- instruct model to show uncertainty
- add UI hints for missing evidence categories

### Risk 3: Over-engineering the beta
Mitigation:
- single methodology only
- simple export
- no collaboration workflow yet

## 10. MVP Milestones

### Milestone 1: Core CRUD
- create investigations
- upload evidence
- persist data

### Milestone 2: AI generation
- prompt assembly
- structured response
- report rendering

### Milestone 3: Editing + export
- editable report sections
- save edited report
- markdown / printable export

## 11. Future Extensions

After beta validation:
- support additional methodologies (e.g. 5 Whys)
- evidence traceability references inside each section
- collaborative comments/review
- PDF export
- OCR and document parsing
- action tracking after investigation closure
