// Platform-authored explanations, separate from final-test keys.
const notes: Record<number, string[]> = {
23:[
 'have is the main verb expressing a family relationship; two brothers is its noun complement, not V3.',
 'has builds Present Perfect with main verb completed (V3).',
 'had is the main past-tense verb of possession; a beautiful garden is a noun phrase.',
 'have builds the perfect, been supplies continuous BE, and waiting is the main V-ing verb.',
 'has is the main verb in have lunch, an activity expression, not a perfect auxiliary.',
 'will + have + finished: have is the perfect auxiliary, will is first, finished is the main V3 verb.'
],
29:[
 'Does carries agreement; studies → study (V1).',
 'Did carries past tense; went → go (V1).',
 'Linking BE needs no do-support: delete Do and invert are.',
 'Continuous BE already supplies the auxiliary: delete Does and invert is; keep studying.',
 'Perfect have already supplies the auxiliary: delete Do and invert have; keep finished.',
 'After does not use V1: has → have. Main HAVE means possession.',
 'This is a usage preference, not a universal error. Possessive He hasn\'t a car occurs in some varieties, notably British usage; the source teaching form is He doesn\'t have a car. Have you got a car? is also common.',
 'Perfect has takes V3: finish → finished.',
 'Modal will takes base have: has → have. Completed remains V3.',
 'Emphatic did takes V1: understood → understand. Did carries tense, not understood.'
],
30:[
 'is builds Present Continuous; reading (V-ing) carries the action.',
 'have builds Present Perfect; completed is the main V3 verb.',
 'did forms the Past Simple question; visit stays V1 because did carries past tense.',
 'were builds Past Continuous; preparing is the main V-ing verb.',
 'will is the modal auxiliary; finish is the main base verb.',
 'List BOTH has and been: perfect + continuous; working is the main V-ing verb.',
 'The source calls don\'t the auxiliary; morphologically it is do + not. Watch is the main V1 verb.',
 'List BOTH will and have: Future Perfect; completed is the main V3 verb.'
],
31:[
 'Does agrees with she in Present Simple; study is V1. Do has wrong agreement; is cannot take bare study here.',
 'Are agrees with they and takes watching (V-ing). Do takes V1; have would require been.',
 'Have + you + finished (V3) forms Present Perfect. Do takes V1; are does not express this perfect.',
 'Did expresses past with yesterday and takes visit (V1). Does is present; was cannot take bare visit.',
 'Was is past linking BE with she + happy. Did and does cannot link an adjective.',
 'Have + they + been waiting forms Present Perfect Continuous. Are cannot take been; do would require V1.',
 'Have is main possession here, so use do-support with you. Are cannot take bare have; have been gives the wrong construction.',
 'Will is first in will + have + completed (Future Perfect). Does and is do not build Future Perfect.'
],
32:[
 'Move is before she; retain main preparing (V-ing). No do-support.',
 'Move have before they; retain finished (V3).',
 'No auxiliary: choose does for Omar; plays → play (V1).',
 'No auxiliary: choose did for past; visited → visit (V1).',
 'Move were before we; retain studying (V-ing). Preserve source pronoun we.',
 'Move ONLY has before he; retain been learning in that order.',
 'Move will before they; retain main travel (V1).',
 'Move ONLY will before she; retain have completed and by Friday.'
],
33:[
 'Insert not after linking is: is not / isn\'t. Ready is a complement.',
 'No auxiliary: add do not with they; keep play (V1).',
 'No auxiliary: add did not for past; visited → visit (V1).',
 'Insert not after first auxiliary has; keep finished (V3).',
 'Insert not after were; keep watching (V-ing).',
 'Insert not after first auxiliary have; keep been working in order.',
 'Insert not after will (will not / won\'t); keep join (V1).',
 'Negate ONLY first auxiliary will; retain have finished.'
],
34:[
 'HAVE means possession; a new computer is a noun complement.',
 'HAS builds Present Perfect; completed is the main V3 verb.',
 'DO forms the Present Simple question; like is the main V1 verb.',
 'DO means perform/complete; my homework is its object.',
 'IS links she to adjective happy; it is main/linking BE here.',
 'IS builds Present Continuous with main studying (V-ing).',
 'Identify BOTH occurrences: DID is past question support; DO is the main base verb meaning perform. The experiment is its object.',
 'HAVE builds the perfect; been is continuous BE; working is main V-ing.'
],
35:[
 'Textual basis: Maya is a student who enjoys science and technology.',
 'Textual basis: She studies English every morning.',
 'Textual basis: This week, she is preparing a presentation about renewable energy. Is = auxiliary; preparing = main.',
 'Textual basis: she hasn\'t finished the presentation yet. Has is perfect auxiliary; finished is V3.',
 'The teacher\'s exact question is Did you find enough information? Did supplies past; find is V1.',
 'Textual basis: I do need some help with the final section. Do emphasizes genuine need; need is main V1.',
 'Textual basis: By Friday, Maya will have completed the presentation. Will/have are auxiliaries; completed is main V3.',
 'Textual basis: she is preparing a presentation. Is builds continuous; preparing carries the action. Maya is a student is linking BE, not this auxiliary use.',
 'Textual basis: She has already collected several useful articles. Has builds perfect; collected is main V3. I have also prepared some diagrams is another valid example.',
 'Textual basis: I do need some help. Do is emphatic, unlike Do you need any help?, where it forms a question.'
]};
export function practiceReason41(section: number, number: number) { return notes[section]?.[number-1] ?? ''; }
