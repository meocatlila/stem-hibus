# Fact Integrity

Good prose cannot repair unsupported content. Build a source ledger before drafting or rewriting.

## Contents

- [Source Ledger](#source-ledger)
- [Source-Based Editing Check](#source-based-editing-check)
- [Editing Directives And Claim Authority](#editing-directives-and-claim-authority)
- [Claim Trace](#claim-trace)
- [Research-To-Draft Loop](#research-to-draft-loop)
- [Rewrite Rules](#rewrite-rules)
- [Drafting From Sparse Notes](#drafting-from-sparse-notes)
- [Soft-Copy Integrity](#soft-copy-integrity)
- [Material Relationships](#material-relationships)
- [Platform-Required Process Disclosures](#platform-required-process-disclosures)
- [Current External Claims](#current-external-claims)

## Source Ledger

Classify content, visibility, and transformation on separate axes. One label must not stand in for another.

### Content class

### Supplied facts

Directly stated or evidenced by the user, repository, logs, code, documents, or verified sources.

Examples:

- a command that was run
- a branch or commit
- a project architecture
- a measured result
- an observed failure
- a date in the source

### Author judgments

Opinions, preferences, interpretations, and decisions clearly attributable to the author.

Examples:

- `我更倾向 SQLite-first`
- `这个边界对个人项目更合适`
- `我不想把它做成通用后台模板`

### Unknown or unverified claims

Plausible statements that are not supported in the current context.

Examples:

- user numbers
- performance improvements
- market rankings
- platform algorithm behavior
- exact causes of an incident
- current product or policy status

### Visibility

- **Artifact-visible:** may appear without special attribution when other integrity rules allow it.
- **Artifact-visible with attribution:** may appear only with the required source, relationship, status, or disclosure.
- **Background-only:** may verify, detect contradictions, check chronology, or guide structure, but may not be the sole published provenance of a factual claim. Its source identity and restricted details remain out of the artifact unless separately authorized.
- **Do not disclose:** neither the content nor uniquely inferable details may appear. It may cause omission, conflict handling, or escalation, but must not shape wording that reveals the protected information.

Git history, logs, chats, searches, repository scans, and the source ledger are background-only by default unless the requested subject is the method or source, or attribution is required. Secrets and explicitly private material are do-not-disclose.

### Transformation policy

- **Verbatim:** preserve exact text.
- **Meaning-preserving edit:** wording may change but semantics, attribution, scope, and confidence may not.
- **Summarize-only:** use the supported meaning without copying protected or unnecessarily identifying wording.
- **Do not use:** exclude from both artifact generation and internal evidentiary use.

Apply `verbatim` by default to:

- code
- commands
- config
- paths
- identifiers
- API names
- version numbers
- URLs
- quotations
- machine-facing frontmatter, explicit IDs, link targets, and data fields
- legal or security warnings

Preserve heading text and hierarchy when the task protects structure or their wording serves anchors or references. Change them only within the requested scope and check affected references.

Visibility controls whether material may appear. Transformation policy controls how permitted material may change and never expands visibility. A verbatim command can still be background-only or do-not-disclose; required attribution does not grant permission to expose a private quotation.

Apply both axes to the smallest practical semantic unit: claim, quotation, command, identifier, field, or contiguous span. A document or message may define defaults, but narrower classifications override them. Split a derived sentence when independently governed claims can be separated; otherwise apply the strictest applicable policy.

## Source-Based Editing Check

Build from supported source clauses rather than first inventing a fluent scene and
checking only its headline facts. Keep already suitable wording when changing it
has no concrete benefit for this reader and operation.

During drafting, pair each retained source assertion with its draft clause.
Before returning each artifact, including every alternative, audit the actual final
clauses against those source spans and compare in both directions. When moving or
combining clauses, keep each time or condition attached to the same action:

- **Draft to source:** match each factual or first-person clause to support for its
  actor, action/state, time, relationship, modality, and condition direction. Include implied claims in
  transitions, descriptions, and instructions. A plausible antecedent or next event
  is still a new claim; sending an artifact does not establish who created it. Lexical overlap or ordinary expectations are not sufficient support for a factual paraphrase: seeing A first does not establish later seeing B; a prohibition for one actor does not grant another actor permission; applying an object does not imply creating it. An omission does not establish its cause or the author's memory state. Preserve the source's conditional direction: `if P, Q` and `Q only if P` are not interchangeable. When their equivalence is unclear, retain the original connective rather than choosing a stronger or weaker gate.
- **Source to draft:** retain the claims, exclusions, conditions, protected text,
  and scope the task requires. A chosen detail in one candidate does not authorize
  adding a missing detail to another.

When equivalence is doubtful, revert the whole affected clause to the source wording; do not replace one unsupported detail with another. Omit an
optional claim. Do not resolve uncertainty by choosing a more specific technical
interpretation, time anchor, permission, requirement, or event. Preserve an author's
intent as intent: `不想` is not a promise of `不会`, even with `暂时`. An undated
past event does not become `今天` to make a post immediate. Do not add an event merely
to connect two supplied observations. This check is internal; return only the
artifact when that is what the user requested. Authorized analytical inferences remain clearly distinguished from supplied facts under Derived Claims.

## Editing Directives And Claim Authority

Editing-directive precedence controls what operation to perform:

1. current explicit task instruction
2. earlier non-conflicting task instruction

A request to strengthen, simplify, dramatize, shorten, or adapt wording does not change a claim's fact, status, intent, confidence, or authority unless the user explicitly supplies that change.

Claim-authority precedence controls what the artifact may assert:

1. current explicit factual, intent, status, or authority correction
2. the latest applicable user-named authoritative source
3. current and earlier applicable user-supplied sources unless explicitly superseded
4. a complete prior draft explicitly approved by the user or resubmitted by the user as the current source
5. permitted background evidence for verification, conflict detection, and inference within its visibility limits
6. writer profiles, style guides, public samples, and examples for style calibration only

Assistant-generated wording has no independent claim authority. It may be reused as phrasing only when consistent with higher-authority material. A localized correction or edit accepts only the supplied or explicitly modified claims and their directly dependent transitions; it does not accept untouched assistant claims. Silence never constitutes acceptance. A later higher-authority source may invalidate an accepted draft.

Do not silently blend contradictory versions of a framework, database, command, version, metric, result, product status, or author position. In Diagnose mode, report the conflict. In finished-artifact modes, use the winning source; return `Not enough context` only when no source wins and the unresolved conflict makes the requested artifact factually unsafe.

## Claim Status And Actor Role

Classify material claims as observed past, current state, committed plan, intended but not started, candidate direction, capability, prediction, or unresolved question. Preserve the actor and modality rather than mapping isolated keywords mechanically. `可以` may describe capability or a candidate; `准备`, `已经决定`, `正在`, and `已完成` do not mean the same state. Never promote a claim upward without explicit evidence.

When delegation matters, preserve who proposes, executes, checks, recommends, approves, accepts, or publishes. AI drafting, implementation, checking, or preliminary validation does not imply final approval, acceptance, publication, or accountability. Preserve the supplied authority model and do not invent an approver when none is established.

Modal and scope-bearing terms are evidence-bearing. Preserve distinctions such as `我认为`, `可能`, `可以`, `应尽量`, `目标是`, `正在`, and `已经`, plus frequency, priority, exclusivity, extent, and lower-bound qualifiers such as `mainly`, `usually`, `often`, `first`, `only`, and `at least`. A smoother sentence that drops one of these terms may silently promote a principle into a guarantee, a capability into observed behavior, a primary use into an exclusive use, or a candidate into a commitment. During the fidelity pass, compare these short qualifiers explicitly for every retained or transformed claim; do not assume that retaining the surrounding noun and verb preserves scope. If an authorized summary omits the entire claim, verify that omission under the compression contract rather than restoring its qualifier alone.

## Whole-Artifact And Internal-Consistency Audit

Audit the complete publishable surface before rewriting:

- title, description, and other frontmatter versus the body
- architecture labels versus code signatures and dependencies
- workflow summaries versus every distinct stage, gate, actor, and closing step
- duplicated URLs, titles, entries, headings, and numbering
- current-state language versus plans, principles, risks, and historical descriptions
- conditions that may match simultaneously, including precedence and silent-failure behavior

Resolve what the artifact itself proves before routing volatile facts to external verification. `Not verified` is appropriate for current reachability, maintenance status, runtime behavior, or external product state; it is not a substitute for reporting an internally visible contradiction, duplicate, title-target mismatch, or unsupported `完整`, `自动`, `安全`, or `高效` claim.

## Derived Claims

Every output claim needs permitted provenance. A claim that depends on multiple indispensable sources inherits the strictest visibility and attribution requirement among them. Paraphrasing, generalizing, inferring, or combining sources does not reset restrictions.

When the same claim is independently supported by a less restrictive source, the artifact may rely on that source while excluding details learned only from stricter material. An inference inherits the restrictions of the evidence required to make it.

## Claim Trace

For every externally checkable claim that materially supports the article, record enough provenance to audit it:

- **Claim:** the exact statement being made.
- **Origin:** supplied by the user, directly observed, measured, official documentation, primary source, or secondary source.
- **Status:** verified, documented but not personally tested, source-reported, inferred, or unverified.
- **Semantics:** exact subject or component, action or state, implementation language, measured operation, metric, and baseline.
- **Scope:** environment, version, date, sample, or conditions under which the claim holds.
- **Author relationship:** whether the author, employer, sponsor, affiliate, or product owner benefits from the claim.
- **Source interest:** whether the cited source owns, sells, funds, employs, promotes, or otherwise benefits from the subject or conclusion.
- **Independence:** first-party statement, independently reproduced result, independent analysis, or not established.
- **Creation process:** any AI assistance or other platform-regulated creation process that must be disclosed, including the actual tool, extent, verification, correction, and placement requirement.

Prefer evidence according to the claim type:

1. repository state, logs, measurements, or direct observation for what actually happened in the author's work
2. official documentation or another primary source for release facts, specifications, documented behavior, and the source's own methodology
3. independent reproduction or analysis for comparative superiority, performance, reliability, market impact, and user outcomes
4. a reliable secondary source that names its evidence
5. community reports only as discovery leads or clearly attributed experience

A first-party source is often authoritative about what it released, documented, measured, or announced. It is not automatically independent proof that its product is faster, better, safer, more reliable, or more widely adopted.

Do not collapse these statuses. `The documentation says`, `the vendor reports`, `I tested`, `an independent test found`, and `I infer` are different claims.

## Research-To-Draft Loop

Use this loop only when the user requests research, citations, or current external support, or when a material claim cannot be completed safely from supplied evidence. Do not expand a bounded rewrite into open-ended research.

1. Freeze the research question, intended artifact, permitted source boundary, freshness needs, and stop condition.
2. Build the claim skeleton from supplied material first. Mark only missing evidence that could change the argument, scope, or reader decision as a research gap.
3. Research those gaps in priority order: primary or official evidence for specifications and first-party facts, then independent evidence for comparison, performance, impact, or contested interpretation. Record source interest, date, scope, and verification status as part of the existing claim trace.
4. Attach each accepted source to the exact claim and outline role it supports. Keep research notes and discarded leads out of publishable prose unless the method or visible provenance is part of the requested artifact.
5. Draft after material gaps are closed, explicitly qualified, or removed. Put citations close to the supported wording and keep quotation, number, baseline, actor, and modality within the source's actual scope.
6. Audit the finished artifact once: every material external claim has direct support; every citation supports the nearby wording; no secondary summary launders a first-party claim into independent proof; unused research does not broaden the conclusion. Stop when the defined question is answered and further collection would only add background or duplicate support.

## Rewrite Rules

- Apply source precedence before merging draft, conversation, notes, or examples.
- Preserve supplied facts from the winning source. Check newly added clauses as well as retained facts: fluent scene details, dates, sequence, spatial relationships, or measurement endpoints still need source support. Do not complete a plausible scene or turn a preference into a commitment.
- Keep author judgments attributed and proportionate.
- Use background evidence to locate sequence, turning points, and consequences. Convert it into first-person experience only when an author-supplied source or explicit instruction supports the author's participation, perception, decision, or judgment. Otherwise keep the statement neutral, attribute it, mark it as inference, or omit it.
- Preserve actor roles separately from claim status. Being responsible, participating, proposing, executing, checking, recommending, approving, accepting, and publishing are not interchangeable. A named responsible party does not establish who performs the work; co-participation does not establish who invited or assigned whom. Keep the event impersonal or name only the supplied relationship when its actor or arrangement is unspecified. Keep identity and location modifiers attached to the entities the source actually describes.
- Omit unknown claims, label them `Not verified`, or research them before use.
- Preserve protected text exactly unless the user explicitly requests a verified correction.
- Do not turn a plan into a completed result.
- Do not turn correlation into causation.
- Do not turn a single experience into a universal rule.
- Preserve choice, refusal, capability, permission, recommendation, and obligation. Choosing not to do something does not establish inability to do it; missing notes do not authorize an inference about the author's ability. Preserve that intent rather than supplying a reason. In particular, `may`, `might`, `could`, `can`, `should`, and `must` are not interchangeable. Keep uncertainty such as `usually` or `in my case`; brevity does not authorize stronger modality. An available option does not establish a requirement, default, or exclusive path: `can export manually` does not mean `must export manually` or `only manual export is supported`.
- Do not present documented capability as personally tested behavior.
- Keep source dates and scope when a claim can change over time.
- Preserve attribution when the source has a material interest. `The vendor reports`, `according to the company's benchmark`, and `independently verified` are not interchangeable.
- Do not use a first-party benchmark alone as independent proof of superiority. Keep its method, baseline, sample, and source relationship visible, and state when no independent reproduction was performed.
- Ensure attribution survives titles, summaries, short-form compression, and platform adaptation. Do not move a qualifier into the body while leaving a broader headline.
- Preserve platform-required AI-use or creation-process disclosures through rewriting, summarization, and platform adaptation. Do not reduce substantial assistance to `proofreading only` or invent a model, prompt, verification step, or correction history.
- Do not replace a precise technical component with a broader proxy. `Compiler and language service`, `runtime`, `build step`, and `product` are not interchangeable.
- Do not detach a number from what was measured, the comparison baseline, or the tested sample. `Build time improved on listed repositories` is not the same claim as `the language runs faster`.
- When shortening text, split or omit claims whose scopes differ rather than merging them into one smoother but inaccurate sentence.
- Preserve supplied technical semantics, commands, flags, order, prerequisites, and version scope. Do not silently repair disputed technical material from memory.
- Treat a runnable workflow as one verification unit: command family, tool identity, prerequisites, order, version scope, mutually matching conditions, failure behavior, and expected result. Verifying one line does not validate the chain.
- Preserve distinct workflow responsibilities. Do not collapse discovery, evidence verification, schema validation, build checks, commit, publication, or rollback into one generic gate when the source assigns them different meanings.
- Available deterministic syntax, link, command, or repository checks may be run when they are part of the editing task. Mark unrun checks `Not verified`.
- Apply this technical-publication decision table instead of treating every unverified item as a blocker:

| Evidence or risk state | Editorial action |
| --- | --- |
| Clear supplied technical text | Preserve exact semantics and scope |
| Deterministically checked | State only the check that actually ran and its scope |
| Unverified or vendor-reported | Preserve attribution and status; do not imply independent proof |
| Disputed | Preserve the conflict or the winning source under source precedence |
| Correctness is required to complete the artifact | Block the affected claim or route to technical review |
| Destructive or irreversible action | Do not present as routine publication-ready advice until reviewed |
| Actual secret, token, password, or private key | Redact and block transmission or publication |
| Obvious placeholder, environment-variable name, or dummy credential | Preserve when it is clearly non-secret |
| Correctness review is the primary task | Route to the relevant technical review workflow |

Ordinary unexecuted, non-destructive examples may remain when clearly labeled as unverified. A syntax-only check proves syntax only, not safety, runtime behavior, or compatibility.

For unresolved P0/P1 issues, use a safe partial or the blocked-artifact response
defined below in this reference: apply a winning source, preserve and label
uncertainty, exclude only the affected claim, or request the minimum authoritative
information. Never silently choose between equal-authority conflicts, invent a
disclosure, expose do-not-disclose material, or rewrite verbatim text to hide the
conflict.

## Drafting From Sparse Notes

Sparse notes do not authorize plausible details. A missing field in the notes does not establish that the fact is unknown, unavailable, absent, or not yet decided in the world. Omit an optional missing field; if it is essential, identify the information gap in the supplied material rather than inventing a status for it.

Allowed:

```text
我开始把重复出现的执行要求整理成 Skill。
```

Not allowed without evidence:

```text
经过三个月和数十次失败，我终于把重复要求沉淀成 Skill。
```

If the missing detail is essential, return:

```text
Not enough context:
- the actual problem or incident
- what was tried
- the observed result
```

## Soft-Copy Integrity

Do not fabricate:

- testimonials
- customer counts
- waiting lists
- awards
- scarcity
- before/after numbers
- competitor comparisons
- guarantees
- urgency
- personal origin stories

Persuasion should come from a real scene, concrete mechanism, verifiable proof, limitation, and clear fit.

For product claims, separate three evidence layers:

- **Product facts:** official specifications, release notes, documentation, and stated capabilities.
- **Author evidence:** what the author actually tested, observed, or measured.
- **Independent evidence:** third-party reproduction, comparison, or analysis with visible method and scope.

Do not let an interested first-party claim silently cross from the first layer into the second or third.

## Material Relationships

When the author has a material relationship to the subject, disclose it in plain language near the first evaluation, recommendation, or product introduction.

Material relationships include:

- building or owning the product
- employment by the organization being discussed
- sponsorship or payment
- affiliate or referral benefit
- free access, travel, equipment, or review units supplied for coverage
- access to non-public information provided by an interested party

The disclosure must survive platform adaptation. Do not hide it in metadata, a vague `合作`, or a distant footer when it changes how the reader should interpret the article.

## Platform-Required Process Disclosures

A creation-process disclosure is different from a material-interest disclosure. It explains how the artifact was produced when the target platform requires that information.

Before claiming an artifact is platform-ready:

1. verify the current official platform rule and its effective scope
2. record the actual tool or technology used
3. record whether assistance was local, repeated, or part of the main creation process
4. record what the author verified, corrected, or rewrote
5. place the disclosure where the current rule requires it

Do not infer a model name, prompt, usage extent, human-review step, or correction history. If a required detail is missing, return `Not enough context` rather than producing a false disclosure. A disclosure also does not transfer responsibility for originality, completeness, or accuracy away from the author.

## Current External Claims

When the text depends on current prices, versions, policies, platform rules, laws, schedules, product status, or interface behavior:

1. verify with current reliable sources
2. prefer official or primary sources for release facts and documented behavior
3. prefer independent evidence for comparative, evaluative, performance, reliability, market-impact, or user-outcome claims
4. use exact dates when time matters
5. distinguish direct observation, documented behavior, source-reported results, independent reproduction, and inference
6. keep the exact component, operation, metric, baseline, version, environment, and scope that the source supports
7. preserve source interest and attribution in the headline, summary, and body
8. verify current platform disclosure and labeling rules before claiming platform compliance
9. use a stable permalink and note paywalls or archived copies when appropriate
10. cite the claim in the target format when appropriate

If research was not performed, use `Not verified` or omit the claim.
