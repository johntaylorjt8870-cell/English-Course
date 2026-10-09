# Continuation from ee70138: all 48 original BIDI findings

24 repaired / 24 OPEN / zero new exceptions. Both viewports use actual App snapshots and Chromium glyph ranges. OPEN includes heuristic candidates, not automatically proven defects or waivers. The narrow rail is hidden and native option glyph ranges are not evidence of correctness.

| Lesson | Before | Remaining |
|---|---:|---:|
| 1 | 0 | 0 |
| 2 | 0 | 0 |
| 3 | 5 | 0 |
| 4 | 1 | 1 |
| 5 | 0 | 0 |
| 6 | 0 | 0 |
| 7 | 1 | 1 |
| 8 | 2 | 1 |
| 9 | 1 | 0 |
| 10 | 4 | 2 |
| 11 | 0 | 0 |
| 12 | 3 | 1 |
| 13 | 6 | 0 |
| 14 | 0 | 0 |
| 15 | 0 | 0 |
| 16 | 2 | 2 |
| 17 | 1 | 1 |
| 18 | 2 | 2 |
| 19 | 1 | 0 |
| 20 | 6 | 6 |
| 21 | 1 | 0 |
| 22 | 2 | 1 |
| 23 | 2 | 2 |
| 24 | 2 | 2 |
| 25 | 1 | 0 |
| 26 | 5 | 2 |
| 27 | 0 | 0 |
| 28 | 0 | 0 |
| 29 | 0 | 0 |
| 30 | 0 | 0 |
| 31 | 0 | 0 |
| 32 | 0 | 0 |

