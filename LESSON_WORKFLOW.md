# Lesson Integration Workflow

1. Receive the new lesson source.
2. Preserve its explanations, examples, exercises, terminology, and sequence.
3. Build its lesson component under `src/lessons/lessonN/`.
4. Put reusable lesson content/data in `data.ts` when appropriate.
5. Reuse shared components before creating duplicates.
6. Add creative interaction that reinforces the lesson rather than replacing content.
7. Register the lesson in the main hub/router.
8. Verify Arabic RTL and English LTR rendering.
9. Run the production build before delivery.

The existing Lessons 1–9 are the baseline and should not be shortened when future lessons are added.

## Student-facing copy and source provenance

- In new or rebuilt lessons—especially Lessons 32–40—do not show students source labels such as “source,” “source section X,” source filenames, or internal source-partition names. Use natural instructional titles and labels instead.
- Keep source ledgers, section/file identifiers, `source`/`ref` metadata, and audit trails internally available; teacher-only views may expose them where useful.
- Remove only editorial provenance labels from student-facing copy. Do not shorten or omit teaching content, examples, questions, answers, feedback, or interactions to hide a label, and do not change question banks, answer keys, grading, or solution gates as part of this cleanup.
- Check the rendered student interface—not just source files—including accessible names, feedback states, and unlocked solutions. Use the reusable student-copy audit (`scripts/lib/student-copy-audit.mjs`) with the lesson audit; a static text search alone is insufficient.
