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
