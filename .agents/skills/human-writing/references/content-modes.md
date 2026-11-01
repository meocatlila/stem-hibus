# Content Modes

Choose the editing operation before the content mode. Combine content modes only when the requested reader task needs them. When the request names a document type, apply [Typed-Document Boundaries](#typed-document-boundaries) first. The shapes below are options, not required section checklists; preserve a supplied form and deliberate voice unless changing them serves the authorized task.

All modes inherit `fact-integrity.md`. The rules below describe only mode-specific structure and emphasis; they do not redefine source precedence, attribution, semantic fidelity, relationship disclosure, or external-claim handling.

## Contents

- [Operation And Reader Task](#operation-and-reader-task)
- [Typed-Document Boundaries](#typed-document-boundaries)
- [Short-Form](#short-form)
- [Factual Soft Copy](#factual-soft-copy)
- [Personal Technical Essay](#personal-technical-essay)
- [Tutorial](#tutorial)
- [Engineering Retrospective](#engineering-retrospective)
- [Architecture Note](#architecture-note)
- [Resource List](#resource-list)

## Operation And Reader Task

| Requested operation | Working boundary |
| --- | --- |
| Proofread / 校对 | Correct demonstrable spelling, grammar, punctuation, or consistency errors; keep argument, order, register, and deliberate wording. Each change must correct an actual error; synonym swaps are not proofreading. A clean source can return unchanged. |
| Local edit | Improve the named span; preserve all text and markup outside it. Within the span, preserve its communicative act and author intent: a wish, question, observation, offer, or decision is not interchangeable. A serious issue elsewhere does not expand the edit. |
| Structural rewrite | Reorder or combine material only within the granted scope; track unique claims and their conditions before moving or removing them. |
| Draft | Compose from the supplied facts and author intent; missing experience or evidence stays a gap. |
| Adapt / multiple candidates | Extract the supported claims first, then organize each artifact for its reader and container; preserve shared facts and disclosures. |

Infer the reader's goal and existing knowledge from the brief and sources. Ask only
when an unresolved audience choice would materially change the result. Add the
context this reader needs, rather than explaining everything or assuming expertise
from a job title alone.

For professional or technical material, choose by what the reader needs to do:

- **Learn by doing:** a tutorial gives a supported practice path and feedback.
- **Complete a known task:** an operational guide leads with prerequisites, ordered
  actions, expected result, and relevant recovery; place conceptual depth nearby or
  separately rather than interrupting every step.
- **Look something up:** reference prose makes names, fields, conditions, defaults,
  and exceptions easy to find; preserve the accepted technical contract.
- **Understand or decide:** explanation connects evidence, mechanism, alternatives,
  and limits; use the explanation reference when that reasoning needs work.

For a status update, lead with the decision or change that affects the recipient,
then evidence, blockers, and a next action when supported. For an FAQ, answer the
actual question before supporting detail; do not invent audience concerns to fill a
template. These are presentation choices, not authority to set priorities or facts.

## Typed-Document Boundaries

Apply before mode selection when the request names a document type — test cases,
API/interface documentation, a product or project manual, or a Word/Excel
deliverable. Classify by the requested output format, content type, and
authoritative source: a file extension, directory, or container name alone never
decides the semantic owner, and not every document is this Skill's to rewrite.

| Document type | This Skill owns | Semantic owner keeps |
| --- | --- | --- |
| Test-case documents | prose wording and readability without changing case order or grouping | test semantics, coverage structure, risk, and execution (testing workflow such as `dev-tests`) |
| API/interface documentation | reader-facing prose around a frozen contract | wire contract, schema, and OpenAPI authoring or validation (contract workflow such as `api-spec`) |
| Product/project manuals | presentation, structure, and plain-language wording | product and project facts or decisions (the accepted authority source) |
| Word/Excel deliverables | content drafting and revision | file format, directory placement, and render acceptance (the applicable Office-document workspace specification) |

- Compose the smallest compatible set: a wording-only request never expands into
  test design, contract authoring, or new fact decisions, and a handoff carries
  only the bounded context the other owner needs now.
- Manual prose carries facts at the authority source's strength: keep claim
  status, attribution, and uncertainty per `fact-integrity.md`, and never
  upgrade a plan into shipped behavior or a vendor claim into verified behavior.
- For a Word/Excel deliverable, apply a user-supplied template first. Check the
  active workspace instructions and project README for the applicable Office-document
  specification; read its `AGENTS.md`/`README.md` before producing or reformatting the file. Placement,
  typography, and per-page or per-sheet render acceptance follow that
  specification. Without one, keep the agreed format minimal and report
  anything not rendered or checked as `Not verified`.

## Short-Form

Use for a social post, caption, announcement, concise opinion, or product note.

### Shape

Choose a supported focal point and select the relevant source details. A short
record may stop after its observation; it need not acquire a scene, personal turn,
or lesson to fit a shape. Use a link or tag only when useful or requested.

### Editing rules

- Start with the point, not a title-like preamble.
- Do not squeeze a full article into bullets.
- Avoid stacked slogans, hashtag piles, and three consecutive punchlines.
- Retain a supplied decision, hesitation, contrast, or observation when useful; do not manufacture a human turn or an extra action to connect details. For personal accounts, draft each candidate by selecting and recombining attested events, not by filling out a typical story. Check its action verbs against the source before returning it: a correction, retry, departure, return, creation, or reaction needs its own support. An incomplete event may stay incomplete; do not supply its expected next step. Delete an unsupported action clause rather than softening it into a vague attempt. A change of angle selects different evidence, not a different history. When adapting a factual first-person episode, keep its supplied event verbs and circumstances unless the requested edit needs a demonstrably equivalent rephrasing. Prefer selecting or omitting those clauses and changing focus, grouping, or order around them. Do not substitute a more specific posture, movement, destination, or follow-up action for a general source description. This preserves the author’s account while leaving room to vary presentation. Treat the account as a closed set of events: use an extract-first draft of its factual clauses, then revise their organization and nonfactual phrasing. Packing parts into a bag does not establish taking them home; leaving a place does not establish the destination. Keep the supported packing or leaving clause, or omit it. Do not add even an ordinary closing action to finish a candidate.
- Remove any sentence that only repeats the claim. Making an abstract or ceremonial line conversational does not authorize replacing it with a new concrete proposal, decision, or experience; express its supported intent in ordinary language, or preserve it when no faithful improvement is clear.
- When materially different candidates are requested, allocate a different supported primary fact or reader use to each before drafting. Reserve each optional focal detail for its candidate unless the brief requires repetition; necessary shared context and limits may repeat. Write around that focus instead of recapping the whole source in every candidate. When facts are sparse, a legitimate function can be very small: a pointer to a supplied resource need not retell the anecdote. Keep sparse alternatives sparse rather than padding them with an invented event or reaction.
- Compare the finished candidates' information jobs, not their opening words. Two candidates centered on the same optional quotation or observation are still duplicates if they merely change order, synonyms, or secondary details. Revise the focus or useful form, not the facts. Do not force a hook, three points, or an uplift. If the source cannot support the requested distinction, state the smallest gap instead of manufacturing one. Keep this planning and comparison internal.
- If the post recommends the author's own product or an interested party's product, state that relationship directly.
- Compression must preserve the exact technical subject, operation, metric, baseline, qualifier, and source attribution. Omit a secondary claim rather than merge different scopes into one inaccurate sentence.
- When the only evidence is a vendor, employer, sponsor, or product owner's report, keep `官方称`, `厂商测试`, or equivalent attribution in the post itself rather than hiding it behind a link.

## Factual Soft Copy

Use when the text should persuade without becoming deceptive marketing.

### Shape

1. a real situation the reader recognizes
2. the cost or friction in that situation
3. the product, service, or idea as a response
4. a plain relationship disclosure when the author has a material interest
5. the concrete mechanism or evidence
6. the fit and limitation
7. an honest next step, only if requested

### Rules

- Lead with lived or observed friction, not a manufactured hook.
- Show how the thing works instead of calling it powerful.
- State who it is for and who may not need it.
- Use proof that exists: code, workflow, screenshots, documented behavior, verified results, or independently reproduced evidence.
- Distinguish `I tested this`, `the documentation says this`, `the vendor reports this`, and `an independent test found this`.
- Use official sources for specifications, release facts, documentation, and the vendor's stated methodology. Do not treat a first-party benchmark as independent proof of superiority.
- Make the source, source interest, date, version, or scope visible when the proof can change or the source benefits from the claim.
- For performance, price, reliability, or comparison claims, name the measured operation, baseline, sample, environment, source, and whether the result was independently reproduced.
- Disclose self-promotion, employment, sponsorship, affiliate benefit, free access, or supplied review units near the first product evaluation or recommendation.
- Give the reader useful knowledge beyond the product pitch.
- Keep the product name out of every paragraph.
- Never invent testimonials, urgency, or performance numbers.
- A call to action should be specific and low-pressure.

## Personal Technical Essay

Use for project decisions, architecture thinking, product boundaries, and learning notes.

Load `reasoning-and-explanation.md` when the essay's value depends on repairing a reader model, deriving a decision from constraints, or explaining why the author's judgment changed.

### Shape

- the problem as experienced
- the first assumption
- what changed the author's view
- the chosen boundary or implementation
- the cost of that choice
- what remains unresolved

The article can move chronologically or by decision. It should not read like a status report.

Use Git history, chats, logs, and research to verify the sequence and recover real turning points, not as automatic section subjects. Convert background evidence into the author's experience only when author-supplied material supports the participation, perception, decision, cost, or changed judgment. Otherwise keep it neutral, attributed, inferred, or omitted. Name commits, records, or the analysis method only when the reader needs that provenance or the user explicitly asks for it.

When the essay includes future work, apply the claim-status rules in `fact-integrity.md`. Tie plans to the author's current judgment, priority, or validation rule instead of listing features for completeness.

## Tutorial

Use when the reader should reproduce a result.

Load `reasoning-and-explanation.md` when the tutorial progressively introduces a model, uses a proxy or simulation, or diagnoses a failure through controlled reduction.

### Shape

1. outcome and scope
2. prerequisites and tested environment
3. minimal working steps
4. explanation close to the step it supports
5. verification commands and expected evidence
6. common failure modes
7. limitations or version boundaries

### Rules

- Keep code and prose synchronized.
- Do not hide prerequisites.
- Do not claim a command was verified unless it was.
- Label behavior that comes only from documentation, a vendor report, or another source.
- Name the exact component and operation being configured, built, measured, or verified; do not replace them with broader labels for readability.
- For volatile products or interfaces, include the tested date, version, region, plan, or environment that matters.
- Prefer a complete small path over an exhaustive catalog.
- Put warnings before the risky step, not after it.
- Test combination states, not only the happy path. When several configuration conditions can match at once, document precedence, override behavior, and silent-failure consequences.

## Engineering Retrospective

Use when the value lies in the decision process.

Load `reasoning-and-explanation.md` when failed attempts, changed constraints, or counterexamples must support the final decision rather than merely appear in chronology.

### Shape

- original goal
- actual constraint
- attempts and evidence
- decision
- tradeoff
- follow-up consequence

Avoid the project-report sequence `background / achievements / lessons / outlook` unless that is the requested format.

Evidence can establish what happened without becoming the narrator. Prefer `我后来不想继续维护两套数据库` over `Git 记录显示项目转向 SQLite`, unless the retrospective is specifically about repository history or the source itself must be attributed.

For iterative revisions, place a new insight at the decision point it explains. Rework nearby transitions and the conclusion when needed; do not add a detached `补充` section merely because the insight arrived in a later user turn.

## Architecture Note

Use when explaining a system boundary.

Load `reasoning-and-explanation.md` when the artifact must explain a boundary, lifecycle, representation change, incompatible invariant, composition seam, or other architectural relationship that changes the reader's model. Skip it for bounded factual updates, inventories, and local source-preserving edits. Make only the boundary dimensions that affect the conclusion explicit.

### Shape

- the specific problem
- current context and constraints
- chosen boundary
- data/control flow
- rejected alternatives
- failure modes
- verification and maintenance implications

A diagram or table is useful only when it carries information that prose would obscure.

## Resource List

Use when the artifact is primarily a curated list.

- State the organizing principle and intended reader.
- Prefer a smaller annotated path over a long unranked inventory.
- Mark official, maintained, archived, outdated, interested, independent, or unverified status when it affects interpretation.
- Add a recommended order or decision rule.
- Do not pad every item with the same generic description.
- Do not call a list `完整` without a bounded corpus and completion criterion.
- Separate issues visible inside the artifact (duplicates, mismatched titles and URLs, redundant classifications) from volatile facts that require live checks (reachability, redirects, maintainers, and archive status).
- Describe maintenance provenance with enough precision for the corpus: project, organization, working group, vendor, independent community, archived source, or not verified. A binary `官方 / 非官方` label is often too coarse.
- Present a learning order as a default route with a reason, not as a universal sequence unless the source establishes one.