| Original ID | Exact source origin | Status | Cause / remaining action |
|---|---|---|---|
| fdf631dd9ba71bc8 | `src/lessons/lesson3/Lesson3.tsx#NegativeEx:804:15` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| 403e2a3b7d852fe6 | `src/lessons/lesson3/Lesson3.tsx#NegativeEx:804:15` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| bddeb319353f9a20 | `src/lessons/lesson3/Lesson3.tsx#NegativeEx:804:15` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| 4b56ce57582c2cf9 | `src/lessons/lesson3/Lesson3.tsx#NegativeEx:804:15` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| b3492e18e8cfe547 | `src/lessons/lesson3/Lesson3.tsx#NegativeEx:804:15` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| 96ed9167e8093a85 | `src/lessons/lesson4/Lesson4.tsx#Challenge:1120:15` | OPEN — not waived | Native select: the inferred Verb to beArticle target concatenates mutually exclusive options. Native option glyph ranges are zero; selected-option rendering has not been certified. Do not treat zero rectangles as passing evidence. |
| 915a29c9e3a772cb | `src/lessons/lesson7/Lesson7.tsx#GroupsDo:137:7` | OPEN — not waived | Arabic-led negative/question clauses separated by an em dash. The oracle pairs don’t with the next clause label, not its own label. English question punctuation still needs a clause-aware regression; blindly grouping across the dash risks changing meaning. |
| 079db2a35ac08a74 | `src/lessons/lesson8/Lesson8.tsx#Cover:707:9` | OPEN — not waived | Independent cover pills, not a translated label. Row oracle conflates neighboring topic tags. Their intended order and wrapping require an explicit source-semantic contract. |
| 651beb2d35991a0b | `src/lessons/lesson8/Lesson8.tsx#SentenceCard:68:18` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| 969c944a562cef17 | `src/lessons/lesson9/Lesson9.tsx#BeTabs:139:7` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| 831dc6b412dd91e2 | `src/lessons/lesson10/Lesson10.tsx#Rail:1119:19` | OPEN — not waived | Rail alternative question followed by Arabic instruction. Actual desktop punctuation/instruction wraps; rail is hidden at narrow width. No mobile geometry claim; clause boundaries and punctuation remain unresolved. |
| 4491d05255ca532b | `src/lessons/lesson10/Lesson10.tsx#VsSimpleAdvanced:317:9` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| 8386f084b42bc358 | `src/lessons/lesson10/Lesson10.tsx#VsSimpleAdvanced:329:9` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| 1f1841687ac3c5ed | `src/lessons/lesson10/Lesson10.tsx#Rich:47:10` | OPEN — not waived | Inferred Latin begins with the preceding Arabic sentence’s period. Actual plays starts left of its Arabic explanation. Exact oracle boundary review needed; not waived. |
| 8618db4462a51548 | `src/lessons/lesson12/Lesson12.tsx#SubjectGrid:406:7` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| 5d2600af3fc51a3a | `src/lessons/lesson12/Lesson12.tsx#Frame:99:16` | OPEN — not waived | Consonant + y formula: plus is outside the isolated y. Whether plus belongs to the preceding Arabic operand or the English token needs an explicit expression contract; no silent source rewrite. |
| 99bfce27a88ed27a | `src/lessons/lesson12/Lesson12.tsx#EdMachine:354:7` | REPAIRED — real-source geometry and original negative control pass | Shared parser trimmed the attached suffix hyphen as preceding punctuation. Preserve a leading hyphen immediately attached to a Latin token. |
| 22ac523e4ebe019b | `src/lessons/lesson13/Lesson13.tsx#PartsLine:159:21` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| 6896e693af308881 | `src/lessons/lesson13/Lesson13.tsx#PartsLine:159:21` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| ac191c805ea02cb5 | `src/lessons/lesson13/Lesson13.tsx#PresentPastToggle:579:7` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| 6df03bba6ec8bb06 | `src/lessons/lesson13/Lesson13.tsx#TabBtn:244:5` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| 162fd7029eb7bacd | `src/lessons/lesson13/Lesson13.tsx#TabBtn:244:5` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| 48bfb448a55b9cbb | `src/lessons/lesson13/Lesson13.tsx#IQ200Ex:1098:7` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| 562538031bc27572 | `src/lessons/lesson16/Lesson16.tsx#Rich:67:10` | OPEN — not waived | The inferred . book starts at the preceding Arabic sentence’s period. The actual b is left of الاسم; oracle boundary candidate, retained without exemption. |
| f9237450d963f0c6 | `src/lessons/lesson16/Lesson16.tsx#Rich:67:10` | OPEN — not waived | The inferred . their starts at a preceding Arabic sentence’s period. Actual their is left of its gloss; oracle boundary candidate, retained without exemption. |
| 4eb0b06b0eb57373 | `src/shared/bidi.tsx#EnAr:447:5` | OPEN — not waived | Arabic ownership map contains noun + possessive suffix. Plus is not grouped with the suffix; choosing an expression boundary without source-semantic verification risks changing the map. |
| ad2b68b306713fc6 | `src/lessons/lesson18/Lesson18.tsx#Cover:2463:9` | OPEN — not waived | Independent cover topic pills; row oracle interprets English topic and Arabic topic as a translation. Needs a pill-order contract, not a blanket flex exception. |
| b54105dc01804489 | `src/lessons/lesson18/Lesson18.tsx#Summary:2530:13` | OPEN — not waived | Mixed Arabic/English pluralization title plus separate exception note. Applying English-only label direction to the whole Arabic-led title would be unsafe. |
| 8185d53475624736 | `src/lessons/lesson19/Lesson19.tsx#FinalBossEx:1516:9` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| 60de322313989b5f | `src/lessons/lesson20/Lesson20.tsx#FinalBossEx:1116:21` | OPEN — not waived | This chip is embedded in an Arabic question, followed by في السؤال الأول؟; the suffix is not a translation of this. Preserve RTL question reading and test chip/punctuation boundaries. |
| 021f190787ad1406 | `src/lessons/lesson20/Lesson20.tsx#FinalBossEx:1116:21` | OPEN — not waived | That chip is embedded in an Arabic question, followed by في السؤال الثاني؟; not a translated label. Needs RTL question-flow regression. |
| 0331e606d113e795 | `src/lessons/lesson20/Lesson20.tsx#FinalBossEx:1116:21` | OPEN — not waived | These chip followed by Arabic connective مع and notebooks; not a translation. Both English tokens and question punctuation need a complete sentence test. |
| 54248a7bcad27bbd | `src/lessons/lesson20/Lesson20.tsx#FinalBossEx:1116:21` | OPEN — not waived | Those chip followed by Arabic connective مع and bicycles; not a translation. Do not reverse the whole Arabic question to satisfy a pair heuristic. |
| 1dce6f6e34d28783 | `src/lessons/lesson20/Lesson20.tsx#FinalBossEx:1116:21` | OPEN — not waived | English noun phrase followed by Arabic conjunction و; the conjunction connects another phrase, not a gloss. Full question-flow contract remains open. |
| 773a481a0b1af9c6 | `src/lessons/lesson20/Lesson20.tsx#FinalBossEx:1116:21` | OPEN — not waived | Possessive noun phrase followed by ولم نقل and a contrasting phrase. It is a contrast question, not English-to-Arabic translation. |
| a664174454aab722 | `src/lessons/lesson21/Lesson21.tsx#LocationLab:671:7` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| 18a83403b0994ab2 | `src/lessons/lesson22/Lesson22.tsx#OpeningRecall:493:9` | OPEN — not waived | Recall pills and final Arabic continuation وحتى الجمل الأطول. Different roles are conflated as a bilingual label by the row oracle; no exemption added. |
| 3711f6f8f215e29f | `src/lessons/lesson22/Lesson22.tsx#PositionOverview:534:7` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| 99286d6e998604cf | `src/lessons/lesson23/Lesson23.tsx#InformationLab:2168:9` | OPEN — not waived | Countable pieces followed by contrast وليس information نفسها. English target and Arabic connective are not a definition pair; needs whole-statement geometry. |
| 0d4d768034b4d07e | `src/lessons/lesson23/Lesson23.tsx#TrapNote:2447:7` | OPEN — not waived | Correct some rice and incorrect alternative separated by وليس. Preserve contrast sequence; pairing correct answer with connective alone would misrepresent the source. |
| db0737a7ecea1a9a | `src/lessons/lesson24/Lesson24.tsx#BodyLine:203:9` | OPEN — not waived | Inferred . few includes previous Arabic sentence punctuation. Actual few is left of its explanation; retained pending exact oracle-boundary regression. |
| d77b545c7e96f088 | `src/lessons/lesson24/Lesson24.tsx#BodyLine:203:9` | OPEN — not waived | Inferred . little includes previous Arabic sentence punctuation. Actual little is left of its explanation; retained pending exact oracle-boundary regression. |
| 502c3967f41dc6d5 | `src/lessons/lesson25/Lesson25.tsx#Rich:343:10` | REPAIRED — real-source geometry and original negative control pass | Shared parser trimmed the attached suffix hyphen as preceding punctuation. Preserve a leading hyphen immediately attached to a Latin token. |
| 63dd1e6803e58088 | `src/lessons/lesson26/Lesson26.tsx#CookSceneLab:669:7` | OPEN — not waived | Past Continuous / لكن / contrasting tense is a contrast sequence, not label/gloss. Complete contrast reading order needs verification. |
| c30e24ed38333247 | `src/lessons/lesson26/Lesson26.tsx#WhenVsWhileLab:974:9` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| 5115d4dba8ae89f4 | `src/lessons/lesson26/Lesson26.tsx#GrammarDetective:3167:7` | OPEN — not waived | Progressive formula followed by و joining another pattern. Conjunction is not a gloss; full expression sequence remains unverified. |
| d31b16b4a5b69177 | `src/lessons/lesson26/Lesson26.tsx#Iq200MatchLab:2472:11` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
| ab23f9147044ae31 | `src/lessons/lesson26/Lesson26.tsx#Iq200MatchLab:2475:11` | REPAIRED — real-source geometry and original negative control pass | Bilingual semantic unit was split into raw text or unrelated RTL siblings. Reuse LatinRuns for the complete label or EnAr for the existing structured label/gloss. |
