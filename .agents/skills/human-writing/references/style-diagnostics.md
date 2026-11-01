# Style Diagnostics

Load this reference only when voice, rhythm, or template residue materially affects the task. It is an editorial diagnostic, never a source of facts or invented experience.

## Contents

- [Voice Calibration](#voice-calibration)
- [Cluster Diagnosis](#cluster-diagnosis)
- [Semantic Compression](#semantic-compression)
- [Semantic Units](#semantic-units)
- [Edit Permission And Intensity](#edit-permission-and-intensity)
- [Pattern Families](#pattern-families)
- [Natural Rewrite Passes](#natural-rewrite-passes)
- [Protected And Secondhand Text](#protected-and-secondhand-text)
- [Research-Process Leakage](#research-process-leakage)
- [Iterative-Edit Seams](#iterative-edit-seams)
- [English-First Chinese Final](#english-first-chinese-final)
- [Chinese Technical Prose](#chinese-technical-prose)
- [Human Signals Worth Preserving](#human-signals-worth-preserving)
- [Stop Rule](#stop-rule)

## Voice Calibration

Prefer, in order:

1. a writing sample the user supplies for this task
2. the stance, confidence, person, and involvement visible in the source
3. a neutral, precise technical voice

Record a small voice fingerprint: sentence density, paragraph length, use of first person, confidence markers, preferred transitions, treatment of uncertainty, and typical endings. Preserve recurring habits only when they help recognition or meaning. Do not imitate accidental errors or manufacture quirks.

A style sample contributes cadence, register, and rhetorical choices, not its biography, opinions, evidence, or distinctive incidents. Use the task’s own sources for content.

Neutral source material stays neutral. Never add `我亲自`, `终于`, `踩坑`, emotions, incidents, or experiential authority without evidence.

## Cluster Diagnosis

Treat a passage as templated only when several signals reinforce one another:

- empty framing delays the real point
- abstract significance replaces a concrete mechanism
- vague authority hides who observed or measured something
- sections repeat a mechanically symmetric pattern
- every paragraph ends in a recap or uplift
- contrast, rhetorical questions, dashes, or short sentences appear on a schedule
- promotional gloss removes costs, limits, attribution, or uncertainty
- chatbot residue explains the editing process instead of delivering the artifact

One heading, list, transition, dash, short sentence, or familiar phrase is not evidence by itself. Technical conventions, accessibility requirements, and platform formatting can create legitimate repetition.

Parallel sentences, stable technical nouns, tables, and lists may be the clearest way to define separate responsibilities, states, or comparison axes. An abstract opening may also be a precise map of the sections that immediately follow. Diagnose a defect only when the structure loses information, obscures priority, or repeats the same reasoning without a new role.

Repeated questions can mark the reader's next inference; repeated code can expose one controlled change; a long detour can eliminate a plausible wrong model; a heading-free passage can preserve a continuous derivation. Treat these as defects only when they fail to perform that job. Every editorial rule should name the reader failure it prevents rather than target a surface pattern.

Do not turn frequent model habits into universal bans. Passive voice can keep the object of interest in focus; a dash can preserve a real cadence; an adverb, rhetorical question, list of three, or repeated technical noun can be the clearest choice. Rewrite only when the form contributes to a diagnosed cluster or weakens meaning, trust, rhythm, or reader comprehension.

A request to remove an AI-like template does not by itself ask to neutralize the
author's advocacy, criticism, enthusiasm, or genuine rhetorical contrast. Distinguish
naturalness from de-hyping. If restrained wording is requested, reduce empty
amplification while retaining the direction and supported strength of the claim;
if equivalence is uncertain, keep the original expression. Never turn an unsupported
“research shows” claim into an unattributed fact by deleting only the attribution.

## Semantic Compression

Some prose packs an observation, explanation, and judgment into one coined label, slogan, or metaphor. The defect is not figurative language itself. It is forcing the reader to decode which part is supported, which part is the author's interpretation, and which part is a recommendation.

When that compression obscures the claim, unpack only the layers already present in the source:

1. state the observable fact or event
2. state the supported mechanism, cause, or relationship
3. state the author's judgment, implication, or next action

Keep an earned metaphor when it carries the author's voice and the surrounding text makes its referent clear. Never invent a mechanism to explain a clever phrase, and never turn an interpretation into a measured fact. If the source does not support a layer, preserve the ambiguity, qualify it, or ask for the missing fact.

## Semantic Units

When restructuring prose, count claims by meaning rather than by sentence, clause, or fact atom. A semantic unit has one main assertion and the dependent material needed to interpret its truth, scope, or use. Keep together:

- a rule with its exception or stopping condition
- a capability with its limitation and the caller's remaining responsibility
- a primary or default choice with the permitted or required role of alternatives
- a recommendation with the reason or evidence ceiling that qualifies it
- a contrast whose second half prevents the first from being overstated
- a decision with the consequence that explains what to do next

Split only when each resulting item can stand alone without changing the source's logic or forcing the reader to reconstruct a relationship across neighboring bullets. Dependency is semantic, not merely topical or chronological: two independently triggered actions at different lifecycle stages remain separate. A caller responsibility that follows from a capability limit, or the action mandated when a stopping condition is met, stays with that limit or condition. As a quick check, imagine removing the neighboring sentence: if the main assertion becomes misleading, broader, or operationally incomplete, keep the bundle together; if it remains a complete instruction or finding, split it.

Honor explicit granularity such as a fixed item count or a request for separate checks. But interpret `one item per claim` as one coherent semantic claim, not one bullet per sentence or clause: sentence boundaries alone do not make a limitation, resulting responsibility, or alternative role independent. Preserve truly parallel procedures, responsibilities, states, and checklist items as separate units. You may normalize line breaks or punctuation when that improves an existing list, but do not merge its independently actionable items merely to make it look less templated.

## Edit Permission And Intensity

Keep three decisions independent:

- **diagnosis:** how serious and widespread the reader problem is
- **intensity:** how much a permitted passage needs to change
- **scope:** which sentences, sections, fields, or structural assets the user authorized changing

A severe diagnosis does not authorize a full rewrite. A request to fix sentences does not authorize moving sections, and a request to preserve structure does not authorize converting prose to a list. A request to shorten does authorize proportionate selection, but not mutation of the author's position or removal of a fact the user required preserving. Apply the strongest useful edit inside the smallest authorized boundary. If a defect cannot be fixed there, leave the unresolved material intact; surface a blocker only when the request cannot be completed safely or its hard constraints conflict.

## Pattern Families

Use this compact inventory to find clusters, not to count forbidden tokens. A surface form becomes an editing problem only when it performs one of the reader failures in the last column.

| Family | Contextual signals | Reader failure to confirm |
| --- | --- | --- |
| Inflated importance or promotion | ordinary facts framed as historic shifts, broad trends, proof of excellence, or generic excitement | replaces the supported mechanism, result, limit, or reason the reader cares |
| Vague authority or synthetic depth | unnamed experts, unsupported consensus, ornamental `-ing` clauses, or a generic challenge-and-future section | hides provenance or simulates analysis without adding evidence |
| Mechanical variation | avoiding simple `is / has`, cycling synonyms for one stable concept, false `from X to Y` ranges, or forced groups of three | makes the subject harder to track or creates coverage the source does not support |
| Scripted rhetoric | scheduled contrasts, `not just X but Y`, tutorial announcements, fake-candid openers, or a rhetorical question before an ordinary answer | delays the point or manufactures intimacy, surprise, or authority |
| Manufactured surface polish | repeated bold labels, emoji decoration, title-case headings, identical paragraph shapes, or punctuation used on a schedule | turns formatting and rhythm into a visible template instead of serving the content |
| Chatbot and uncertainty residue | praise, offers to continue, training-cutoff disclaimers, stacked hedges, or speculative filler around missing facts | addresses the prompt instead of the reader or disguises an evidence gap |
| Generic uplift | vague optimism, universal lessons, or a conclusion that merely says the work matters | replaces the earned judgment, limitation, next action, or unresolved question |

Give four failure shapes an explicit pass:

- **Diff-anchored narration:** an evergreen document says what was added, replaced, or improved instead of describing the current behavior. Keep change narration in release notes, migration guides, correction notes, and other version-scoped artifacts; elsewhere rewrite around the present contract.
- **Manufactured punchlines:** several clipped declarations or fragments try to make every sentence land. Keep one short sentence when it earns emphasis; join or vary a run that creates drama without information.
- **Aphorism formulas:** a concrete claim is recast as a portable slogan or grand metaphor. Restore the mechanism, condition, or consequence the phrase is standing in for.
- **Fake-candid openers:** `说实话`, `你知道吗`, `真正的问题是`, `Here's the thing`, or a one-word question creates a theatrical pause before a routine claim. Keep genuine conversational wording when it belongs to the author; remove the stage direction when it only manufactures intimacy.

## Natural Rewrite Passes

For a requested natural rewrite or close style adaptation, work privately in three
passes: (1) lock supported claims, uncertainty, protected text and the source voice;
(2) repair only diagnosed template clusters with concrete actors and actions; (3)
read cold for repeated rhythms, filler transitions and invented stance, then check
every changed claim against the source. Keep genuine irregularity but do not invent
experience, quirks or uncertainty to simulate a person. Return only the requested
artifact unless the user asks for editing notes; promise no detector outcome. A
static result such as “three of four tests passed” is not evidence of progress or
improvement without an earlier comparison basis; omit that stock conclusion.

## Protected And Secondhand Text

Do not diagnose watched language inside quotations, titles, proper names, code, fixtures, or examples as though the author wrote it directly. First classify whether the text is evidence, an object under discussion, or editable prose. Preserve it verbatim when its wording is the evidence or the task protects it. If a surrounding sentence is templated, edit the frame rather than silently changing the quoted material.

Professional polish, formal vocabulary, mixed registers, curly quotes, an isolated transition, a single dash, and one short emphatic sentence are not reliable signals by themselves. Prefer a false-negative style decision over flattening a recognizable human voice when no reader harm is visible.

## Research-Process Leakage

Treat every item below as a contextual review signal, not an automatic defect. Act only when it replaces the requested subject with source-process narration, exposes background-only material, duplicates an existing claim, changes the argument, or creates a visible editing seam.

Background research leaks into the artifact when the text explains how the editor reached a conclusion instead of expressing the author's experience or argument. Common signals include:

- headings centered on `Git 记录`, `聊天记录`, `检索结果`, or `分析过程` when those sources are not the requested topic
- sentences such as `如果只看 README`, `记录没有美化过程`, `从沟通记录可以看出`, or `下面的判断来自...`
- commit counts, file totals, hashes, or source-ledger categories used as narrative decoration rather than necessary evidence
- repeated reminders that the draft is factual, source-grounded, or based on research
- editor commentary that tells the reader what the article is trying not to do

Do not ban source names mechanically. A Git postmortem, release history, investigative report, correction note, or cited external claim may need visible provenance. Otherwise keep the research in the reasoning layer and write the resulting scene, choice, cost, uncertainty, or changed judgment in the author's frame.

## Iterative-Edit Seams

Follow-up edits can leave visible seams even when every paragraph is individually sound. Treat a late section as a seam only when its information logically belongs earlier, repeats a claim, changes a role or commitment without updating related passages, or leaves the conclusion inconsistent. Reintegrate the point at the decision or transition it explains, then reread the surrounding section and ending.

Do not remove every additive transition mechanically. Keep it when the chronology or argument genuinely adds a second point. The defect is structural afterthought, not the word itself.

## English-First Chinese Final

Use this path for a requested Chinese final only when a private English claim-and-structure pass makes new composition clearer. Skip it for an existing Chinese draft or a stronger Chinese author sample unless the user requests the intermediate.

- Keep the source ledger language-neutral; English wording does not create claim authority.
- Translate the argument and relationships, not sentence shapes. Rebuild natural Chinese paragraphs around the same subject, action, condition, evidence, and consequence.
- Preserve exact commands, identifiers, quotations, numbers, attribution, modality, status, and scope.
- Check the Chinese final against the original sources, not only against the English intermediate.
- Remove translation artifacts such as repeated subjects, imported abstractions, unnatural connective density, and literal English cadence only when meaning remains unchanged.
- Return the Chinese final alone unless the user explicitly requests both versions.

## Chinese Technical Prose

- Put the subject and action close together; prefer concrete verbs over abstract management nouns.
- Keep exact technical nouns, identifiers, commands, versions, and metric subjects.
- Vary sentence and paragraph length according to information density, not for cosmetic rhythm.
- Give each paragraph one job: scene, claim, evidence, mechanism, tradeoff, or transition.
- Use lists for parallel items, procedures, or checks; do not turn an argument into a list merely to look scannable.
- Write headings that name the question, decision, or mechanism. Avoid interchangeable headings such as `背景`, `优势`, `思考`, and `展望` unless they are genuinely precise.
- Open with the actual problem, observation, or decision. Do not build suspense around ordinary information.
- End on the current judgment, limitation, next action, or unresolved question. Do not force a universal lesson or emotional peak.

## Human Signals Worth Preserving

Keep genuine uncertainty, disagreement, asymmetric emphasis, rejected alternatives, costs, constraints, and precise small details when they explain the author's decision. Natural writing is not deliberately flawed writing.

## Stop Rule

After factual, structural, and voice blockers are resolved, compare the candidate against the unchanged source. Stop when the edit has no concrete reader benefit, only normalizes preference-level wording, weakens a precise term, changes a qualifier, or invents narrative motion. A clean but source-shaped sentence is better than a more polished house style; `original` is a valid finished decision.
