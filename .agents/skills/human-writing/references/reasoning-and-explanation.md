# Reasoning and Explanation

Load this reference for explanatory long-form, tutorials, architecture notes, technical essays, retrospectives, or diagnoses where the main reader value is a changed mental model. These are optional reasoning tools, not a house style. Use only the smallest set that solves the actual reader problem.

All claims, examples, and inferred relationships still inherit `fact-integrity.md`. A persuasive derivation cannot repair an unsupported premise.

## Contents

- [Start With the Reader's Model](#start-with-the-readers-model)
- [Build the Reasoning Chain](#build-the-reasoning-chain)
- [Read Back The Argument](#read-back-the-argument)
- [Separate Premise, Derivation, and Judgment](#separate-premise-derivation-and-judgment)
- [Use Examples as Instruments](#use-examples-as-instruments)
- [Explain Boundaries and Lifecycles](#explain-boundaries-and-lifecycles)
- [Compare Alternatives by a Criterion](#compare-alternatives-by-a-criterion)
- [Name and Compress Carefully](#name-and-compress-carefully)
- [Earn the Ending](#earn-the-ending)
- [Anti-Overfitting Rules](#anti-overfitting-rules)
- [Final Reasoning Check](#final-reasoning-check)

## Start With the Reader's Model

Before drafting, identify privately:

- the reader's plausible starting model
- the observation, failure, or constraint that model cannot explain
- the smallest replacement model supported by the source
- what the new model lets the reader predict, decide, or do

If the reader's model is sound but the metric or category is mismatched, state the mismatch explicitly, preserve the underlying intent, and answer the corrected question. Address any still-relevant part of the original question rather than silently replacing it. Do not optimize a proxy that does not represent the desired outcome.

Open with the real problem or contradiction when it is already interesting. Do not manufacture suspense around an ordinary fact.

## Build the Reasoning Chain

Choose an order that reflects dependencies, not a generic article template:

1. establish the observable problem or desired capability
2. state the relevant constraints or invariants
3. introduce the smallest model that explains the current evidence
4. expose its limit with a counterexample, failed attempt, or new constraint
5. add only the concept or mechanism needed to resolve that limit
6. state the resulting decision, prediction, or remaining uncertainty

Mark intermediate models as partial when later sections will revise them. A useful simplification must not masquerade as the complete system.

For long work, maintain both scales privately:

- **top down:** the reader can see the overall question and current position
- **bottom up:** at least one concrete section earns the central claim through evidence or derivation

Do not force every short or straightforward artifact through this sequence.

## Read Back The Argument

For a long draft with weak ordering, repeated conclusions, or transitions that no
longer fit, sketch a private reverse outline: what each paragraph says and what job
it does in the argument. Read the title, headings, and paragraph openings together
to see whether they match the finished body. Then check adjacent paragraph endings
and openings for the actual relation: evidence, cause, contrast, qualification,
sequence, or a deliberate break.

Repair missing context or order only within the authorized scope. A connective
cannot create causal evidence or resolve a contradiction. Keep an intentional
discontinuity when it serves the voice or argument, and skip this pass for a clean
short passage or a proofreading-only request. Do not expose the outline unless asked.

## Separate Premise, Derivation, and Judgment

Audit three layers independently:

- **Premise:** Is the starting fact, constraint, or observation supported and correctly scoped?
- **Derivation:** Does the conclusion follow from that premise without a missing step?
- **Judgment:** Is the chosen tradeoff, recommendation, or degree of confidence warranted?

A valid derivation from a hypothetical premise is still hypothetical. A verified premise does not make every later inference verified. If a premise is removed or narrowed, revise every dependent claim.

For strong criticism or broad conclusions, increase the evidentiary burden. A forceful sentence is not a substitute for representative cases, mechanism, or scope.

## Use Examples as Instruments

Prefer one conceptual anchor that survives across stages. Change one variable at a time so the reader can see what caused the result. Introduce a new example only when the old one cannot carry the next distinction.

For debugging explanations, incident retrospectives, or other analyses that narrow a reproducible failure:

- preserve one observable witness of the problem
- remove unrelated state while keeping that witness reproducible
- compare the smallest changed case with the previous case
- state the invariant revealed by the comparison

For other retrospectives, preserve the evidence chain appropriate to the decision or changed judgment; do not require a reproducible witness or failing/passing pair.

When direct observation is impossible, explain why the proxy represents the target behavior and where it can diverge. Do not present an animated reconstruction, synthetic trace, or derived metric as the original event.

Repeated code or parallel examples are valid when they demonstrate controlled change. Remove them only when the repetition carries no new inference.

## Explain Boundaries and Lifecycles

When a conclusion depends on a system boundary, make the boundary explicit:

- where state and authority live
- what crosses the boundary and in which representation
- what is copied, referenced, serialized, reconstructed, cached, or derived
- which properties cannot cross unchanged, such as executable identity or local lifecycle
- which component owns updates and which components only project or observe them

Track a value or concept through relevant phases rather than describing each layer independently. Distinguish source of truth, derived view, alias, stable logical identity, current location, and human-facing name when they can change separately.

In architecture comparisons, locate the seam where two locally valid models meet. Preserve the incompatible invariants each side protects, then evaluate the composition boundary. Do not turn this into mandatory `pros / cons` symmetry.

## Compare Alternatives by a Criterion

State the capability or constraint the decision must protect before comparing mechanisms. Test the strongest supported alternative against the same criterion.

One decisive counterexample is enough when it breaks the old model. Compare several alternatives only when they fail differently or their composition is the subject. Separate outcome quality from implementation ergonomics; an easier API does not prove a better outcome.

Use an analogy only after mapping:

- what corresponds directly
- what insight the mapping unlocks
- where the analogy stops working

Do not inherit authority from a familiar domain or imply equivalence beyond the mapped relationship.

## Name and Compress Carefully

Name a concept only after the reader has seen the recurring pattern or problem the name compresses. A memorable label should let later paragraphs refer to a proved relationship; it should not manufacture importance.

After a long explanation, leave a compact model the reader can retain: a dependency, invariant, decision criterion, boundary map, or next diagnostic question. Compression must preserve the qualifiers and limits earned by the article.

For broad primers, provide a dependency-aware route and visible self-navigation. A glossary or table of contents is useful when it helps readers locate their uncertainty, not when it merely advertises completeness.

## Earn the Ending

End with the result the article has actually earned:

- a corrected model
- a decision criterion
- a bounded conclusion
- a remaining tradeoff or open question
- a next experiment or verification step

Series entries may end on a deliberately unresolved question when the article has narrowed it meaningfully. Retrospectives should preserve contingency and avoid rewriting later outcomes as an original plan. Do not add a universal lesson, emotional peak, or title echo merely for closure.

## Anti-Overfitting Rules

- Do not imitate a reference author's phrasing, jokes, rhetorical-question cadence, personal history, heading pattern, or autobiographical authority.
- Do not require a catchy name, one continuous example, a long objection section, a historical analogy, or first-principles reconstruction in every article.
- Do not confuse length with depth. Each detour must remove a plausible wrong model, establish a necessary constraint, or support a later inference.
- Do not convert these tools into surface detectors. A rule is useful only when it prevents a concrete reader failure.
- Prefer the simpler structure when the source and reader task do not support a larger argument.

## Final Reasoning Check

- Can the reader state what changed in their model?
- Does each important conclusion have a supported premise and visible reasoning path?
- Are intermediate models, proxies, analogies, and derived views labeled with their limits?
- Does each example change or test something specific?
- Are the specific boundary dimensions that affect the conclusion—such as ownership, authority, representation, phase, identity, or location—explicit, without adding unrelated dimensions?
- Are alternatives judged against the same criterion?
- Does the ending complete the article's actual work rather than add a generic moral?
