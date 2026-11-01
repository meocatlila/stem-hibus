# Before and After Examples

Use these examples to calibrate principles, not as templates to copy.

## Prefer a Concrete Opening

Before:

> 在当今快速发展的技术环境中，开发效率正变得越来越重要。

After:

> 同一条仓库规则写进五个提示词后，我开始维护五份容易漂移的副本。

The revision replaces generic importance with the supplied problem. It would be invalid
if the five copies were not supported by the source.

## Preserve Technical Text

Source:

```bash
git config --show-origin user.email
```

Keep the command exact. Improve the surrounding explanation, not flags or punctuation
inside protected code.

## Distinguish Tested and Documented

Before:

> 这个流程已经在 macOS 和 Linux 上验证。

Evidence:

- tested on macOS with Git 2.50.0
- official documentation describes Linux support
- Linux was not tested

After:

> 我在 macOS 和 Git 2.50.0 上验证了这个流程。官方文档也说明支持 Linux，但我没有在 Linux 上实测。

## Preserve Plan Status

Before:

> 接下来会完成前端改造、工程优化和新模块集成。

Source wording: `后续可以做前端改造、工程优化、集成新模块之类的。`

After:

> 后续可以把前端改造、工程优化和新模块集成作为候选方向，再按实际需求决定优先级。

Do not turn a possibility into a commitment or completed result.

## Integrate Follow-Up Material

Weak edit:

> 补充：现在主要由我规划，AI 负责实施和验证。

Better direction:

Place that distinction where the article explains responsibilities, then adjust the
nearby transition and ending. Do not preserve the chronology of user instructions in
a timeless article.

## Adapt, Do Not Merely Reformat

A Reddit adaptation may shorten the setup, lead with the concrete problem, use a more
conversational register, and end with a genuine question. It must not add a personal
incident, broaden a metric, remove attribution, or convert product copy into fake
community testimony.

## English-First Chinese Final

Private English structure:

> The duplicated rules were not the main problem. The real cost was that each copy
> became a separate authority.

Natural Chinese final:

> 真正的问题不是规则重复，而是每份副本都可能变成一套独立口径。

Check the Chinese sentence against the original evidence. The English intermediate
clarifies structure but cannot add facts or outrank the source.

## No Change Is a Valid Result

If a sentence is clear, specific, source-shaped, and natural for its reader, keep it.
Replacing it only to vary vocabulary or punctuation is over-editing.
