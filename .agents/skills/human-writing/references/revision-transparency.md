# Revision Transparency

A rewrite can improve prose while making the publication record less trustworthy. Treat an already-published artifact differently from an unpublished draft.

## Classify the Change

- **Copyedit:** grammar, punctuation, formatting, or wording changes that do not alter meaning.
- **Clarification:** makes an existing claim easier to understand without changing its factual content, scope, recommendation, or risk.
- **Content refresh:** integrates a current name, link, example, feature, or supporting detail without correcting a material error or changing how readers should use the artifact.
- **Material correction:** fixes a wrong or misleading fact, command, configuration, metric, conclusion, recommendation, scope, or risk boundary.
- **Substantial update:** adds a new version, method, result, limitation, or conclusion that changes how a reader should use or interpret the article.

Copyedits, clarifications, and content refreshes usually do not need an update note. Integrate them where the information naturally belongs. Material corrections and reader-relevant substantial updates do need a visible note when hiding the earlier state would mislead a returning reader.

## Required Handling

Do not infer that an update note is required merely because the artifact is already published or because new text was added. First ask whether readers need to know that the previous version differed in order to understand the current facts, recommendation, compatibility, or risk. If not, edit the article as an article, not as a changelog.

When a visible correction or update note is required:

1. preserve the original publication date when the format supports a separate update history
2. add a dated update or correction note near the opening for a material correction or substantial update
3. state what changed precisely enough for a returning reader to understand the difference
4. preserve the corrected command, claim, scope, source, and risk boundary in the body
5. follow the target platform's current official placement and wording rules

Do not silently replace a material error, reset the original publication date to make the article look newly published, or describe a correction as a cosmetic edit. Do not add a correction note for spelling, punctuation, layout, renamed links, routine feature mentions, or supporting details that can be integrated without changing the reader's decision.

A useful note is concise:

```text
更新（2026-07-11）：修正 `includeIf` 条件关键字为 `hasconfig:remote.*.url`，并补充 HTTPS/SSH 匹配、配置来源检查和适用边界。
```

## Platform Verification Boundary

Treat placement, wording, labels, and disclosure thresholds as current external claims. Before calling an artifact platform-ready, verify the target platform's current official rule and record the authoritative source and check date when compliance matters. If the rule cannot be verified, preserve a truthful dated correction note without claiming platform compliance.

## Regression Check

Input:

```text
- the article was already published
- the previous configuration used an invalid condition keyword
- the corrected article now uses `hasconfig:remote.*.url`
- the original publication date is known
```

Must:

- preserve the original publication date
- add a dated correction note near the opening
- name the corrected condition keyword
- keep the corrected configuration and verification steps in the body

Reject if the rewrite silently replaces the invalid configuration, changes the original publication date to the correction date, or says only `updated for clarity`.
