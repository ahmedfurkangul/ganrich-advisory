import type { InsightArticle, Lang } from "./content";

type InsightCard = readonly [string, string, string, string, string];

const en: InsightArticle[] = [
  {
    slug: "decision-quality-applied-ai",
    type: "Founder perspective",
    title: "Decision quality in the age of applied AI",
    thesis: "AI changes the evidence surface. Leadership still owns the choice.",
    applicability: "Use this when an AI initiative is producing possibilities faster than leadership can decide where value, risk, and accountability sit.",
    author: "Ahmed Furkan Gul",
    date: "2026-07-24",
    dateLabel: "24 July 2026",
    readingTime: "11 min",
    region: "Cross-regional",
    topic: "Applied AI",
    findings: [
      ["Coverage is not evidence", "More material becomes useful only when provenance, relevance, and uncertainty are visible."],
      ["Speed is not direction", "Faster iteration compounds value only after the decision and the evidence threshold are clear."],
      ["Synthesis is not judgment", "Recommendations require context, accountability, and explicit trade-offs."],
    ],
    analysis: [
      "Applied AI can widen research coverage, structure complex inputs, and accelerate scenario development. Those gains matter when they reduce a defined uncertainty or improve a consequential workflow.",
      "The management task is not to maximise generated output. It is to define the decision, the evidence threshold, the acceptable trade-offs, and the owner who will act.",
      "A disciplined value agenda connects each use case to an observable outcome, an operating change, and clear human accountability.",
    ],
    implications: [
      "Name the decision owner and deadline before selecting technology.",
      "Define what evidence would change the current position.",
      "Separate reversible experiments from irreversible commitments.",
    ],
    framework: ["Frame", "Evidence", "Challenge", "Commit"],
    frameworkTitle: "Decision-quality framework",
    counterargument: "Structured evidence and faster synthesis may improve a decision even when ownership and framing are imperfect; waiting for ideal governance can also create delay.",
    weakeningEvidence: "Repeated cases where automated synthesis produced durable value without explicit decision ownership, provenance controls, or trade-off management.",
    source: "Ganrich Advisory decision-quality framework, informed by the NIST AI RMF and OECD AI Principles.",
    sections: [
      {
        title: "Begin with the decision, not the model.",
        paragraphs: [
          "The easiest way to make an AI programme look active is to count models, pilots, prompts, or generated artefacts. None of those measures establishes that a better decision has been made. A decision has an owner, a deadline, a set of alternatives, constraints, and consequences. If those elements remain vague, AI increases the volume of material surrounding the issue without resolving the issue itself. The first design question is therefore managerial: which choice should become faster, better evidenced, more consistent, or easier to execute?",
          "This distinction changes prioritisation. A use case attached to a consequential and recurring decision can be evaluated against the quality of evidence, cycle time, error exposure, and value at stake. A use case attached only to a fashionable capability cannot. Leadership should ask whether the system improves a defined decision or workflow, what part remains human, and what observable change would justify further commitment. Technology selection follows that framing; it does not replace it.",
        ],
      },
      {
        title: "Build an evidence architecture.",
        paragraphs: [
          "AI makes it possible to search and combine more material than a team could review manually. The benefit is real, but so is a new risk: fluent synthesis can conceal weak provenance, missing context, or contradictory definitions. Evidence architecture means deciding which sources are permitted, how recency is handled, how claims are traced, and which uncertainties must remain visible. It also means distinguishing source material, model interpretation, and management judgment so that one is not presented as another.",
          "The practical standard should rise with the consequence of the decision. A low-risk drafting assistant may need simple review. A recommendation affecting capital allocation, employment, customers, safety, or regulation requires stronger source controls, domain review, testing, and escalation. NIST’s AI Risk Management Framework emphasises governance, mapping, measurement, and management across the lifecycle. For executives, the implication is straightforward: assurance is not a final checkpoint. It is part of how the use case is designed.",
        ],
      },
      {
        title: "Design the human decision rights.",
        paragraphs: [
          "Human oversight is often described as a person approving the final output. That is too narrow. The more important questions are who frames the problem, who can challenge the evidence, who decides when the system is outside its intended context, and who carries accountability after action. A nominal approval step adds little if the reviewer lacks time, information, authority, or a clear standard for intervention.",
          "A useful operating model separates at least four roles: the business owner who holds the outcome, the domain reviewer who tests relevance, the technical owner who manages system performance, and the risk owner who sets limits and escalation. In smaller organisations one person may hold several roles, but the responsibilities still need to be explicit. The point is not bureaucracy. It is to prevent a technically credible output from becoming an organisational decision without considered judgment.",
        ],
      },
      {
        title: "Scale through learning gates.",
        paragraphs: [
          "The right early commitment is usually a bounded test around a real workflow. The test should establish a baseline, define expected improvement, identify failure modes, and state what evidence will support scaling, redesign, or stopping. This converts a pilot from a demonstration into a learning instrument. It also protects leadership from the common pattern in which an impressive prototype accumulates sunk cost before data readiness, adoption, integration, or risk has been examined.",
          "Scaling should be a sequence of explicit gates: value observed, operating change accepted, controls proven, ownership established, and economics understood. Some use cases will stop because the process itself is poorly defined. Others will reveal that simpler automation is sufficient. A smaller portfolio of use cases connected to decisions and measured in operation is more credible than a large catalogue of possibilities. AI accelerates the work; judgment determines whether the answer deserves commitment.",
        ],
      },
    ],
    boardQuestions: [
      "Which specific decision or workflow becomes materially better if this use case succeeds?",
      "What evidence, failure threshold, or risk event would cause us to stop or redesign it?",
      "Who owns the outcome, and who has the authority to challenge the system’s output?",
      "Are we measuring generated activity or a change in decision quality, cost, speed, or risk?",
    ],
    relatedTool: "decisionFramer",
    relatedToolLabel: "Frame the decision behind the AI use case",
    sources: [
      { label: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework", note: "Voluntary framework for incorporating trustworthiness into the design, use, and evaluation of AI systems; reviewed 24 July 2026." },
      { label: "OECD AI Principles", url: "https://www.oecd.org/en/topics/sub-issues/ai-principles.html", note: "Intergovernmental principles on trustworthy AI, human oversight, transparency, robustness, and accountability; updated in 2024." },
      { label: "Ganrich Advisory decision-quality framework", note: "Founder-authored interpretation connecting AI use cases to decision ownership, evidence thresholds, and learning gates." },
    ],
    methodology: "Founder-authored synthesis of public governance frameworks and Ganrich Advisory’s decision-first operating model. It contains no client data or claimed engagement outcomes.",
    dataPeriod: "NIST AI RMF 1.0 and current revision status reviewed 24 July 2026; OECD Principles updated 2024.",
    confidence: "High on the governance principles; directional on organisation-specific application.",
  },
  {
    slug: "transformation-activity-to-value",
    type: "Executive briefing",
    title: "From transformation activity to transformation value",
    thesis: "A transformation becomes executable when priorities, owners, dependencies, and value signals are reviewed in one management rhythm.",
    applicability: "Use this when transformation reporting is active but leadership cannot see which decisions are holding value back.",
    author: "Ahmed Furkan Gul",
    date: "2026-07-24",
    dateLabel: "24 July 2026",
    readingTime: "10 min",
    region: "Cross-regional",
    topic: "Transformation",
    findings: [
      ["Activity can conceal choice", "Workstream progress does not resolve the leadership decisions on which value depends."],
      ["Dependencies need owners", "A dependency becomes manageable when accountability and an escalation threshold are explicit."],
      ["Value signals must change action", "Tracking matters when it influences allocation, sequencing, or intervention."],
    ],
    analysis: [
      "Many transformations have plans, workstreams, and reporting but lack a consistent forum for the decisions that shape progress.",
      "A useful cadence links evidence, ownership, dependencies, and value movement. It clarifies what must be decided now, what can wait, and what evidence is still missing.",
      "This changes governance from a reporting mechanism into a management system for execution.",
    ],
    implications: [
      "Put decision owners—not status slides—at the centre of governance.",
      "Connect initiatives to value hypotheses and leading indicators.",
      "Escalate unresolved trade-offs before delay becomes normalised.",
    ],
    framework: ["Evidence", "Owner", "Decision", "Value"],
    frameworkTitle: "Transformation decision cadence",
    counterargument: "A strong delivery engine can create momentum before every governance question is resolved; adding decision forums can also create overhead.",
    weakeningEvidence: "Sustained value delivery in complex programmes where ownership, dependencies, and value signals remain consistently implicit.",
    source: "Ganrich Advisory transformation-governance framework. Conceptual analysis; no external performance dataset.",
    sections: [
      {
        title: "Activity is necessary, but it is not the outcome.",
        paragraphs: [
          "Transformation programmes naturally organise around initiatives, milestones, and workstreams. Those structures help teams coordinate work, but they can also create an optical illusion: visible activity is interpreted as strategic movement. A workstream can be green while the value thesis is weakening, a dependency is unresolved, or a leadership trade-off has been deferred. The programme then reports progress while the organisation experiences delay.",
          "The corrective is not more reporting. It is a sharper connection between each initiative and the decision or value mechanism it is meant to change. Leadership should be able to see why the initiative exists, what observable movement is expected, what assumptions support that expectation, and which decision becomes necessary if the signal does not move. When that chain is missing, the initiative is a task bundle rather than a managed value hypothesis.",
        ],
      },
      {
        title: "Turn governance into a decision system.",
        paragraphs: [
          "A conventional steering meeting often moves through a series of updates. A decision-led meeting begins elsewhere: which choices cannot be made within the workstream, what evidence is available, what are the alternatives, and who must decide by when? This changes the preparation, attendance, and rhythm of governance. Owners arrive to resolve a defined issue rather than describe general progress.",
          "The agenda should distinguish information, discussion, and decision. Decision papers should state the recommendation, alternatives, implications, evidence, uncertainty, and required action. A decision log should record the owner and the consequences for scope, resources, timing, or value. This is not administrative detail. It creates organisational memory and prevents the same unresolved issue from returning under different language.",
        ],
      },
      {
        title: "Make dependencies economically visible.",
        paragraphs: [
          "Dependencies are often recorded as programme-management concerns: another team must deliver a system, process, capability, or decision. Their strategic importance becomes clear only when the value and timing affected are visible. A dependency without an owner remains a hope. A dependency without an escalation threshold remains a source of accepted delay. A dependency without a value connection is easy to deprioritise.",
          "Leaders should therefore review the small number of dependencies that constrain disproportionate value. Each should have an accountable owner, a required date, an impact statement, and a predefined response if the date or evidence threshold is missed. The result is not perfect prediction. It is earlier intervention, more honest sequencing, and a clearer basis for reallocating resources before slippage becomes embedded.",
        ],
      },
      {
        title: "Use value signals to change action.",
        paragraphs: [
          "Benefits tracking fails when it is separated from management action. Lagging financial outcomes matter, but they often arrive too late to guide the work. A credible value architecture combines lagging outcomes with leading operational signals: adoption, cycle time, quality, conversion, utilisation, decision latency, or another measure tied to the mechanism of value. The precise mix depends on the transformation.",
          "A signal earns its place only if movement changes a decision. If adoption remains low, leadership may change the process, incentives, training, or solution. If cycle time improves but quality falls, scaling may stop. If an initiative no longer supports the strategy, resources may move. Transformation value is therefore not a number presented at the end. It is a continuing set of choices about where to intervene, persist, redesign, or stop.",
        ],
      },
    ],
    boardQuestions: [
      "Which three unresolved leadership decisions are constraining the greatest value?",
      "Can every priority initiative be linked to a value mechanism and an accountable owner?",
      "Which leading signals would cause us to intervene, reallocate, or stop?",
      "Does the current governance rhythm resolve trade-offs or primarily report activity?",
    ],
    relatedTool: "decisionAtlas",
    relatedToolLabel: "Locate the decision holding value back",
    sources: [
      { label: "Ganrich Advisory transformation-governance framework", note: "Founder-authored conceptual framework connecting evidence, ownership, decisions, and value signals." },
    ],
    methodology: "Conceptual management analysis built from the Ganrich Advisory decision spine. No benchmark, client result, or external performance statistic is asserted.",
    dataPeriod: "Not applicable; conceptual framework reviewed 24 July 2026.",
    confidence: "Directional; the cadence and measures must be adapted to the programme and organisation.",
  },
  {
    slug: "market-entry-sequence-of-commitments",
    type: "Framework",
    title: "Market entry is a sequence of commitments",
    thesis: "The strongest entry strategies distinguish reversible learning from irreversible investment.",
    applicability: "Use this when a market looks attractive but the right entry model, evidence threshold, or sequence of commitment remains unclear.",
    author: "Ahmed Furkan Gul",
    date: "2026-07-24",
    dateLabel: "24 July 2026",
    readingTime: "11 min",
    region: "Regional expansion",
    topic: "Growth",
    findings: [
      ["Attractiveness is not readiness", "External opportunity and organisational capacity are different questions."],
      ["The entry model should evolve", "Commitment can increase as commercial evidence and operating readiness improve."],
      ["Partnerships create dependencies", "Access may accelerate while control, economics, or learning become constrained."],
    ],
    analysis: [
      "A market can be attractive and still be the wrong commitment for a particular organisation at a particular time.",
      "Entry design should move from low-cost learning to progressively firmer commitments as commercial evidence and operating readiness improve.",
      "The roadmap is not a universal score. It is an explicit set of assumptions, thresholds, dependencies, and decision gates.",
    ],
    implications: [
      "Define the evidence required before each commitment.",
      "Evaluate route-to-market feasibility alongside demand.",
      "Treat sequencing as a strategic design choice, not a project timetable.",
    ],
    framework: ["Learn", "Test", "Establish", "Scale"],
    frameworkTitle: "Commitment sequence",
    counterargument: "In fast-moving markets, a larger early commitment can secure access, talent, and position that staged entry would lose.",
    weakeningEvidence: "Consistent cases where early irreversible commitment outperforms staged learning despite weak initial evidence and limited readiness.",
    source: "Ganrich Advisory market-entry framework, informed by internationalisation research on learning and commitment.",
    sections: [
      {
        title: "Separate market attractiveness from organisational readiness.",
        paragraphs: [
          "Market-entry decisions often begin with the external opportunity: category growth, demand, competition, regulation, or customer concentration. Those questions are essential, but they do not establish that a particular organisation is ready to capture the opportunity. Readiness includes a credible offer, access to customers, decision rights, leadership attention, talent, supply capability, compliance, working capital, and the capacity to learn locally.",
          "The two dimensions should be assessed separately. A highly attractive market with weak readiness may justify targeted learning rather than immediate investment. A moderately attractive market with strong customer access and operating fit may deserve earlier commitment. Combining both into one headline score conceals the strategic tension. Leaders need to see whether the constraint is the market, the organisation, the proposed entry model, or the evidence itself.",
        ],
      },
      {
        title: "Design an evidence ladder.",
        paragraphs: [
          "Not every uncertainty deserves the same research method. Desk research may clarify regulation and market structure. Customer interviews may test the problem and buying process. A distributor experiment may reveal access and economics. A limited commercial launch may test repeat demand and delivery. The evidence ladder should match the uncertainty and avoid using a costly commitment to answer a question that a smaller test could resolve.",
          "Each stage requires a threshold. What would support proceeding, changing the model, or stopping? What period is long enough to observe the signal? Which result could be misleading because of seasonality, partner incentives, or a non-representative customer? Predefining these questions reduces the temptation to reinterpret ambiguous results after resources and reputation have been committed.",
        ],
      },
      {
        title: "Treat the entry model as a changing design.",
        paragraphs: [
          "Export, distributor, licensing, joint venture, acquisition, and owned operation are not simply alternatives chosen once. They represent different combinations of control, capital, speed, learning, and dependency. The appropriate model can change as evidence develops. An initial partner may accelerate access; later, an owned capability may be necessary to protect the customer relationship, economics, or knowledge.",
          "Partnerships deserve particular scrutiny. The partner’s incentives, capabilities, data access, exclusivity, and exit terms shape what the entrant can learn and control. A strong relationship does not remove the need for governance. The organisation should identify which capabilities it must retain, which it can borrow, and which dependencies become unacceptable at scale.",
        ],
      },
      {
        title: "Commit through explicit gates.",
        paragraphs: [
          "A credible entry roadmap is a sequence of management decisions, not merely launch tasks. The gates may move from learning to commercial test, local establishment, and scale. Each gate should combine external evidence, internal readiness, economics, risk, and an accountable recommendation. Capital is released because a threshold has been met, not because the calendar has advanced.",
          "Staging is not always slower. It can accelerate a confident commitment by resolving the few uncertainties that matter. Nor is it a universal answer: when access, licences, talent, assets, or first-mover position are scarce, leadership may rationally accept a larger early commitment. The discipline is to make that trade-off explicit and to know which assumptions are being purchased rather than proven.",
        ],
      },
    ],
    boardQuestions: [
      "Which uncertainties can be resolved before we make an irreversible commitment?",
      "Is the principal constraint market attractiveness, organisational readiness, or the entry model?",
      "What must remain under our control as the partnership or operation scales?",
      "What evidence will release the next tranche of capital—and what will stop it?",
    ],
    relatedTool: "marketCompass",
    relatedToolLabel: "Compare opportunity and readiness",
    sources: [
      { label: "Johanson and Vahlne, the internationalisation process model", url: "https://doi.org/10.1057/palgrave.jibs.8490676", note: "Foundational research linking experiential knowledge and increasing foreign-market commitment." },
      { label: "Ganrich Advisory commitment-sequence framework", note: "Founder-authored application of learning gates to contemporary market-entry choices." },
    ],
    methodology: "Conceptual synthesis of established internationalisation research and a decision-gate framework. No market ranking or client outcome is asserted.",
    dataPeriod: "Foundational research and Ganrich framework reviewed 24 July 2026.",
    confidence: "High on the need to distinguish learning and commitment; directional on the correct sequence for any market.",
  },
  {
    slug: "turkiye-gulf-capital-corridor",
    type: "Corridor briefing",
    title: "The Türkiye–Gulf capital corridor: what changed and what it means for operators",
    thesis: "The corridor is becoming more institutional. Operators still need to convert diplomatic momentum into a specific commercial advantage.",
    applicability: "Use this when a Türkiye–Gulf opportunity appears strategically attractive but the practical route to customers, capital, partners, or execution remains unproven.",
    author: "Ahmed Furkan Gul",
    date: "2026-07-24",
    dateLabel: "24 July 2026",
    readingTime: "12 min",
    region: "Türkiye · Gulf",
    topic: "Regional expansion",
    findings: [
      ["Frameworks are deepening", "Trade agreements, strategic councils, and investment mechanisms create more structured routes for cooperation."],
      ["The corridor is not one market", "The UAE, Saudi Arabia, Qatar, Kuwait, Oman, and Bahrain differ in institutions, priorities, and routes to access."],
      ["Execution remains company-specific", "Public momentum does not resolve product fit, partnership economics, governance, or delivery readiness."],
    ],
    analysis: [
      "Since 2023, bilateral and Gulf-wide mechanisms have expanded the formal architecture around Türkiye–Gulf trade and investment.",
      "The operational consequence is not an automatic opportunity. It is a wider set of possible routes that must be assessed country by country and sector by sector.",
      "Leadership teams should translate corridor momentum into an explicit thesis about access, complementarity, capability, and control.",
    ],
    implications: [
      "Identify the precise institutional or commercial change that affects your economics.",
      "Choose a country and route-to-market before speaking about the Gulf as one opportunity.",
      "Test partner incentives, decision rights, and delivery capacity before committing.",
    ],
    framework: ["Signal", "Access", "Fit", "Commitment"],
    frameworkTitle: "Corridor-to-commitment sequence",
    counterargument: "Strong political and institutional momentum can create windows in which speed and senior relationships matter more than staged evidence.",
    weakeningEvidence: "Evidence that formal agreements and high-level mechanisms consistently translate into attractive company-level economics without market-specific capability or governance.",
    source: "Ganrich Advisory synthesis of official Türkiye, GCC, and UAE public sources current to 24 July 2026.",
    sections: [
      {
        title: "The corridor has acquired more formal architecture.",
        paragraphs: [
          "The shift is visible in the mechanisms surrounding the relationship. The UAE–Türkiye Comprehensive Economic Partnership Agreement was signed in March 2023 and entered into force in September 2023. It covers goods, services, digital trade, investment facilitation, government procurement, competition, and other operating concerns. In March 2024, Türkiye and the Gulf Cooperation Council signed a joint statement to restart free-trade negotiations; the first round followed in Ankara in July 2024 across goods, services, investment facilitation, and related chapters.",
          "The architecture continued to broaden. The first Türkiye–UAE High-Level Strategic Council met in July 2025, with cooperation agreements spanning sectors including industry, manufacturing, pharmaceuticals, food and agriculture, and tourism. Türkiye’s October 2025 Gulf tour produced further agreements with Kuwait, Qatar, and Oman across areas including investment, transport, energy, finance, and strategic planning. These are signals of a more institutional corridor: multiple forums, sector channels, and formal instruments now sit around commercial exchange.",
        ],
      },
      {
        title: "Institutional momentum changes access—not the answer.",
        paragraphs: [
          "For an operator, formal architecture can reduce some friction, clarify rules, create dialogue channels, or make certain partnerships easier to assemble. It can also direct attention toward sectors where governments see complementarity. But a trade agreement does not prove customer demand; a memorandum does not prove economics; and a forum does not prove that an organisation can deliver in the local context. The public signal must be translated into a company-specific mechanism.",
          "That mechanism may be tariff treatment for a defined product, access to procurement, a local investment partner, a manufacturing complementarity, a financial route, or a platform for serving third markets. Leadership should state the mechanism precisely and verify it with current legal, tax, customs, regulatory, and commercial advice. If the opportunity cannot be expressed beyond general diplomatic momentum, it is not yet an investment thesis.",
        ],
      },
      {
        title: "Treat the Gulf as a portfolio of distinct contexts.",
        paragraphs: [
          "The Gulf Cooperation Council provides an important regional frame, but operators enter countries, sectors, customer systems, and regulatory environments. The UAE’s role as a trade, finance, and logistics platform creates one set of possibilities. Saudi Arabia’s scale and localisation priorities create another. Qatar, Kuwait, Oman, and Bahrain each present different institutional structures, sector agendas, partner landscapes, and decision processes.",
          "A corridor strategy should therefore specify the country sequence. The first market may be selected for learning, customer access, capital, production, or regional coordination—not simply for headline size. It should also specify which capabilities are shared across the corridor and which must be local. Regional ambition without country-level operating design often produces diffuse business development and weak accountability.",
        ],
      },
      {
        title: "Design the partnership before celebrating it.",
        paragraphs: [
          "Partnerships are central to many corridor opportunities because they can provide access, local knowledge, credibility, assets, or capital. The strategic question is what the partnership must accomplish and what the operator must continue to own. Decision rights, customer data, economics, exclusivity, performance standards, intellectual property, talent, compliance, and exit should be considered before momentum turns a relationship into a commitment.",
          "The most credible corridor plans connect four elements: a dated external signal, a defined access route, an organisational fit assessment, and staged commitment gates. This permits speed without confusing enthusiasm with evidence. The result may be a large commitment, a narrow commercial test, a partnership redesign, or a decision not to proceed. What matters is that the corridor becomes an operating thesis rather than a geopolitical slogan.",
        ],
      },
    ],
    boardQuestions: [
      "Which specific agreement, mechanism, or sector channel changes our route or economics?",
      "Which Gulf country should come first, and what are we trying to learn there?",
      "What capability or customer relationship must remain under our control?",
      "What evidence converts diplomatic momentum into an investable operating thesis?",
    ],
    relatedTool: "marketCompass",
    relatedToolLabel: "Test a Türkiye–Gulf market sequence",
    sources: [
      { label: "UAE Ministry of Economy — UAE–Türkiye CEPA", url: "https://www.moet.gov.ae/en/web/guest/cepa_turkey", note: "Agreement signed 3 March 2023 and effective 1 September 2023; reviewed 24 July 2026." },
      { label: "Republic of Türkiye Ministry of Trade — Türkiye–GCC FTA first round", url: "https://ticaret.gov.tr/haberler/turkiye-korfez-isbirligi-konseyi-kik-serbest-ticaret-anlasmasi-hakkinda-basin-duyurusu", note: "Official notice dated 31 July 2024 describing the first negotiation round and scope." },
      { label: "Türkiye Investment and Finance Office — Türkiye–UAE agreements", url: "https://www.invest.gov.tr/en/news/news-from-turkey/pages/turkiye-and-uae-sign-seven-landmark-agreements-to-deepen-strategic-partnership.aspx", note: "Official investment-promotion office notice dated 17 July 2025." },
      { label: "Türkiye Investment and Finance Office — 2025 Gulf tour agreements", url: "https://www.invest.gov.tr/en/news/news-from-turkey/pages/president-erdogan-gulf-tour-yields-24-agreements-joint-statements-declarations.aspx", note: "Official summary dated 27 October 2025." },
    ],
    methodology: "Desk synthesis of official public sources. Agreements and policy mechanisms are treated as signals; no claim is made that they produce company-level demand, returns, or execution readiness.",
    dataPeriod: "March 2023 to October 2025; sources reviewed 24 July 2026.",
    confidence: "High on the cited institutional developments; directional on implications for individual operators.",
  },
  {
    slug: "family-holdings-operating-model-transition",
    type: "Governance perspective",
    title: "Family holdings and the operating-model transition",
    thesis: "The central transition is not from family to corporate. It is from implicit authority to explicit decision rights.",
    applicability: "Use this when a family holding is growing, professionalising, changing generation, or adding businesses faster than its decision model is adapting.",
    author: "Ahmed Furkan Gul",
    date: "2026-07-24",
    dateLabel: "24 July 2026",
    readingTime: "11 min",
    region: "Türkiye · MENA",
    topic: "Operating model",
    findings: [
      ["Professionalisation is not displacement", "The goal is to clarify how family stewardship and professional management reinforce one another."],
      ["Structure follows decisions", "Boards, committees, and headquarters add value only when their decision mandates are explicit."],
      ["Transition must include the portfolio", "Ownership, capital allocation, talent, and business-unit autonomy need one coherent model."],
    ],
    analysis: [
      "Family holdings often carry valuable speed, long-term commitment, and concentrated judgment. Growth can make the same implicit model harder to sustain.",
      "The operating-model task is to preserve stewardship while clarifying decisions across family, ownership, board, centre, and businesses.",
      "A successful transition is visible in better decisions and accountability—not in the number of new governance bodies.",
    ],
    implications: [
      "Map the decisions currently dependent on individual access or unwritten convention.",
      "Define the mandates of family, ownership, board, centre, and business units.",
      "Align leadership roles, information, and incentives with the new decision model.",
    ],
    framework: ["Stewardship", "Mandates", "Cadence", "Renewal"],
    frameworkTitle: "Holding operating-model transition",
    counterargument: "Formalising authority can weaken entrepreneurial speed and introduce distance between owners and the businesses they understand deeply.",
    weakeningEvidence: "Cases where increasingly complex holdings maintain consistently fast, high-quality decisions through informal authority alone across generations and portfolios.",
    source: "Ganrich Advisory operating-model perspective, informed by IFC family-business governance guidance.",
    sections: [
      {
        title: "Preserve the strength hidden inside informality.",
        paragraphs: [
          "Family enterprises can make decisions with unusual speed because ownership, knowledge, trust, and authority are concentrated. Long time horizons and direct access to decision makers can support resilience and bold commitment. The purpose of an operating-model transition is not to replace those strengths with generic corporate machinery. It is to preserve them as the organisation becomes larger, more diverse, and less dependent on a small number of relationships.",
          "Informality becomes a constraint when decisions depend on personal access, different parts of the group receive different signals, or managers cannot tell where their authority begins and ends. The result may be repeated escalation, cautious professional management, overloaded owners, or business units that wait for intervention. These are not simply organisation-chart problems. They are symptoms of an implicit decision system under increasing load.",
        ],
      },
      {
        title: "Separate the roles without separating the purpose.",
        paragraphs: [
          "A family holding contains overlapping systems: family, ownership, board, group centre, and operating businesses. One person may participate in several systems, but each system has a different mandate. Family governance addresses family participation, values, and continuity. Ownership sets expectations for stewardship and return. The board governs the enterprise. The centre shapes portfolio and shared capabilities. Business units execute within defined authority.",
          "Confusion arises when the same issue moves between these systems without a clear decision path. Professionalisation then feels like a contest between family and management. A stronger design starts with shared purpose and clarifies which decisions belong where, who contributes evidence, who advises, who decides, and how unresolved tension is escalated. Explicit roles protect both owner intent and managerial accountability.",
        ],
      },
      {
        title: "Design the centre around portfolio choices.",
        paragraphs: [
          "Holding centres often accumulate functions because centralisation appears to signal control or efficiency. The more important question is which decisions genuinely benefit from a group perspective. Portfolio strategy, capital allocation, senior talent, risk, governance standards, and selected shared capabilities may justify central authority. Commercial or operational decisions may be better held close to the business when local speed and knowledge matter.",
          "The centre should therefore have a value-creation logic. It may act as strategic architect, active owner, capability builder, or a deliberate combination. Each role implies different talent, information, cadence, and intervention rights. Without that logic, the centre risks becoming either a passive consolidator or an additional approval layer. The test is whether its involvement makes a defined class of decisions better.",
        ],
      },
      {
        title: "Treat transition as a sequence of lived decisions.",
        paragraphs: [
          "New charters, committees, and role descriptions do not change an operating model by themselves. The model becomes real when actual capital, people, performance, and portfolio decisions are made through it. Early transition should focus on a small number of recurring, consequential decisions and run the new mandates, information, and cadence against them. Ambiguities become visible before the design is scaled.",
          "Generational or leadership transition adds urgency but should not be the only trigger. Complexity can outrun the model before succession is imminent. A measured transition establishes the decision architecture, strengthens boards and management where needed, creates information that supports stewardship, and builds confidence through use. The destination is not less family influence. It is family influence exercised through a system capable of enduring growth and renewal.",
        ],
      },
    ],
    boardQuestions: [
      "Which decisions still depend on personal access, unwritten convention, or repeated escalation?",
      "What is the value-creation role of the holding centre?",
      "Where should owner stewardship be direct, and where should professional authority be protected?",
      "Which live decisions will test whether the new operating model works?",
    ],
    relatedTool: "decisionFramer",
    relatedToolLabel: "Frame the operating-model decision",
    sources: [
      { label: "IFC Family Business Governance Handbook", url: "https://www.ifc.org/en/insights-reports/2011/ifc-family-business-governance-handbook", note: "Practical guidance on overlapping roles, family governance structures, and evolution across generations." },
      { label: "Ganrich Advisory operating-model transition framework", note: "Founder-authored interpretation focused on decision rights across family, ownership, board, centre, and businesses." },
    ],
    methodology: "Conceptual synthesis of public governance guidance and a decision-rights operating-model framework. No family, company, or engagement is represented.",
    dataPeriod: "IFC guidance and Ganrich framework reviewed 24 July 2026.",
    confidence: "High on governance distinctions; directional on the appropriate design for a specific holding.",
  },
  {
    slug: "ai-value-mid-market-industrials",
    type: "Value agenda",
    title: "Where AI creates measurable value in mid-market industrials",
    thesis: "Value appears where AI changes a repeatable operating decision—not where it merely produces an impressive output.",
    applicability: "Use this when an industrial company has many AI ideas but lacks a credible, measured sequence for moving from use case to operating value.",
    author: "Ahmed Furkan Gul",
    date: "2026-07-24",
    dateLabel: "24 July 2026",
    readingTime: "12 min",
    region: "Cross-regional",
    topic: "Applied AI",
    findings: [
      ["Start with decision frequency and value", "A recurring decision with observable consequences is easier to evaluate than a broad capability promise."],
      ["Data readiness is local", "The relevant question is whether the workflow has usable, governed data—not whether the enterprise has a perfect platform."],
      ["Adoption is part of the economics", "A technically strong system creates no value if operators cannot trust, use, or challenge it."],
    ],
    analysis: [
      "Mid-market industrial companies often have rich operating knowledge, constrained specialist capacity, and uneven data environments.",
      "The strongest starting points are bounded workflows where decisions repeat, outcomes can be observed, and human expertise can test the result.",
      "A value agenda should sequence use cases by value, feasibility, adoption, and risk while treating operating change as part of the solution.",
    ],
    implications: [
      "Rank workflows, not technologies.",
      "Establish a baseline before building the use case.",
      "Budget for process, role, and control changes alongside the model.",
    ],
    framework: ["Workflow", "Baseline", "Test", "Scale"],
    frameworkTitle: "Industrial AI value sequence",
    counterargument: "Platform-first investment can create shared data and technical capabilities that enable several use cases and avoid fragmented experiments.",
    weakeningEvidence: "A pattern of platform-led programmes generating broad, measurable operating value before specific workflow ownership, adoption, or baselines are established.",
    source: "Ganrich Advisory industrial AI value framework, informed by NIST and OECD responsible-AI guidance.",
    sections: [
      {
        title: "Look for decisions that repeat.",
        paragraphs: [
          "Industrial value is created through thousands of operating decisions: what to schedule, inspect, maintain, quote, purchase, hold, release, investigate, or escalate. Some are made by experienced people using fragmented information under time pressure. AI may help when it improves the evidence, consistency, or speed of a defined decision. The opportunity is not the abstract ability to predict or generate. It is the operational consequence of a better choice.",
          "Frequency matters because learning and value accumulate. A rare strategic decision may be highly consequential but difficult to evaluate through repeated use. A recurring planning, quality, maintenance, commercial, or service decision can create a clearer baseline and feedback loop. Leadership should still consider consequence: a frequent low-value task may not justify integration, while a less frequent bottleneck may release capacity or reduce meaningful risk.",
        ],
      },
      {
        title: "Build a value map before a use-case list.",
        paragraphs: [
          "Use-case catalogues expand quickly because almost every function can imagine an application. A value map imposes discipline. It links the workflow to an outcome, the outcome to a measure, and the measure to a decision owner. It also states the present baseline, the source of improvement, and the operating change required. This makes superficially different ideas comparable.",
          "Four questions are usually sufficient for an initial screen: is the value material, is the data usable, can the result be integrated into work, and is the risk acceptable? These are not independent. A high-value use case may justify data remediation. A technically easy use case may still fail if the user has no reason to change behaviour. The portfolio should balance near-term proof with a small number of capability-building bets.",
        ],
      },
      {
        title: "Treat data and expertise as one system.",
        paragraphs: [
          "Industrial data often reflects the history of equipment, sites, processes, and local workarounds. Labels may be inconsistent; failures may be rare; maintenance records may contain expert shorthand; and the same measure may have different meanings across lines. This does not make AI impossible. It means the work must begin close to the workflow with people who understand how the data was produced.",
          "Domain experts should help define the target, identify misleading proxies, review edge cases, and determine when a recommendation is unsafe or irrelevant. Their role is not limited to supplying knowledge at the beginning. They are part of testing, monitoring, and improvement. A system that cannot be challenged by the people responsible for the operation is unlikely to earn durable trust.",
        ],
      },
      {
        title: "Measure the operating change.",
        paragraphs: [
          "A proof of concept may demonstrate technical performance. A value test must demonstrate a change in the workflow. That requires a baseline and a comparison: cycle time, yield, unplanned downtime, first-time-right quality, forecast error, working capital, conversion, service response, or another measure tied to the use case. The design should also observe unintended effects, overrides, and the distribution of performance across contexts.",
          "Scaling follows when value, adoption, controls, ownership, and economics have been demonstrated together. The model may need integration, monitoring, fallback procedures, role changes, and training. These costs belong in the business case. Mid-market companies do not need to imitate the architecture of the largest enterprises. They need a small, governed portfolio that creates evidence, builds reusable capability, and earns the right to scale.",
        ],
      },
    ],
    boardQuestions: [
      "Which recurring operating decisions have material and observable consequences?",
      "Do we have a baseline strong enough to distinguish value from enthusiasm?",
      "Which domain experts own the decision and can challenge the output?",
      "What operating, control, and adoption costs are missing from the business case?",
    ],
    relatedTool: "decisionAtlas",
    relatedToolLabel: "Locate the highest-value AI decision",
    sources: [
      { label: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework", note: "Framework used for lifecycle governance, testing, and risk-management principles." },
      { label: "OECD AI Principles", url: "https://www.oecd.org/en/topics/sub-issues/ai-principles.html", note: "Guidance used for human oversight, transparency, robustness, and accountability." },
      { label: "Ganrich Advisory industrial AI value framework", note: "Founder-authored workflow, baseline, test, and scale sequence." },
    ],
    methodology: "Conceptual operating-model analysis. Example measures describe possible evaluation categories, not claimed benchmarks or outcomes.",
    dataPeriod: "Public AI governance sources and Ganrich framework reviewed 24 July 2026.",
    confidence: "High on the workflow-first logic; directional on use-case priority and achievable value.",
  },
];

const tr: InsightArticle[] = [
  {
    ...en[0],
    slug: "uygulamali-yapay-zeka-karar-kalitesi",
    type: "Kurucu perspektifi",
    title: "Uygulamalı yapay zekâ çağında karar kalitesi",
    thesis: "Yapay zekâ kanıt alanını değiştirir. Tercihin sorumluluğu yine liderliktedir.",
    applicability: "Yapay zekâ girişimleri, liderliğin değer, risk ve sorumluluğun nerede bulunduğuna karar verme hızından daha fazla olasılık üretiyorsa kullanın.",
    dateLabel: "24 Temmuz 2026",
    readingTime: "11 dk",
    region: "Bölgeler arası",
    topic: "Uygulamalı Yapay Zekâ",
    findings: [
      ["Kapsam, kanıt değildir", "Daha fazla içerik ancak kaynağı, ilgisi ve belirsizliği görünür olduğunda anlam kazanır."],
      ["Hız, yön değildir", "Daha hızlı yineleme ancak karar ve kanıt eşiği açık olduğunda değer yaratır."],
      ["Sentez, muhakeme değildir", "Öneriler bağlam, sorumluluk ve açık ödünleşimler gerektirir."],
    ],
    analysis: [
      "Uygulamalı yapay zekâ araştırma kapsamını genişletebilir, karmaşık girdileri yapılandırabilir ve senaryo geliştirmeyi hızlandırabilir. Bu kazanımlar belirli bir belirsizliği azalttığında veya kritik bir iş akışını geliştirdiğinde anlamlıdır.",
      "Temel yönetim görevi üretilen çıktıyı en üst düzeye çıkarmak değildir. Kararı, kanıt eşiğini, kabul edilebilir ödünleşimleri ve harekete geçecek sorumluyu tanımlamaktır.",
      "Disiplinli bir değer gündemi, her kullanım alanını gözlemlenebilir bir sonuca, işletim değişikliğine ve açık insan sorumluluğuna bağlar.",
    ],
    implications: ["Teknoloji seçmeden önce karar sahibini ve takvimi belirleyin.", "Mevcut görüşü değiştirecek kanıtı tanımlayın.", "Geri döndürülebilir deneyleri geri döndürülemez taahhütlerden ayırın."],
    framework: ["Çerçevele", "Kanıt", "Sına", "Karar ver"],
    frameworkTitle: "Karar kalitesi çerçevesi",
    counterargument: "Sahiplik ve çerçeve kusurlu olsa bile yapılandırılmış kanıt ve daha hızlı sentez kararı geliştirebilir; ideal yönetişimi beklemek de gecikme yaratabilir.",
    weakeningEvidence: "Açık karar sahipliği, kaynak kontrolü veya ödünleşim yönetimi olmadan otomatik sentezin kalıcı değer ürettiği tekrarlanan örnekler.",
    source: "NIST AI RMF ve OECD Yapay Zekâ İlkelerinden yararlanan Ganrich Advisory karar kalitesi çerçevesi.",
    sections: [
      {
        title: "Modelden önce kararla başlayın.",
        paragraphs: [
          "Bir yapay zekâ programını hareketli göstermenin en kolay yolu model, pilot, istem veya üretilen çıktı saymaktır. Bu göstergelerin hiçbiri daha iyi bir karar verildiğini kanıtlamaz. Bir kararın sahibi, takvimi, alternatifleri, kısıtları ve sonuçları vardır. Bu unsurlar belirsiz kaldığında yapay zekâ, konuyu çözmek yerine konu etrafındaki içeriği çoğaltır. Bu nedenle ilk tasarım sorusu teknolojik değil yönetseldir: hangi tercih daha hızlı, daha iyi kanıtlanmış, daha tutarlı veya uygulanması daha kolay hâle gelmelidir?",
          "Bu ayrım önceliklendirmeyi değiştirir. Kritik ve tekrarlanan bir karara bağlı kullanım alanı; kanıt kalitesi, çevrim süresi, hata riski ve söz konusu değer üzerinden değerlendirilebilir. Yalnızca popüler bir yetkinliğe bağlı kullanım alanı değerlendirilemez. Liderlik, sistemin tanımlı bir kararı veya iş akışını geliştirip geliştirmediğini, hangi bölümün insanda kalacağını ve daha ileri taahhüdü hangi gözlemlenebilir değişimin haklı çıkaracağını sormalıdır.",
        ],
      },
      {
        title: "Bir kanıt mimarisi kurun.",
        paragraphs: [
          "Yapay zekâ, bir ekibin elle inceleyebileceğinden daha fazla içeriği aramayı ve birleştirmeyi mümkün kılar. Fayda gerçektir; ancak akıcı sentez zayıf kaynakları, eksik bağlamı veya çelişkili tanımları gizleyebilir. Kanıt mimarisi; hangi kaynakların kullanılabileceğini, güncelliğin nasıl ele alınacağını, iddiaların nasıl izleneceğini ve hangi belirsizliklerin görünür kalacağını belirlemektir. Kaynak, model yorumu ve yönetim muhakemesi birbirinden ayrılmalıdır.",
          "Kararın sonucu ağırlaştıkça standart yükselmelidir. Düşük riskli bir taslak asistanı basit bir incelemeyle yeterli olabilir. Sermaye, istihdam, müşteri, güvenlik veya mevzuatı etkileyen bir öneri ise daha güçlü kaynak kontrolleri, alan uzmanı incelemesi, test ve eskalasyon gerektirir. NIST çerçevesinin yaşam döngüsü boyunca yönetişim, haritalama, ölçme ve yönetme vurgusu, güvenceyi son kontrol olmaktan çıkarıp tasarımın parçası hâline getirir.",
        ],
      },
      {
        title: "İnsan karar haklarını tasarlayın.",
        paragraphs: [
          "İnsan gözetimi çoğu zaman son çıktıyı bir kişinin onaylaması olarak anlatılır. Bu tanım dardır. Asıl sorular; problemi kimin çerçevelediği, kanıtı kimin sorgulayabildiği, sistem amaçlanan bağlamın dışına çıktığında kimin müdahale ettiği ve uygulama sonrasında sorumluluğu kimin taşıdığıdır. İnceleyenin zamanı, bilgisi, yetkisi veya müdahale standardı yoksa biçimsel onay çok az değer yaratır.",
          "İşlevsel model en az dört sorumluluğu ayırır: sonuçtan sorumlu iş sahibi, ilgiyi sınayan alan uzmanı, sistem performansını yöneten teknik sahip ve sınırlarla eskalasyonu belirleyen risk sahibi. Küçük kurumlarda bir kişi birden fazla rol üstlenebilir; yine de sorumluluklar açık olmalıdır. Amaç bürokrasi değil, teknik açıdan ikna edici bir çıktının ölçülü muhakeme olmadan kurumsal karara dönüşmesini önlemektir.",
        ],
      },
      {
        title: "Öğrenme kapılarıyla ölçekleyin.",
        paragraphs: [
          "Doğru ilk taahhüt çoğu zaman gerçek bir iş akışı etrafında sınırlandırılmış testtir. Test, mevcut durumu ölçmeli, beklenen gelişimi tanımlamalı, başarısızlık biçimlerini belirlemeli ve ölçekleme, yeniden tasarım veya durdurma kararını hangi kanıtın destekleyeceğini açıklamalıdır. Böylece pilot bir gösteri olmaktan çıkar, öğrenme aracına dönüşür. Etkileyici prototipin veri hazırlığı, benimseme, entegrasyon veya risk incelenmeden batık maliyet biriktirmesi önlenir.",
          "Ölçekleme açık kapılardan geçmelidir: değer gözlemlendi, işletim değişikliği kabul edildi, kontroller kanıtlandı, sahiplik kuruldu ve ekonomi anlaşıldı. Bazı kullanım alanları sürecin kendisi iyi tanımlanmadığı için duracaktır. Bazılarında daha basit otomasyon yeterli olacaktır. Kararlara bağlı ve işletim içinde ölçülen küçük bir portföy, geniş bir olasılık kataloğundan daha güvenilirdir. Yapay zekâ çalışmayı hızlandırır; yanıtın taahhüdü hak edip etmediğine muhakeme karar verir.",
        ],
      },
    ],
    boardQuestions: [
      "Bu kullanım alanı başarılı olursa hangi karar veya iş akışı anlamlı biçimde iyileşecek?",
      "Hangi kanıt, hata eşiği veya risk olayı bizi durdurmaya ya da yeniden tasarlamaya yöneltecek?",
      "Sonucun sahibi kim ve sistem çıktısını sorgulama yetkisi kimde?",
      "Üretilen faaliyeti mi, karar kalitesi, maliyet, hız veya riskteki değişimi mi ölçüyoruz?",
    ],
    relatedToolLabel: "Yapay zekâ kullanım alanının ardındaki kararı çerçeveleyin",
    sources: [
      { label: "NIST Yapay Zekâ Risk Yönetimi Çerçevesi", url: "https://www.nist.gov/itl/ai-risk-management-framework", note: "Yapay zekâ sistemlerinin tasarım, kullanım ve değerlendirmesine güvenilirlik unsurları katmak için gönüllü çerçeve; 24 Temmuz 2026 tarihinde incelendi." },
      { label: "OECD Yapay Zekâ İlkeleri", url: "https://www.oecd.org/en/topics/sub-issues/ai-principles.html", note: "Güvenilir yapay zekâ, insan gözetimi, şeffaflık, sağlamlık ve hesap verebilirlik ilkeleri; 2024’te güncellendi." },
      { label: "Ganrich Advisory karar kalitesi çerçevesi", note: "Kullanım alanlarını karar sahipliği, kanıt eşikleri ve öğrenme kapılarıyla bağlayan kurucu yorumu." },
    ],
    methodology: "Kamuya açık yönetişim çerçeveleri ile Ganrich Advisory’nin karar odaklı modelinin kurucu tarafından sentezidir. Müşteri verisi veya çalışma sonucu iddiası içermez.",
    dataPeriod: "NIST AI RMF 1.0 ve güncel revizyon durumu ile 2024’te güncellenen OECD İlkeleri; 24 Temmuz 2026’da incelendi.",
    confidence: "Yönetişim ilkelerinde yüksek; kuruma özgü uygulamada yön gösterici.",
  },
  {
    ...en[1],
    slug: "donusum-faaliyetinden-degere",
    type: "Yönetici brifingi",
    title: "Dönüşüm faaliyetinden dönüşüm değerine",
    thesis: "Dönüşüm; öncelikler, sorumlular, bağımlılıklar ve değer göstergeleri tek bir yönetim ritminde ele alındığında uygulanabilir hâle gelir.",
    applicability: "Dönüşüm raporlaması yoğun olduğu hâlde liderlik, hangi kararların değeri geciktirdiğini göremiyorsa kullanın.",
    dateLabel: "24 Temmuz 2026",
    readingTime: "10 dk",
    region: "Bölgeler arası",
    topic: "Dönüşüm",
    findings: [
      ["Faaliyet, tercihi gizleyebilir", "İş akışı ilerlemesi, değerin bağlı olduğu liderlik kararlarını çözmez."],
      ["Bağımlılıkların sahibi olmalı", "Sorumluluk ve eskalasyon eşiği açık olduğunda bağımlılıklar yönetilebilir hâle gelir."],
      ["Değer göstergeleri eylemi değiştirmeli", "Takip; kaynak, sıralama veya müdahale kararını etkilediğinde anlam kazanır."],
    ],
    analysis: [
      "Birçok dönüşümün planları, iş akışları ve raporlaması vardır; ancak ilerlemeyi şekillendiren kararlar için tutarlı bir forumu yoktur.",
      "İşlevsel bir ritim; kanıtı, sahipliği, bağımlılıkları ve değer hareketini birbirine bağlar. Şimdi neye karar verilmesi gerektiğini, neyin bekleyebileceğini ve hangi kanıtın eksik olduğunu netleştirir.",
      "Bu yaklaşım yönetişimi, raporlama mekanizmasından uygulamayı yöneten bir yönetim sistemine dönüştürür.",
    ],
    implications: ["Yönetişimin merkezine durum sunumlarını değil karar sahiplerini koyun.", "Girişimleri değer varsayımlarına ve öncü göstergelere bağlayın.", "Gecikme olağanlaşmadan önce çözülmemiş ödünleşimleri yükseltin."],
    framework: ["Kanıt", "Sorumlu", "Karar", "Değer"],
    frameworkTitle: "Dönüşüm karar ritmi",
    counterargument: "Güçlü bir uygulama motoru, her yönetişim sorusu çözülmeden ilerleme yaratabilir; yeni karar forumları ek yük de oluşturabilir.",
    weakeningEvidence: "Sahiplik, bağımlılıklar ve değer göstergeleri sürekli örtük kaldığı hâlde karmaşık programlarda kalıcı değer üretildiğini gösteren örnekler.",
    source: "Ganrich Advisory dönüşüm yönetişimi çerçevesi. Kavramsal analiz; haricî performans veri seti kullanılmamıştır.",
    sections: [
      {
        title: "Faaliyet gereklidir; ancak sonuç değildir.",
        paragraphs: [
          "Dönüşüm programları doğal olarak girişimler, kilometre taşları ve iş akışları etrafında düzenlenir. Bu yapılar koordinasyonu sağlar; fakat görünür faaliyetin stratejik ilerleme olarak yorumlandığı bir yanılsama da yaratabilir. İş akışı yeşil görünürken değer tezi zayıflayabilir, kritik bağımlılık çözümsüz kalabilir veya liderlik ödünleşimi ertelenebilir. Program ilerleme raporlar; kurum ise gecikme yaşar.",
          "Çözüm daha fazla raporlama değil, her girişim ile değiştirmesi beklenen karar veya değer mekanizması arasında daha keskin bağ kurmaktır. Liderlik, girişimin neden var olduğunu, hangi gözlemlenebilir hareketin beklendiğini, hangi varsayımların bu beklentiyi desteklediğini ve gösterge hareket etmezse hangi kararın gerekeceğini görebilmelidir. Bu zincir yoksa girişim yönetilen değer varsayımı değil, görev paketidir.",
        ],
      },
      {
        title: "Yönetişimi karar sistemine dönüştürün.",
        paragraphs: [
          "Geleneksel yönlendirme toplantısı sunumlar üzerinden ilerler. Karar odaklı toplantı başka yerden başlar: iş akışı içinde çözülemeyen tercih nedir, hangi kanıt mevcuttur, alternatifler nelerdir ve kim hangi tarihe kadar karar vermelidir? Bu yaklaşım hazırlığı, katılımı ve ritmi değiştirir. Sorumlular genel ilerlemeyi anlatmak için değil, tanımlı konuyu çözmek için gelir.",
          "Gündem bilgi, tartışma ve kararı ayırmalıdır. Karar notu; öneriyi, alternatifleri, etkileri, kanıtı, belirsizliği ve gerekli eylemi açıklar. Karar kaydı, sorumluyu ve kapsam, kaynak, takvim veya değer üzerindeki sonucu tutar. Bu idari ayrıntı değildir. Kurumsal hafıza yaratır ve aynı çözümsüz konunun farklı ifadelerle tekrar gündeme gelmesini önler.",
        ],
      },
      {
        title: "Bağımlılıkları ekonomik olarak görünür kılın.",
        paragraphs: [
          "Bağımlılıklar çoğu zaman başka bir ekibin sistem, süreç, yetkinlik veya karar teslim etmesi gereken program konuları olarak kaydedilir. Stratejik önemleri ancak etkiledikleri değer ve takvim görünür olduğunda anlaşılır. Sahibi olmayan bağımlılık umut olarak kalır. Eskalasyon eşiği olmayan bağımlılık kabul edilmiş gecikmeye dönüşür. Değer bağlantısı olmayan bağımlılığın önceliğini düşürmek kolaydır.",
          "Liderler orantısız değeri kısıtlayan az sayıdaki bağımlılığı incelemelidir. Her birinin sorumlusu, gereken tarihi, etki açıklaması ve tarih ya da kanıt eşiği kaçırıldığında uygulanacak yanıtı olmalıdır. Sonuç kusursuz tahmin değil; daha erken müdahale, daha dürüst sıralama ve gecikme yerleşmeden önce kaynakları yeniden tahsis etmek için daha açık bir zemindir.",
        ],
      },
      {
        title: "Değer göstergelerini eylem değiştirmek için kullanın.",
        paragraphs: [
          "Fayda takibi yönetim eyleminden ayrıldığında başarısız olur. Gecikmeli finansal sonuçlar önemlidir; ancak çoğu zaman çalışmayı yönlendirmek için geç gelir. Güvenilir değer mimarisi, sonuçları değer mekanizmasına bağlı öncü işletim göstergeleriyle birleştirir: benimseme, çevrim süresi, kalite, dönüşüm, kullanım, karar gecikmesi veya dönüşüme özgü başka bir ölçü.",
          "Bir gösterge ancak hareketi kararı değiştiriyorsa anlamlıdır. Benimseme düşük kalırsa süreç, teşvik, eğitim veya çözüm değişebilir. Çevrim süresi iyileşirken kalite düşüyorsa ölçekleme durabilir. Girişim artık stratejiyi desteklemiyorsa kaynaklar taşınabilir. Dönüşüm değeri sonda sunulan bir sayı değil; nerede müdahale edileceği, ısrar edileceği, yeniden tasarlanacağı veya durulacağına ilişkin sürekli tercihler bütünüdür.",
        ],
      },
    ],
    boardQuestions: [
      "En fazla değeri kısıtlayan çözülmemiş üç liderlik kararı hangisi?",
      "Her öncelikli girişim bir değer mekanizmasına ve sorumluya bağlanabiliyor mu?",
      "Hangi öncü göstergeler müdahale, kaynak değişimi veya durdurma kararı doğuracak?",
      "Mevcut yönetişim ritmi ödünleşimleri çözüyor mu, yoksa ağırlıkla faaliyet mi raporluyor?",
    ],
    relatedToolLabel: "Değeri geciktiren kararı bulun",
    sources: [{ label: "Ganrich Advisory dönüşüm yönetişimi çerçevesi", note: "Kanıt, sahiplik, karar ve değer göstergelerini bağlayan kurucu kavramsal çerçevesi." }],
    methodology: "Ganrich Advisory karar omurgasına dayalı kavramsal yönetim analizidir. Benchmark, müşteri sonucu veya haricî performans istatistiği ileri sürmez.",
    dataPeriod: "Uygulanamaz; kavramsal çerçeve 24 Temmuz 2026 tarihinde incelendi.",
    confidence: "Yön gösterici; ritim ve ölçüler programa ve kuruma göre uyarlanmalıdır.",
  },
  {
    ...en[2],
    slug: "pazara-giris-taahhutler-dizisidir",
    type: "Çerçeve",
    title: "Pazara giriş, birbirini izleyen taahhütlerdir",
    thesis: "Güçlü giriş stratejileri, geri döndürülebilir öğrenme adımlarıyla geri döndürülemez yatırımları birbirinden ayırır.",
    applicability: "Pazar cazip görünmesine rağmen doğru giriş modeli, kanıt eşiği veya taahhüt sırası net değilse kullanın.",
    dateLabel: "24 Temmuz 2026",
    readingTime: "11 dk",
    region: "Bölgesel büyüme",
    topic: "Büyüme",
    findings: [
      ["Cazibe, hazırlık değildir", "Dış fırsat ile kurumsal kapasite farklı sorulardır."],
      ["Giriş modeli gelişmeli", "Ticari kanıt ve işletim hazırlığı arttıkça taahhüt güçlenebilir."],
      ["İş birlikleri bağımlılık yaratır", "Erişim hızlanırken kontrol, ekonomi veya öğrenme alanı daralabilir."],
    ],
    analysis: [
      "Bir pazar cazip olabilir; ancak belirli bir kurum için belirli bir zamanda doğru taahhüt olmayabilir.",
      "Giriş tasarımı, ticari kanıt ve işletim hazırlığı geliştikçe düşük maliyetli öğrenmeden daha güçlü taahhütlere ilerlemelidir.",
      "Ortaya çıkan yol haritası evrensel bir puan değil; açık varsayımlar, eşikler, bağımlılıklar ve karar kapıları bütünüdür.",
    ],
    implications: ["Her taahhüt öncesinde gerekli kanıtı tanımlayın.", "Talebin yanında pazara erişim uygulanabilirliğini değerlendirin.", "Sıralamayı proje takvimi değil stratejik tasarım tercihi olarak ele alın."],
    framework: ["Öğren", "Sına", "Kur", "Ölçekle"],
    frameworkTitle: "Taahhüt sıralaması",
    counterargument: "Hızlı ilerleyen pazarlarda yüksek bir erken taahhüt, aşamalı girişin kaçıracağı erişim, yetenek ve konumu güvence altına alabilir.",
    weakeningEvidence: "Zayıf ilk kanıta ve sınırlı hazırlığa rağmen erken geri döndürülemez taahhüdün aşamalı öğrenmeden sürekli daha iyi sonuç verdiği örnekler.",
    source: "Öğrenme ve taahhüt ilişkisini inceleyen uluslararasılaşma araştırmalarından yararlanan Ganrich Advisory pazara giriş çerçevesi.",
    sections: [
      {
        title: "Pazar cazibesi ile kurumsal hazırlığı ayırın.",
        paragraphs: [
          "Pazara giriş kararları çoğu zaman kategori büyümesi, talep, rekabet, mevzuat veya müşteri yoğunluğu gibi dış fırsatla başlar. Bu sorular önemlidir; ancak belirli bir kurumun fırsatı yakalamaya hazır olduğunu kanıtlamaz. Hazırlık; güvenilir teklif, müşteriye erişim, karar hakları, liderlik ilgisi, yetenek, tedarik kapasitesi, uyum, işletme sermayesi ve yerelde öğrenme kapasitesini kapsar.",
          "İki boyut ayrı değerlendirilmelidir. Cazibesi yüksek, hazırlığı düşük pazar hemen yatırım yerine hedefli öğrenmeyi gerektirebilir. Cazibesi orta düzeyde olan ancak müşteri erişimi ve işletim uyumu güçlü pazar daha erken taahhüt hak edebilir. İkisini tek başlık puanında birleştirmek stratejik gerilimi gizler. Kısıtın pazar, kurum, önerilen giriş modeli veya kanıtın kendisi olup olmadığı görünür olmalıdır.",
        ],
      },
      {
        title: "Bir kanıt merdiveni tasarlayın.",
        paragraphs: [
          "Her belirsizlik aynı araştırma yöntemini gerektirmez. Masa başı çalışma mevzuatı ve pazar yapısını açıklayabilir. Müşteri görüşmesi problemi ve satın alma sürecini sınayabilir. Distribütör denemesi erişim ve ekonomiyi gösterebilir. Sınırlı ticari lansman tekrar eden talebi ve teslimatı sınayabilir. Kanıt merdiveni belirsizlikle eşleşmeli; daha küçük bir testin çözebileceği soruyu pahalı taahhütle yanıtlamamalıdır.",
          "Her aşamanın eşiği olmalıdır. Hangi sonuç ilerlemeyi, model değişikliğini veya durmayı destekler? Sinyali görmek için hangi süre yeterlidir? Mevsimsellik, ortak teşvikleri veya temsil gücü düşük müşteri nedeniyle hangi sonuç yanıltıcı olabilir? Bu soruları önceden belirlemek, kaynak ve itibar bağlandıktan sonra belirsiz sonuçları yeniden yorumlama eğilimini azaltır.",
        ],
      },
      {
        title: "Giriş modelini değişen bir tasarım olarak ele alın.",
        paragraphs: [
          "İhracat, distribütör, lisans, ortak girişim, satın alma ve öz kaynaklı operasyon bir kez seçilen alternatifler değildir. Kontrol, sermaye, hız, öğrenme ve bağımlılığın farklı birleşimleridir. Kanıt geliştikçe uygun model değişebilir. İlk ortak erişimi hızlandırabilir; daha sonra müşteri ilişkisini, ekonomiyi veya bilgiyi korumak için kurumun kendi yetkinliği gerekebilir.",
          "İş birlikleri özellikle dikkatle tasarlanmalıdır. Ortağın teşvikleri, yetkinlikleri, veri erişimi, münhasırlığı ve çıkış koşulları giriş yapan kurumun öğrenme ve kontrol alanını şekillendirir. Güçlü ilişki yönetişim ihtiyacını ortadan kaldırmaz. Kurum hangi yetkinlikleri koruyacağını, hangilerini geçici olarak dışarıdan kullanacağını ve hangi bağımlılıkların ölçekte kabul edilemez hâle geleceğini belirlemelidir.",
        ],
      },
      {
        title: "Açık kapılar üzerinden taahhüt verin.",
        paragraphs: [
          "Güvenilir giriş yol haritası yalnızca lansman görevleri değil, yönetim kararları dizisidir. Kapılar öğrenmeden ticari teste, yerel kuruluşa ve ölçeklemeye ilerleyebilir. Her kapı dış kanıtı, iç hazırlığı, ekonomiyi, riski ve sorumlu öneriyi birleştirmelidir. Sermaye takvim ilerlediği için değil, tanımlı eşik karşılandığı için serbest bırakılır.",
          "Aşamalı ilerleme her zaman yavaş değildir. Önem taşıyan az sayıdaki belirsizliği çözerek daha güvenli taahhüdü hızlandırabilir. Ayrıca evrensel yanıt değildir: erişim, lisans, yetenek, varlık veya ilk hareket avantajı kıtsa liderlik daha büyük erken taahhüdü rasyonel olarak kabul edebilir. Disiplin, bu ödünleşimi açık kılmak ve hangi varsayımların kanıtlanmak yerine satın alındığını bilmektir.",
        ],
      },
    ],
    boardQuestions: [
      "Geri döndürülemez taahhüt vermeden önce hangi belirsizlikleri çözebiliriz?",
      "Temel kısıt pazar cazibesi, kurumsal hazırlık veya giriş modeli mi?",
      "Ortaklık veya operasyon ölçeklenirken hangi yetkinlikler kontrolümüzde kalmalı?",
      "Bir sonraki sermaye dilimini hangi kanıt serbest bırakacak; hangi kanıt durduracak?",
    ],
    relatedToolLabel: "Fırsat ve hazırlığı karşılaştırın",
    sources: [
      { label: "Johanson ve Vahlne uluslararasılaşma süreci modeli", url: "https://doi.org/10.1057/palgrave.jibs.8490676", note: "Deneyimsel bilgi ile artan dış pazar taahhüdünü ilişkilendiren temel araştırma." },
      { label: "Ganrich Advisory taahhüt sıralaması çerçevesi", note: "Öğrenme kapılarını güncel pazara giriş kararlarına uygulayan kurucu yorumu." },
    ],
    methodology: "Yerleşik uluslararasılaşma araştırmaları ile karar kapısı çerçevesinin kavramsal sentezidir. Pazar sıralaması veya müşteri sonucu ileri sürmez.",
    dataPeriod: "Temel araştırma ve Ganrich çerçevesi 24 Temmuz 2026 tarihinde incelendi.",
    confidence: "Öğrenme ile taahhüdü ayırma gereğinde yüksek; belirli bir pazar için doğru sıralamada yön gösterici.",
  },
  {
    ...en[3],
    slug: "turkiye-korfez-sermaye-koridoru",
    type: "Koridor brifingi",
    title: "Türkiye–Körfez sermaye koridoru: ne değişti, işletmeler için ne anlama geliyor?",
    thesis: "Koridor daha kurumsal hâle geliyor. İşletmelerin diplomatik ivmeyi somut ticari avantaja dönüştürmesi gerekiyor.",
    applicability: "Türkiye–Körfez fırsatı stratejik açıdan cazip görünmesine rağmen müşteri, sermaye, ortak veya uygulama rotası henüz kanıtlanmadıysa kullanın.",
    dateLabel: "24 Temmuz 2026",
    readingTime: "12 dk",
    region: "Türkiye · Körfez",
    topic: "Bölgesel büyüme",
    findings: [
      ["Çerçeveler derinleşiyor", "Ticaret anlaşmaları, stratejik konseyler ve yatırım mekanizmaları iş birliği için daha düzenli rotalar oluşturuyor."],
      ["Koridor tek pazar değildir", "BAE, Suudi Arabistan, Katar, Kuveyt, Umman ve Bahreyn kurumları, öncelikleri ve erişim yollarıyla farklılaşır."],
      ["Uygulama kuruma özgüdür", "Kamusal ivme; ürün uyumunu, ortaklık ekonomisini, yönetişimi veya teslimat hazırlığını çözmez."],
    ],
    analysis: [
      "2023’ten bu yana ikili ve KİK düzeyindeki mekanizmalar Türkiye–Körfez ticaret ve yatırımının resmî mimarisini genişletti.",
      "İşletim açısından sonuç otomatik fırsat değildir. Ülke ve sektör bazında değerlendirilmesi gereken daha geniş bir olası rota kümesidir.",
      "Liderlik ekipleri koridor ivmesini erişim, tamamlayıcılık, yetkinlik ve kontrole ilişkin açık bir teze dönüştürmelidir.",
    ],
    implications: ["Ekonominizi etkileyen somut kurumsal veya ticari değişimi belirleyin.", "Körfez’i tek fırsat olarak ele almadan önce ülke ve pazara giriş rotası seçin.", "Taahhütten önce ortak teşviklerini, karar haklarını ve teslimat kapasitesini sınayın."],
    framework: ["Sinyal", "Erişim", "Uyum", "Taahhüt"],
    frameworkTitle: "Koridordan taahhüde sıralama",
    counterargument: "Güçlü siyasi ve kurumsal ivme, hız ile üst düzey ilişkilerin aşamalı kanıttan daha önemli olduğu fırsat pencereleri yaratabilir.",
    weakeningEvidence: "Resmî anlaşmaların ve üst düzey mekanizmaların pazara özgü yetkinlik veya yönetişim olmadan kurum düzeyinde sürekli cazip ekonomi yarattığını gösteren kanıt.",
    source: "24 Temmuz 2026 itibarıyla güncel Türkiye, KİK ve BAE resmî kaynaklarının Ganrich Advisory sentezi.",
    sections: [
      {
        title: "Koridor daha resmî bir mimari kazandı.",
        paragraphs: [
          "Değişim ilişkilerin çevresindeki mekanizmalarda görülüyor. BAE–Türkiye Kapsamlı Ekonomik Ortaklık Anlaşması Mart 2023’te imzalandı ve Eylül 2023’te yürürlüğe girdi. Mal, hizmet, dijital ticaret, yatırımın kolaylaştırılması, kamu alımları ve rekabet gibi işletim konularını kapsıyor. Mart 2024’te Türkiye ile Körfez İşbirliği Konseyi serbest ticaret müzakerelerini yeniden başlatan ortak bildiri imzaladı; ilk tur Temmuz 2024’te Ankara’da gerçekleştirildi.",
          "Mimari genişlemeyi sürdürdü. İlk Türkiye–BAE Yüksek Düzeyli Stratejik Konsey toplantısı Temmuz 2025’te yapıldı; sanayi ve imalat, ilaç, gıda ve tarım ile turizm dâhil çeşitli sektörlerde iş birliği anlaşmaları imzalandı. Türkiye’nin Ekim 2025 Körfez turu; Kuveyt, Katar ve Umman’la yatırım, ulaştırma, enerji, finans ve stratejik planlama alanlarında yeni belgeler üretti. Ortaya çıkan sinyal, ticari değişim etrafında daha fazla forum, sektör kanalı ve resmî araç bulunduğudur.",
        ],
      },
      {
        title: "Kurumsal ivme erişimi değiştirir; yanıtı değil.",
        paragraphs: [
          "Resmî mimari bazı sürtünmeleri azaltabilir, kuralları açıklayabilir, diyalog kanalları oluşturabilir veya belirli iş birliklerini kolaylaştırabilir. Hükümetlerin tamamlayıcılık gördüğü sektörlere dikkat de yöneltebilir. Ancak ticaret anlaşması müşteri talebini, mutabakat zaptı ekonomiyi ve iş forumu kurumun yerel bağlamda teslimat kapasitesini kanıtlamaz. Kamusal sinyal, kuruma özgü mekanizmaya çevrilmelidir.",
          "Bu mekanizma belirli üründe tarife uygulaması, kamu alımlarına erişim, yerel yatırım ortağı, imalat tamamlayıcılığı, finansman rotası veya üçüncü pazarlara hizmet platformu olabilir. Liderlik mekanizmayı açık biçimde ifade etmeli; güncel hukuk, vergi, gümrük, mevzuat ve ticari danışmanlıkla doğrulamalıdır. Fırsat genel diplomatik ivmenin ötesinde ifade edilemiyorsa henüz yatırım tezi değildir.",
        ],
      },
      {
        title: "Körfez’i farklı bağlamlardan oluşan portföy olarak ele alın.",
        paragraphs: [
          "Körfez İşbirliği Konseyi önemli bölgesel çerçevedir; ancak işletmeler ülkelere, sektörlere, müşteri sistemlerine ve mevzuat ortamlarına girer. BAE’nin ticaret, finans ve lojistik platformu rolü bir fırsat kümesi yaratır. Suudi Arabistan’ın ölçeği ve yerelleştirme öncelikleri başka bir küme oluşturur. Katar, Kuveyt, Umman ve Bahreyn’in kurumsal yapıları, sektör gündemleri, ortak ekosistemleri ve karar süreçleri farklıdır.",
          "Koridor stratejisi bu nedenle ülke sıralamasını açıklamalıdır. İlk pazar; öğrenme, müşteri erişimi, sermaye, üretim veya bölgesel koordinasyon amacıyla seçilebilir, yalnızca büyüklüğü nedeniyle değil. Hangi yetkinliklerin koridor genelinde paylaşılacağını, hangilerinin yerel olması gerektiğini de belirtmelidir. Ülke düzeyinde işletim tasarımı bulunmayan bölgesel iddia, dağınık iş geliştirme ve zayıf sorumluluk üretir.",
        ],
      },
      {
        title: "Ortaklığı kutlamadan önce tasarlayın.",
        paragraphs: [
          "Ortaklıklar erişim, yerel bilgi, güvenilirlik, varlık veya sermaye sağlayabildiği için koridor fırsatlarında merkezî rol oynar. Stratejik soru, ortaklığın neyi başarması gerektiği ve işletmenin neyi kendi kontrolünde tutacağıdır. Karar hakları, müşteri verisi, ekonomi, münhasırlık, performans standartları, fikrî mülkiyet, yetenek, uyum ve çıkış; ilişki ivmesi taahhüde dönüşmeden önce değerlendirilmelidir.",
          "En güvenilir koridor planı dört unsuru bağlar: tarihli dış sinyal, tanımlı erişim rotası, kurumsal uyum değerlendirmesi ve aşamalı taahhüt kapıları. Bu yaklaşım hız sağlar; heyecanı kanıtla karıştırmaz. Sonuç büyük yatırım, dar ticari test, ortaklığın yeniden tasarımı veya ilerlememe kararı olabilir. Önemli olan koridorun jeopolitik söylem değil, işletim tezi hâline gelmesidir.",
        ],
      },
    ],
    boardQuestions: [
      "Hangi somut anlaşma, mekanizma veya sektör kanalı rotamızı ya da ekonomimizi değiştiriyor?",
      "Hangi Körfez ülkesi önce gelmeli ve orada ne öğrenmeye çalışıyoruz?",
      "Hangi yetkinlik veya müşteri ilişkisi kontrolümüzde kalmalı?",
      "Diplomatik ivmeyi yatırım yapılabilir işletim tezine hangi kanıt dönüştürecek?",
    ],
    relatedToolLabel: "Türkiye–Körfez pazar sıralamasını sınayın",
    sources: [
      { label: "BAE Ekonomi Bakanlığı — BAE–Türkiye KEOKA", url: "https://www.moet.gov.ae/en/web/guest/cepa_turkey", note: "3 Mart 2023’te imzalanan ve 1 Eylül 2023’te yürürlüğe giren anlaşma; 24 Temmuz 2026’da incelendi." },
      { label: "T.C. Ticaret Bakanlığı — Türkiye–KİK STA ilk turu", url: "https://ticaret.gov.tr/haberler/turkiye-korfez-isbirligi-konseyi-kik-serbest-ticaret-anlasmasi-hakkinda-basin-duyurusu", note: "31 Temmuz 2024 tarihli, ilk müzakere turu ve kapsamını açıklayan resmî duyuru." },
      { label: "Türkiye Yatırım ve Finans Ofisi — Türkiye–BAE anlaşmaları", url: "https://www.invest.gov.tr/en/news/news-from-turkey/pages/turkiye-and-uae-sign-seven-landmark-agreements-to-deepen-strategic-partnership.aspx", note: "17 Temmuz 2025 tarihli resmî yatırım tanıtım ofisi duyurusu." },
      { label: "Türkiye Yatırım ve Finans Ofisi — 2025 Körfez turu", url: "https://www.invest.gov.tr/en/news/news-from-turkey/pages/president-erdogan-gulf-tour-yields-24-agreements-joint-statements-declarations.aspx", note: "27 Ekim 2025 tarihli resmî özet." },
    ],
    methodology: "Resmî kamu kaynaklarının masa başı sentezidir. Anlaşmalar ve politika mekanizmaları sinyal olarak ele alınır; kurum düzeyinde talep, getiri veya uygulama hazırlığı yarattıkları ileri sürülmez.",
    dataPeriod: "Mart 2023–Ekim 2025; kaynaklar 24 Temmuz 2026 tarihinde incelendi.",
    confidence: "Atıf yapılan kurumsal gelişmelerde yüksek; tekil işletmeler için çıkarımlarda yön gösterici.",
  },
  {
    ...en[4],
    slug: "aile-holdingleri-isletim-modeli-gecisi",
    type: "Yönetişim perspektifi",
    title: "Aile holdingleri ve işletim modeli geçişi",
    thesis: "Temel geçiş aileden kurumsala değil, örtük otoriteden açık karar haklarına doğrudur.",
    applicability: "Aile holdingi büyüyor, profesyonelleşiyor, nesil değiştiriyor veya karar modeli uyum sağlayamadan yeni işler ekliyorsa kullanın.",
    dateLabel: "24 Temmuz 2026",
    readingTime: "11 dk",
    region: "Türkiye · MENA",
    topic: "İşletim modeli",
    findings: [
      ["Profesyonelleşme, ailenin geri çekilmesi değildir", "Amaç aile sahipliği ile profesyonel yönetimin birbirini nasıl güçlendireceğini açıklamaktır."],
      ["Yapı kararları izler", "Kurullar, komiteler ve merkez ancak karar görevleri açık olduğunda değer yaratır."],
      ["Geçiş portföyü kapsamalıdır", "Sahiplik, sermaye tahsisi, yetenek ve iş birimi özerkliği tek model içinde ele alınmalıdır."],
    ],
    analysis: [
      "Aile holdingleri hız, uzun vadeli bağlılık ve yoğunlaşmış muhakeme taşır. Büyüme, aynı örtük modeli sürdürmeyi zorlaştırabilir.",
      "İşletim modeli görevi; aile, sahiplik, yönetim kurulu, merkez ve şirketler arasındaki kararları netleştirirken sahiplik iradesini korumaktır.",
      "Başarılı geçiş, yeni yönetişim organlarının sayısıyla değil, daha iyi karar ve sorumlulukla görünür olur.",
    ],
    implications: ["Kişisel erişim veya yazılı olmayan teamüllere bağlı kararları haritalayın.", "Aile, sahiplik, yönetim kurulu, merkez ve iş birimlerinin görevlerini tanımlayın.", "Liderlik rollerini, bilgiyi ve teşvikleri yeni karar modeliyle uyumlayın."],
    framework: ["Sahiplik iradesi", "Görevler", "Ritim", "Yenilenme"],
    frameworkTitle: "Holding işletim modeli geçişi",
    counterargument: "Otoriteyi resmileştirmek girişimci hızı zayıflatabilir ve sahiplerle derinlemesine bildikleri işler arasına mesafe koyabilir.",
    weakeningEvidence: "Giderek karmaşıklaşan holdinglerin nesiller ve portföyler boyunca yalnızca gayriresmî otoriteyle sürekli hızlı ve nitelikli karar verdiği örnekler.",
    source: "IFC aile şirketi yönetişim rehberinden yararlanan Ganrich Advisory işletim modeli perspektifi.",
    sections: [
      {
        title: "Gayriresmîliğin içindeki gücü koruyun.",
        paragraphs: [
          "Aile şirketleri sahiplik, bilgi, güven ve otorite yoğunlaştığı için olağanüstü hızla karar verebilir. Uzun vadeli bakış ve karar sahiplerine doğrudan erişim dayanıklılık ile cesur taahhütleri destekleyebilir. İşletim modeli geçişinin amacı bu güçlü yönleri genel kurumsal mekanizmalarla değiştirmek değildir. Kurum büyür, çeşitlenir ve az sayıdaki ilişkiye daha az bağımlı hâle gelirken güçlü yönleri korumaktır.",
          "Kararlar kişisel erişime bağlıysa, grubun farklı bölümleri farklı sinyal alıyorsa veya yöneticiler yetkilerinin nerede başlayıp bittiğini bilmiyorsa gayriresmîlik kısıta dönüşür. Tekrarlanan eskalasyon, temkinli profesyonel yönetim, aşırı yüklenen sahipler veya müdahale bekleyen iş birimleri ortaya çıkar. Bunlar yalnızca organizasyon şeması sorunları değil, yükü artan örtük karar sisteminin belirtileridir.",
        ],
      },
      {
        title: "Rolleri ayırın; amacı ayırmayın.",
        paragraphs: [
          "Aile holdingi birbiriyle örtüşen sistemler içerir: aile, sahiplik, yönetim kurulu, grup merkezi ve faaliyet şirketleri. Bir kişi birkaç sistemde rol alabilir; ancak her sistemin görevi farklıdır. Aile yönetişimi katılım, değerler ve sürekliliği; sahiplik, koruma ve getiri beklentisini; yönetim kurulu şirket yönetişimini; merkez portföy ile ortak yetkinlikleri; iş birimleri ise tanımlı yetki içinde uygulamayı ele alır.",
          "Aynı konu açık karar yolu olmadan sistemler arasında dolaştığında karışıklık doğar. Profesyonelleşme aile ile yönetim arasında mücadele gibi görünür. Daha güçlü tasarım ortak amaçtan başlar; hangi kararın nerede olduğunu, kanıtı kimin sunduğunu, kimin görüş verdiğini, kimin karar aldığını ve çözülemeyen gerilimin nasıl yükseltileceğini açıklar. Açık roller hem sahiplik iradesini hem yönetim sorumluluğunu korur.",
        ],
      },
      {
        title: "Merkezi portföy tercihleri etrafında tasarlayın.",
        paragraphs: [
          "Holding merkezleri çoğu zaman merkezileşmenin kontrol veya verimlilik göstergesi olduğu varsayımıyla işlev biriktirir. Daha önemli soru, hangi kararların grup bakışından gerçekten yararlandığıdır. Portföy stratejisi, sermaye tahsisi, üst düzey yetenek, risk, yönetişim standartları ve seçilmiş ortak yetkinlikler merkezî yetkiyi gerektirebilir. Ticari ve operasyonel kararlar ise yerel hız ile bilginin önemli olduğu durumlarda şirkete yakın kalabilir.",
          "Merkezin değer yaratma mantığı olmalıdır. Stratejik mimar, aktif sahip, yetkinlik geliştirici veya bunların bilinçli birleşimi olarak çalışabilir. Her rol farklı yetenek, bilgi, ritim ve müdahale hakkı gerektirir. Mantık yoksa merkez pasif konsolidatöre veya ek onay katmanına dönüşebilir. Test, merkezin katılımının tanımlı karar sınıfını daha iyi hâle getirip getirmediğidir.",
        ],
      },
      {
        title: "Geçişi gerçek kararlar dizisi olarak yönetin.",
        paragraphs: [
          "Yeni tüzükler, komiteler ve rol tanımları işletim modelini tek başına değiştirmez. Model; gerçek sermaye, insan, performans ve portföy kararları onun üzerinden verildiğinde hayata geçer. İlk aşama, tekrarlanan ve önem taşıyan az sayıdaki karara odaklanmalı; yeni görev, bilgi ve ritmi bu kararlar üzerinde işletmelidir. Tasarım genişletilmeden önce belirsizlikler görünür olur.",
          "Nesil veya liderlik değişimi aciliyeti artırır; ancak tek tetikleyici olmamalıdır. Karmaşıklık, halefiyet yakın değilken de modeli aşabilir. Ölçülü geçiş karar mimarisini kurar, gerektiği yerde kurulları ve yönetimi güçlendirir, sahipliği destekleyen bilgiyi üretir ve kullanım yoluyla güven oluşturur. Hedef ailenin etkisinin azalması değil, büyüme ve yenilenmeye dayanabilen sistem üzerinden kullanılmasıdır.",
        ],
      },
    ],
    boardQuestions: [
      "Hangi kararlar hâlâ kişisel erişime, yazılı olmayan teamüle veya tekrarlanan eskalasyona bağlı?",
      "Holding merkezinin değer yaratma rolü nedir?",
      "Sahiplik iradesi nerede doğrudan kullanılmalı, profesyonel yetki nerede korunmalı?",
      "Yeni işletim modelinin çalışıp çalışmadığını hangi gerçek kararlar sınayacak?",
    ],
    relatedToolLabel: "İşletim modeli kararını çerçeveleyin",
    sources: [
      { label: "IFC Aile Şirketi Yönetişim Rehberi", url: "https://www.ifc.org/en/insights-reports/2011/ifc-family-business-governance-handbook", note: "Örtüşen roller, aile yönetişim yapıları ve nesiller boyunca gelişim hakkında uygulamalı rehber." },
      { label: "Ganrich Advisory işletim modeli geçiş çerçevesi", note: "Aile, sahiplik, yönetim kurulu, merkez ve şirketler arasındaki karar haklarına odaklanan kurucu yorumu." },
    ],
    methodology: "Kamuya açık yönetişim rehberi ile karar hakları odaklı işletim modeli çerçevesinin kavramsal sentezidir. Hiçbir aile, şirket veya çalışma temsil edilmez.",
    dataPeriod: "IFC rehberi ve Ganrich çerçevesi 24 Temmuz 2026 tarihinde incelendi.",
    confidence: "Yönetişim ayrımlarında yüksek; belirli bir holding için uygun tasarımda yön gösterici.",
  },
  {
    ...en[5],
    slug: "orta-olcekli-sanayide-yapay-zeka-degeri",
    type: "Değer gündemi",
    title: "Orta ölçekli sanayi şirketlerinde yapay zekâ nerede ölçülebilir değer yaratır?",
    thesis: "Değer, yapay zekâ etkileyici çıktı ürettiğinde değil; tekrarlanan bir işletim kararını değiştirdiğinde ortaya çıkar.",
    applicability: "Sanayi şirketinde çok sayıda yapay zekâ fikri bulunduğu hâlde kullanım alanından işletim değerine geçiş için güvenilir ve ölçülen bir sıralama yoksa kullanın.",
    dateLabel: "24 Temmuz 2026",
    readingTime: "12 dk",
    region: "Bölgeler arası",
    topic: "Uygulamalı Yapay Zekâ",
    findings: [
      ["Karar sıklığı ve değerle başlayın", "Tekrarlanan ve sonucu gözlemlenebilen karar, geniş yetkinlik vaadinden daha kolay değerlendirilebilir."],
      ["Veri hazırlığı yereldir", "Soru kurumun kusursuz platforma sahip olup olmadığı değil, iş akışında kullanılabilir ve yönetilen veri bulunup bulunmadığıdır."],
      ["Benimseme ekonominin parçasıdır", "Operatörler güvenemiyor, kullanamıyor veya sorgulayamıyorsa teknik açıdan güçlü sistem değer yaratmaz."],
    ],
    analysis: [
      "Orta ölçekli sanayi şirketleri çoğu zaman zengin işletim bilgisine, sınırlı uzman kapasitesine ve eşit olmayan veri ortamlarına sahiptir.",
      "En güçlü başlangıç noktaları kararların tekrarlandığı, sonuçların gözlemlenebildiği ve insan uzmanlığının sonucu sınayabildiği sınırlı iş akışlarıdır.",
      "Değer gündemi kullanım alanlarını değer, uygulanabilirlik, benimseme ve riske göre sıralamalı; işletim değişikliğini çözümün parçası saymalıdır.",
    ],
    implications: ["Teknolojileri değil iş akışlarını sıralayın.", "Kullanım alanını geliştirmeden önce mevcut durumu ölçün.", "Modelle birlikte süreç, rol ve kontrol değişiklikleri için kaynak ayırın."],
    framework: ["İş akışı", "Başlangıç", "Sına", "Ölçekle"],
    frameworkTitle: "Sanayide yapay zekâ değer sıralaması",
    counterargument: "Platform öncelikli yatırım, birkaç kullanım alanını mümkün kılan ortak veri ve teknik yetkinlikleri kurabilir; parçalı deneyleri önleyebilir.",
    weakeningEvidence: "Belirli iş akışı sahipliği, benimseme veya başlangıç ölçümü kurulmadan platform odaklı programların yaygın ve ölçülebilir işletim değeri yarattığı örüntü.",
    source: "NIST ve OECD sorumlu yapay zekâ rehberlerinden yararlanan Ganrich Advisory sanayi yapay zekâ değer çerçevesi.",
    sections: [
      {
        title: "Tekrarlanan kararları bulun.",
        paragraphs: [
          "Sanayide değer binlerce işletim kararıyla yaratılır: neyin planlanacağı, inceleneceği, bakım göreceği, fiyatlanacağı, satın alınacağı, bekletileceği, serbest bırakılacağı, araştırılacağı veya eskale edileceği. Bazıları deneyimli kişiler tarafından parçalı bilgi ve zaman baskısı altında verilir. Yapay zekâ, tanımlı kararın kanıtını, tutarlılığını veya hızını geliştirdiğinde yardımcı olabilir. Fırsat, tahmin ya da üretme yeteneğinin kendisi değil, daha iyi tercihin işletim sonucudur.",
          "Sıklık önemlidir; çünkü öğrenme ve değer birikir. Nadir stratejik karar çok önemli olabilir, fakat tekrarlanan kullanımla değerlendirilmesi zordur. Planlama, kalite, bakım, ticari süreç veya hizmette tekrarlanan karar daha açık başlangıç ve geri bildirim döngüsü yaratabilir. Sonuç yine önemlidir: sık ancak düşük değerli görev entegrasyonu hak etmeyebilir; daha az sık darboğaz ise kapasite açabilir veya anlamlı riski azaltabilir.",
        ],
      },
      {
        title: "Kullanım alanı listesinden önce değer haritası kurun.",
        paragraphs: [
          "Neredeyse her fonksiyon uygulama hayal edebildiği için kullanım alanı katalogları hızla büyür. Değer haritası disiplin getirir. İş akışını sonuca, sonucu ölçüye ve ölçüyü karar sahibine bağlar. Mevcut başlangıcı, gelişimin kaynağını ve gereken işletim değişikliğini de açıklar. Böylece yüzeyde farklı görünen fikirler karşılaştırılabilir.",
          "İlk tarama için dört soru yeterlidir: değer anlamlı mı, veri kullanılabilir mi, sonuç işe entegre edilebilir mi, risk kabul edilebilir mi? Bunlar bağımsız değildir. Yüksek değerli kullanım alanı veri iyileştirmesini haklı çıkarabilir. Teknik açıdan kolay alan, kullanıcının davranış değiştirme nedeni yoksa yine başarısız olabilir. Portföy, yakın vadeli kanıt ile az sayıdaki yetkinlik geliştiren yatırımı dengelemelidir.",
        ],
      },
      {
        title: "Veri ile uzmanlığı tek sistem olarak ele alın.",
        paragraphs: [
          "Sanayi verisi ekipman, tesis, süreç ve yerel iş yapış biçimlerinin tarihini yansıtır. Etiketler tutarsız, hatalar nadir, bakım kayıtları uzman kısaltmalarıyla dolu olabilir; aynı ölçü farklı hatlarda farklı anlam taşıyabilir. Bu durum yapay zekâyı imkânsız kılmaz. Çalışmanın, verinin nasıl üretildiğini bilen kişilerle birlikte iş akışına yakın başlamasını gerektirir.",
          "Alan uzmanları hedefi tanımlamalı, yanıltıcı göstergeleri belirlemeli, uç durumları incelemeli ve önerinin ne zaman güvensiz ya da ilgisiz olduğunu söylemelidir. Rolleri başlangıçta bilgi vermekle sınırlı değildir; test, izleme ve iyileştirmenin parçasıdırlar. Operasyondan sorumlu kişiler tarafından sorgulanamayan sistemin kalıcı güven kazanması zordur.",
        ],
      },
      {
        title: "İşletim değişikliğini ölçün.",
        paragraphs: [
          "Kavram kanıtı teknik performansı gösterebilir. Değer testi iş akışındaki değişimi göstermelidir. Başlangıç ve karşılaştırma gerekir: çevrim süresi, verim, plansız duruş, ilk seferde doğru kalite, tahmin hatası, işletme sermayesi, dönüşüm, servis yanıtı veya kullanım alanına bağlı başka bir ölçü. Tasarım istenmeyen etkileri, insan müdahalelerini ve farklı bağlamlardaki performansı da izlemelidir.",
          "Ölçekleme; değer, benimseme, kontroller, sahiplik ve ekonomi birlikte kanıtlandığında gelir. Model; entegrasyon, izleme, geri dönüş prosedürü, rol değişikliği ve eğitim gerektirebilir. Bu maliyetler iş gerekçesine dâhildir. Orta ölçekli şirketlerin en büyük kurumların mimarisini taklit etmesi gerekmez. Kanıt üreten, tekrar kullanılabilir yetkinlik kuran ve ölçekleme hakkını kazanan küçük, yönetilen bir portföye ihtiyaçları vardır.",
        ],
      },
    ],
    boardQuestions: [
      "Hangi tekrarlanan işletim kararları anlamlı ve gözlemlenebilir sonuçlar taşıyor?",
      "Değeri heyecandan ayıracak kadar güçlü bir başlangıç ölçümümüz var mı?",
      "Kararın sahibi olan ve çıktıyı sorgulayabilen alan uzmanları kim?",
      "İş gerekçesinde hangi işletim, kontrol ve benimseme maliyetleri eksik?",
    ],
    relatedToolLabel: "En yüksek değerli yapay zekâ kararını bulun",
    sources: [
      { label: "NIST Yapay Zekâ Risk Yönetimi Çerçevesi", url: "https://www.nist.gov/itl/ai-risk-management-framework", note: "Yaşam döngüsü yönetişimi, test ve risk yönetimi ilkeleri için kullanılan çerçeve." },
      { label: "OECD Yapay Zekâ İlkeleri", url: "https://www.oecd.org/en/topics/sub-issues/ai-principles.html", note: "İnsan gözetimi, şeffaflık, sağlamlık ve hesap verebilirlik için kullanılan rehber." },
      { label: "Ganrich Advisory sanayide yapay zekâ değer çerçevesi", note: "İş akışı, başlangıç, test ve ölçekleme sıralaması." },
    ],
    methodology: "Kavramsal işletim modeli analizidir. Örnek ölçüler olası değerlendirme kategorilerini açıklar; benchmark veya sonuç iddiası değildir.",
    dataPeriod: "Kamuya açık yapay zekâ yönetişim kaynakları ve Ganrich çerçevesi 24 Temmuz 2026 tarihinde incelendi.",
    confidence: "İş akışı öncelikli mantıkta yüksek; kullanım alanı önceliği ve elde edilebilir değerde yön gösterici.",
  },
];

en[1].sections.push({
  title: "Create a stopping discipline.",
  paragraphs: [
    "Transformation portfolios rarely become smaller by themselves. Initiatives acquire sponsors, teams, narratives, and sunk cost. A periodic stopping review should ask whether the original value mechanism still holds, whether the strategic context has changed, and whether scarce leadership capacity would create more value elsewhere. Stopping is not failure when evidence has changed; continuing without a current thesis is.",
    "The discipline also improves starting decisions. When sponsors know that initiatives will be reviewed against explicit evidence and value signals, the original case becomes more precise. Assumptions are recorded, baselines are established, and ownership is harder to diffuse. A portfolio that can stop work deliberately is more capable of concentrating resources behind the few changes that matter.",
  ],
});

en[2].sections.push({
  title: "Define the exit before entry.",
  paragraphs: [
    "Entry design is incomplete without an exit or adaptation logic. Leadership should identify which commitments can be unwound, what signals would trigger a change, how customer and partner obligations will be handled, and which assets or capabilities retain value in another configuration. Thinking about exit does not weaken conviction. It reveals hidden irreversibility and improves the quality of the initial agreement.",
    "This matters especially when a partner controls the customer relationship, licence, data, or local infrastructure. The organisation may discover that a superficially low-capital route creates a high strategic dependency. Exit clauses, information rights, transition support, and ownership of learning should therefore be treated as part of market-entry strategy rather than left to late-stage documentation.",
  ],
});

const trSupplements: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: "Yönetim ekibinin ortak dilini kurun.",
    paragraphs: [
      "Yapay zekâ tartışmaları teknik olasılık, risk, verimlilik ve insan etkisi arasında hızla parçalanabilir. Ortak karar dili bu başlıkları tek bir kullanım alanı kaydında birleştirir: karar nedir, değer nasıl oluşur, hangi veri kullanılır, insan nerede müdahale eder, kabul edilemez sonuç nedir ve bir sonraki taahhüt için hangi kanıt gerekir? Böylece farklı uzmanlıklar aynı tercihi tartışır.",
      "Bu kayıt sabit belge değildir. Test ilerledikçe varsayımlar, sonuçlar ve kontroller güncellenir. Liderlik teknoloji ayrıntısında kaybolmadan kanıtın yeterli olup olmadığını ve kalan riskin kabul edilip edilmediğini görebilir. Ortak dil, hız ile ölçülülük arasında seçim yapmak yerine ikisini aynı karar mimarisinde yönetmeyi sağlar.",
    ],
  },
  {
    title: "Durdurma disiplinini kurun.",
    paragraphs: [
      "Dönüşüm portföyleri kendiliğinden küçülmez. Girişimler zamanla sponsor, ekip, anlatı ve batık maliyet edinir. Düzenli durdurma incelemesi; ilk değer mekanizmasının hâlâ geçerli olup olmadığını, stratejik bağlamın değişip değişmediğini ve sınırlı liderlik kapasitesinin başka yerde daha fazla değer yaratıp yaratmayacağını sormalıdır. Kanıt değiştiğinde durmak başarısızlık değildir; güncel tez olmadan devam etmek asıl risktir.",
      "Bu disiplin başlangıç kararlarını da geliştirir. Sponsorlar girişimlerin açık kanıt ve değer göstergeleriyle inceleneceğini bildiğinde ilk gerekçe daha hassas kurulur. Varsayımlar kaydedilir, başlangıç ölçülür ve sorumluluğun dağılması zorlaşır. Çalışmayı bilinçli biçimde durdurabilen portföy, kaynakları gerçekten önem taşıyan az sayıdaki değişime yoğunlaştırabilir.",
      "Durdurma kararı çalışanlar ve paydaşlar için de açıklanmalıdır. Ne öğrenildiği, hangi varsayımın değiştiği, hangi yetkinlik veya varlığın korunacağı ve kaynakların nereye taşınacağı netleştiğinde kurum durmayı geri çekilme değil, kanıta dayalı portföy yönetimi olarak görür. Aksi hâlde programlar yalnızca itibar kaybı korkusuyla devam eder ve yeni öncelikler eski yüklerin üzerine eklenir.",
      "Yönetim kurulu düzeyinde bu yaklaşım, dönüşümü tek bir büyük taahhüt yerine gözden geçirilen değer varsayımları portföyü olarak ele almayı gerektirir. Her varsayımın sahibi, kanıtı, sonraki kararı ve kaynak etkisi görünür olduğunda kurul ayrıntılı proje yönetimine inmeden portföy kalitesini değerlendirebilir. Böylece yönetişim hem daha seçici hem de daha hızlı hâle gelir.",
    ],
  },
  {
    title: "Girişten önce çıkışı tanımlayın.",
    paragraphs: [
      "Çıkış veya uyarlama mantığı olmayan giriş tasarımı eksiktir. Liderlik hangi taahhütlerin geri alınabileceğini, hangi sinyallerin yön değişikliğini tetikleyeceğini, müşteri ve ortak yükümlülüklerinin nasıl ele alınacağını ve hangi varlık ya da yetkinliklerin farklı düzende değerini koruyacağını belirlemelidir. Çıkışı düşünmek kararlılığı zayıflatmaz; gizli geri döndürülemezliği görünür kılar ve ilk anlaşmayı geliştirir.",
      "Ortak müşteri ilişkisini, lisansı, veriyi veya yerel altyapıyı kontrol ediyorsa konu özellikle önemlidir. Düşük sermayeli görünen rota yüksek stratejik bağımlılık yaratabilir. Çıkış hükümleri, bilgi hakları, geçiş desteği ve öğrenmenin sahipliği bu nedenle son aşama dokümantasyonu değil, pazara giriş stratejisinin parçası olmalıdır.",
      "Çıkış tasarımı itibar ve ilişki riskini de kapsar. Pazardan çekilme, ortaklığı değiştirme veya ölçeği küçültme kararı müşterilere, çalışanlara, düzenleyicilere ve tedarikçilere karşı yükümlülük yaratabilir. Bu etkileri giriş öncesinde düşünmek kararı daha temkinli değil, daha uygulanabilir kılar. Liderlik böylece yalnızca pazara nasıl gireceğini değil, farklı kanıtlar ortaya çıktığında nasıl sorumlu biçimde uyum sağlayacağını da bilir.",
      "Yönetim kurulunun göreceği giriş notu bu mantığı tek yerde toplamalıdır: fırsat tezi, kurumsal hazırlık, seçilen model, öğrenme planı, taahhüt kapıları ve çıkış koşulları. Böyle bir not belirsizliği ortadan kaldırmaz; hangi belirsizliğin bilinçli olarak kabul edildiğini ve hangisinin bir sonraki karardan önce çözülmesi gerektiğini görünür kılar.",
    ],
  },
  {
    title: "Koridor tezini düzenli olarak yenileyin.",
    paragraphs: [
      "Kurumsal ilişkiler ve anlaşma çerçeveleri değiştikçe koridor tezi de güncellenmelidir. Yıllık strateji çevrimi tek başına yeterli olmayabilir. Şirket; resmî düzenlemeleri, sektör önceliklerini, ortak ekosistemini, müşteri davranışını ve kendi hazırlığını aynı kayıt üzerinde izlemelidir. Amaç her gelişmeye tepki vermek değil, hangi sinyalin mevcut varsayımı gerçekten değiştirdiğini ayırt etmektir.",
      "Yönetim kurulu veya yatırım komitesi için kısa bir koridor notu bu disiplini sağlayabilir: ne değişti, bunun şirkete özgü mekanizması nedir, hangi kanıt eksiktir ve hangi karar ne zaman gerekecektir? Böylece bölgesel gündem haber akışı olmaktan çıkar, sermaye ve yetkinlik tercihlerini yöneten kontrollü bir izleme sistemine dönüşür.",
    ],
  },
  {
    title: "Bilgi sistemini karar haklarıyla birlikte yenileyin.",
    paragraphs: [
      "Açık karar hakları, karar verene zamanında ve karşılaştırılabilir bilgi ulaşmıyorsa çalışmaz. Holding geçişi bu nedenle raporlama tasarımını da kapsar. Merkez ile şirketlerin hangi performans, risk, nakit, yetenek ve portföy bilgisini hangi sıklıkta paylaşacağı belirlenmelidir. Daha fazla veri her zaman daha iyi yönetişim değildir; karar için gereken az sayıdaki sinyal daha değerlidir.",
      "Bilgi sistemi müdahale sınırlarını da desteklemelidir. Merkez hangi durumda soru sorar, kaynak değiştirir veya doğrudan devreye girer? İş birimi hangi sınırlar içinde bağımsız hareket eder? Eşikler açık olduğunda özerklik kontrol kaybı gibi, merkezî gözetim de sürekli müdahale gibi yaşanmaz. Bilgi ile yetkinin birlikte tasarlanması, yeni modelin günlük güvenini kurar.",
      "Geçiş döneminde eski ve yeni beklentiler bir süre birlikte yaşayacaktır. Bu nedenle sorun yalnızca yeni rapor tasarlamak değil, karar davranışını izlemektir. Kararlar tekrar gayriresmî kanallara dönüyor mu, yönetim kurulu gerçek alternatifleri görüyor mu, iş birimleri belirlenen sınırlar içinde hareket ediyor mu? Bu sorular modelin kâğıt üzerinde değil, günlük yönetimde yerleşip yerleşmediğini gösterir.",
    ],
  },
  {
    title: "Yetkinliği portföy boyunca yeniden kullanın.",
    paragraphs: [
      "İlk kullanım alanının değeri yalnızca kendi sonucundan ibaret değildir. Veri erişimi, değerlendirme yöntemi, güvenlik kontrolü, entegrasyon deseni ve kullanıcı eğitimi başka iş akışlarında tekrar kullanılabiliyorsa kurum ölçek ekonomisi yaratır. Ancak tekrar kullanım varsayılmamalı; hangi bileşenin ortak, hangisinin tesis, ürün veya süreç için yerel olduğu açıkça belirlenmelidir.",
      "Ortak yetkinlik ile yerel uzmanlık arasındaki denge, orta ölçekli sanayi şirketleri için özellikle önemlidir. Aşırı merkezileşme bağlamı kaybettirebilir; tamamen yerel deneyler ise tekrar eden maliyet ve tutarsız kontrol yaratır. Küçük bir merkezî standart seti ile iş akışına yakın ürün sahipliği, öğrenmeyi hızlandırırken sorumluluğu koruyabilir.",
      "Yeniden kullanımın yönetimi için basit bir yetkinlik kaydı yeterli olabilir: hangi veri bağlantısı, değerlendirme ölçütü, kontrol, tedarikçi bileşeni veya eğitim malzemesi kanıtlandı; nerede kullanılabilir; sahibi kimdir; hangi sınırlara tabidir? Bu kayıt teknoloji envanterinden farklıdır. Kurumun yapay zekâyı tekrar eden biçimde güvenli ve ekonomik olarak işletme kapasitesini görünür kılar.",
    ],
  },
];

tr.forEach((article, index) => article.sections.push(trSupplements[index]));

export const phaseTwoInsightArticles: Record<Lang, InsightArticle[]> = { en, tr };

export const phaseTwoInsights: Record<Lang, InsightCard[]> = {
  en: en.map((article) => [article.title, article.thesis, article.topic, article.region, article.type]),
  tr: tr.map((article) => [article.title, article.thesis, article.topic, article.region, article.type]),
};
