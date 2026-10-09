/** Index the existing teacher reference without inventing textbook questions.
 * Explicit printed item markers are evidence; array positions are NOT question numbers.
 * Every source line is retained verbatim in its group, including contextual notes.
 */
export type TeacherSourceGroup = { head: string; lines: readonly string[] };
export type TeacherSourceItem = {
  id: string;
  number: string;
  segments: string[];
  sourceLineIndexes: number[];
};
export function indexTeacherSource(lesson: number, groups: readonly TeacherSourceGroup[]) {
  return groups.map((group, gi) => {
    const items: TeacherSourceItem[] = [];
    const context: { text: string; line: number }[] = [];
    group.lines.forEach((line, li) => {
      // Circled numbers are printed sub-question markers, not generated ordinals.
      const markers = [...line.matchAll(/(?:^|(?<=\s))([①-⑳])(?=\s|:)/g)];
      const ordinary = /^(\d+)[.)]\s|^(المعركة\s+\d+):/.exec(line);
      const parts = markers.length && markers[0].index === 0
        ? markers.map((m, i) => ({ number: m[1], text: line.slice(m.index, markers[i + 1]?.index ?? line.length) }))
        : ordinary ? [{ number: ordinary[1] || ordinary[2], text: line }] : [];
      if (!parts.length) { context.push({ text: line, line: li }); return; }
      for (const part of parts) {
        let item = items.find((q) => q.number === part.number);
        if (!item) {
          item = { id: `l${lesson}-source-${gi + 1}-${encodeURIComponent(part.number)}`, number: part.number, segments: [], sourceLineIndexes: [] };
          items.push(item);
        }
        item.segments.push(part.text);
        item.sourceLineIndexes.push(li);
      }
    });
    return {
      id: `l${lesson}-source-${gi + 1}`, reference: group.head, sourcePage: null,
      originalQuestionText: null, items, context, originalLines: group.lines,
      mappingStatus: items.length ? "explicit-reference-numbering" as const : "unmapped-group" as const,
    };
  });
}
