# Ganrich PDF Insight System

## Governing principle

The PDF is the authoritative source. The web page is the editorial experience. The embedded reader is the verification layer.

No title, author, date, finding, statistic, implication, source, or credential may be published unless it appears in the PDF or is explicitly supplied and approved by an authorized editor. A source-empty demonstration remains empty.

## 1. PDF upload user flow

1. An authenticated editor opens **Add PDF Insight / PDF İçgörüsü Ekle**.
2. The editor drops one or more PDFs or uses the file picker.
3. The client validates format and the server validates format and the 25 MB limit.
4. The server computes a SHA-256 checksum and rejects duplicates.
5. The PDF bytes are stored privately in object storage.
6. Durable identity, file, version, status, and governance metadata are stored in the database.
7. The new record enters `review_required`; nothing publishes automatically.
8. The editor compares the source PDF and web-native fields side by side.
9. The editor saves a preview, completes governance checks, and explicitly publishes.

## 2. CMS upload interface

Implemented editor route:

- English: `/en/insights/pdf-studio`
- Turkish: `/tr/icgoruler/pdf-studyosu`

The interface includes:

- Authenticated editor identity
- Six-step workflow
- Drag-and-drop and multiple-file selection
- Upload progress
- Retry-ready error states
- Queue and per-document status
- Side-by-side PDF/editorial review
- Preview and publication controls

Supporting files remain outside the automatic publication path.

## 3. Processing and extraction architecture

Current production intake performs authoritative file validation, checksum detection, version creation, secure storage, and review-state creation. It never fabricates extraction output.

The extraction extension point is:

1. Read embedded text.
2. Preserve page order and page references.
3. Detect language and document type.
4. Identify headings, tables, charts, captions, citations, methodology, and appendices.
5. Use OCR only when embedded text is unavailable.
6. Store confidence per extracted block.
7. Flag unreadable pages explicitly.
8. Return suggestions to `review_required`, never directly to `published`.

An approved OCR or document-intelligence provider must be connected before automatic extraction is enabled. Its output must populate proposed fields with provenance labels, not final fields.

## 4. Metadata-review interface

The implemented review panel supports:

- Title and subtitle
- Content type
- Document language
- Author
- Publication date
- Page count
- Executive thesis
- Executive summary
- Key findings with page references
- Leadership implications
- Methodology
- Limitations
- Access model
- AI retrieval approval
- Rights, confidentiality, personal-data, source, translation, and final-publication checks

The filename-derived title is labeled as requiring confirmation.

## 5. Side-by-side editorial review screen

The left pane preserves the original PDF and reader controls. The right pane contains editable web-native fields and governance controls. The layout stacks safely on smaller screens. Editors can verify claims without leaving the page.

## 6. Existing Insight schema extensions

Database tables:

- `pdf_insights`: identity, publication, editorial, classification, document, conversion, AI, governance, and publication fields.
- `pdf_insight_versions`: immutable version-level object keys, checksums, upload attribution, and change summaries.

Structured lists are stored as JSON text in D1 and mapped into typed records at the application boundary.

## 7. Web-native report-page template

Published PDF insight routes:

- English: `/en/insights/report/[slug]`
- Turkish: `/tr/icgoruler/rapor/[slug]`

The page renders only supported sections:

- Breadcrumb and report metadata
- Editorial cover treatment
- Executive thesis
- Executive summary
- Source-supported key findings
- Optional editor-approved implications
- Sources and methodology
- Embedded original PDF
- Relevant decision-tool and briefing paths

Empty editorial sections are omitted.

## 8. Embedded PDF-reader design

The reader is visually subordinate to the insight:

- Lazy loaded on public report pages
- Immediate in editorial review
- Page controls and page entry
- Browser-native search, zoom, print, and full-screen functions inside the reader
- Open-original and permitted download controls
- Keyboard-accessible controls
- Mobile open/download fallback
- Session URL state through `report-page`

The file endpoint returns the original stored bytes with safe PDF headers.

## 9. Insights hub card integration

Published database-backed reports are loaded into the existing Insights publication stream and use its typography, card proportions, metadata language, hover behavior, and editorial illustration system. No separate document library is created.

## 10. Chart and table extraction workflow

Chart or table publication remains approval-gated:

1. Select the exact PDF page and visual bounds.
2. Preserve caption, source, page, units, period, notes, caveats, and rights.
3. Prefer the original high-resolution visual.
4. Recreate only from verified source data and after editorial approval.
5. Provide alt text and a semantic data equivalent when reliable.
6. Use the original image plus description when extraction is uncertain.
7. Never estimate missing values.

## 11. Bilingual publication workflow

The data model records each item’s language and supports separate English and Turkish records. Each public route selects its own language record. Machine translations do not publish automatically. Translation review is an explicit governance control.

Next schema extension for paired documents: `translation_group_id` and `alternate_insight_id`. Add only when the first paired-language PDF is available.

## 12. Lead-gating options

Implemented access choices:

