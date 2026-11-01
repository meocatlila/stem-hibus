# Quality Rubric

Evaluate the finished artifact against the supplied sources and requested reader task.
Package validation checks structure; editorial review decides whether the writing is
ready.

## Hard Gates

- **P0 — misleading or unsafe:** invented or materially wrong facts, changed
  technical meaning, false attribution, concealed material relationships, exposed
  secrets, or unsafe instructions. Block the affected output.
- **P1 — publication blocker:** unresolved source conflicts, missing required
  disclosure or correction notes, lost author position, incorrect claim status,
  unusable technical steps, or structure that changes the argument. Fix before use.
- **P2 — substantive edit:** generic structure, repeated reasoning, weak evidence
  placement, append-only seams, platform mismatch, over-editing, or flattened voice.
  Fix unless the user accepts the tradeoff.
- **P3 — preference edit:** local wording, rhythm, naming, or formatting changes that
  do not affect meaning or trust.

## Review Priorities

Check in this order:

1. Facts, source precedence, attribution, uncertainty, claim status, and protected
   technical text.
2. User intent, target reader, requested language, and platform constraints.
3. Author position, actor role, voice, and degree of confidence.
4. Authorized edit scope, then logic, structure, evidence placement, information density, and limitations.
5. Natural rhythm, terminology, grammar, punctuation, links, and formatting.

Do not trade a higher-priority requirement for smoother prose.

## Assessment Procedure

1. Read the result once as the target reader.
2. Compare claims and protected text with the authoritative sources.
3. Check title, description, body, code, tables, links, disclosures, and status terms
   for contradictions or omissions.
4. Count explicit word, character, paragraph, section, or item constraints in the
   requested unit; revise and recount until the artifact is inside the contract.
5. List concrete defects with their severity and evidence.
6. Resolve P0 and P1 defects before lower-severity editing.
7. Re-read the finished artifact and stop when another change has no concrete reader
   benefit or would weaken facts, terminology, modality, or voice.

## Final Gate

- No fact, experience, metric, date, quotation, result, or source was invented.
- Attribution, scope, uncertainty, plans, commitments, and completed work retain
  their actual status.
- Commands, paths, flags, versions, code, identifiers, and numeric ranges remain
  exact unless a verified correction was requested.
- Background-only evidence did not leak into the artifact, while required
  attribution and disclosures remain visible.
- Follow-up material is integrated without repetition, stale framing, or narration
  of the editing process.
- The opening serves the reader's task, each section adds information, and the ending
  follows from the supported argument.
- Lists group each main assertion with the condition, limit, exception, reason, or
  consequence needed to interpret it, while independent checks and steps remain
  separate.
- Platform adaptation changes presentation without changing meaning or importing a
  stereotyped voice.
- Diagnosis severity did not expand the authorized edit scope, and no style rule
  changed the actor-action-object relation, completion state, or claim strength.
- Missing evidence is omitted, qualified, or returned as the minimum typed gap rather
  than filled with plausible detail.
- Explicit length limits are measured in their stated unit. Minimums are not met with
  repetition or invention, and maximums are not treated as approximate.
- When unsupported sections can be separated from supported ones, the useful safe
  artifact is delivered; fill-ready placeholders appear only when the requested form
  is a template or draft intended for later completion.

Do not expose this assessment unless the user asks for it.