- Fully ungated
- Web summary open, PDF gated
- Public summary, briefing by request
- Private or invitation-only

The default is fully ungated. Published, fully ungated records expose the embedded reader and document endpoint. PDF-gated and briefing-by-request records expose the approved editorial page but replace the reader with a request path; private records require editor authentication and are excluded from discovery. Automated gated file delivery still requires a reviewed privacy notice and secure CRM endpoint before activation.

## 13. AI retrieval approval workflow

`ai_retrieval_approved` is independent from publication. A report can be published without entering Ask Ganrich. Future indexing must:

- Chunk by section and PDF page
- Include title, version, language, and page
- Exclude restricted sections
- Retire superseded versions from active retrieval
- Link every answer to the web page and original PDF page

The present Ask Ganrich interface is not connected to these records until the retrieval system is approved.

## 14. Version-control system

Each upload creates:

- A stable insight identity
- Version 1
- An immutable version row
- A versioned object-storage key
- Checksum and uploader attribution

Replacement workflow should create a new version row and object key, mark the previous version superseded, and retain the historical record. It must not overwrite stored bytes silently.

## 15. Rights and confidentiality checklist

Public publication requires:

- Rights confirmed
- Confidentiality reviewed
- Personal data reviewed
- Sources reviewed
- Final publication approved
- Title, executive thesis, and executive summary
- At least three page-traceable findings

Translation and AI-retrieval approvals remain separate.

## 16. SEO behavior

The web page is the canonical editorial result. Studio routes are `noindex, nofollow`. Public report metadata should be extended with record-specific title, description, publication date, author, structured data, canonical URL, and hreflang once the first approved report exists.

Direct storage keys and internal filenames are never linked publicly. PDF indexing defaults to controlled through the application endpoint.

## 17. Analytics event plan

Recommended consent-aware events:

- `pdf_insight_card_opened`
- `pdf_summary_read`
- `pdf_finding_opened`
- `pdf_source_page_opened`
- `pdf_reader_loaded`
- `pdf_page_changed`
- `pdf_opened_fullscreen`
- `pdf_downloaded`
- `pdf_provenance_opened`
- `pdf_language_switched`
- `pdf_briefing_selected`
- `pdf_added_to_briefing_tray`

Do not record private document contents or reader search queries.

## 18. Accessibility behavior

- Semantic web summary independent of PDF accessibility
- Ordered headings and metadata
- Visible focus states
- Keyboard-accessible reader controls
- Descriptive iframe and control labels
- Page-reference links that remain understandable outside visual context
- Text alternatives for important report-only content
- No hover-only actions
- Responsive reading order

No claim is made that an original PDF is accessible without validation.

## 19. Mobile behavior

- Studio queue scrolls horizontally and the review panes stack
- Metadata fields become single-column
- Reader controls wrap
- PDF iframe uses a bounded viewport
- The report cover and editorial sections become single-column
- Open-full-PDF and download controls remain visible
- The web-native summary loads before the reader

## 20. Error and edge states

Implemented:

- Wrong file type
- Empty file
- File above 25 MB
- Duplicate checksum
- Missing storage
- Missing authentication
- Missing stored object
- Publication missing required editorial or governance fields
- Upload network failure
- Empty source state

Required extraction-provider states:

- Password protected
- Unsupported encryption
- Corrupt structure
- Scanned or rotated pages
- Missing fonts
- Mixed page sizes
- Low-confidence OCR
- Conflicting metadata

These must resolve to `review_required` or `processing_failed`, never partial publication.

## 21. Batch-upload workflow

The upload endpoint and UI accept multiple PDFs. Every file receives its own checksum, durable record, version, status, and error. Individual editorial review remains mandatory; bulk publication is intentionally unavailable.

## 22. Production implementation

Runtime architecture:

- Vinext/React for public and editorial experiences
- D1 for structured insight and version records
- R2 for authoritative PDF bytes
- Workspace-authenticated editor identity
- Server-side authorization on every write and unpublished read
- Private Sites deployment
- Drizzle migration packaged with each version

## 23. Final QA

Acceptance checks:

- Build succeeds with all routes and APIs
- Existing English and Turkish site rendering remains intact
- Studio routes are authenticated and excluded from indexing
- D1 and R2 bindings are declared
- Migration includes insight and version tables
- Upload writes bytes before metadata and removes bytes when metadata creation fails
- Duplicate files are rejected by checksum
- Publication is impossible without governance approval
- Web pages omit unsupported sections
- Source-page links drive the verification reader
- Reader lazy loading protects main-content performance
- No representative report content is invented while no PDF is supplied

## First demonstration status

No representative PDF accompanied the implementation request. Therefore:

- The complete upload, review, storage, preview, publication, reader, card, and governance workflow is implemented.
- No sample author, publication date, thesis, finding, chart, or source was fabricated.
- The first real demonstration begins by uploading an authorized PDF in the studio.
- After upload, an editor must confirm the cover metadata and enter or approve source-grounded editorial fields before preview or publication.
