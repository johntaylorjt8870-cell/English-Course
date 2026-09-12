// ============================================================
// بنك الاختبارات النهائية — 12 سؤالًا جديدًا لكل درس
// جميع الجمل جديدة وغير مكررة من الشرح
// ============================================================

export interface QuizQ {
  /** التعليمة بالعربية */
  ar: string;
  /** جملة/سؤال إنجليزي يُعرض باتجاه LTR */
  en?: string;
  /** الخيارات (إنجليزية) */
  opts: string[];
  /** رقم الإجابة الصحيحة */
  answer: number;
  /** الشرح بالعربية */
  why: string;
}

export const QUIZZES: Record<number, QuizQ[]> = {
  // ---------------- الدرس 1 ----------------
  1: [
    { ar: "ما هو الـ Subject في الجملة التالية؟", en: "The chef cooks pasta.", opts: ["The chef", "cooks", "pasta", "chef cooks"], answer: 0, why: "من الذي يطبخ؟ The chef — هو الفاعل." },
    { ar: "ما هو الـ Verb في الجملة التالية؟", en: "Birds fly south every winter.", opts: ["fly", "Birds", "south", "winter"], answer: 0, why: "ماذا تفعل الطيور؟ fly — هو الفعل." },
    { ar: "ما هو الـ Object في الجملة التالية؟", en: "Mira drinks orange juice.", opts: ["orange juice", "Mira", "drinks", "Mira drinks"], answer: 0, why: "ماذا تشرب ميرا؟ orange juice — وقع عليه الفعل." },
    { ar: "اختر الجملة مرتبة بشكل صحيح:", opts: ["Sara reads a story.", "Reads Sara a story.", "Sara a story reads.", "A story Sara reads."], answer: 0, why: "الترتيب الصحيح دائمًا: Subject ← Verb ← Object." },
    { ar: "ما هو الـ Verb في الجملة التالية؟", en: "Liam fixed his bike.", opts: ["fixed", "Liam", "his bike", "bike"], answer: 0, why: "ماذا فعل ليام؟ fixed — هو الفعل." },
    { ar: "أي جملة لا تحتوي على Object؟", opts: ["Adam sleeps early.", "Mia loves music.", "Khalil opens the window.", "Sara drinks tea."], answer: 0, why: "sleeps فعل لا يحتاج مفعولًا هنا — early ظرف وليس مفعولًا." },
    { ar: "ما هو الـ Object في الجملة التالية؟", en: "The teacher explains the lesson.", opts: ["the lesson", "The teacher", "explains", "teacher explains"], answer: 0, why: "ماذا يشرح المعلم؟ the lesson." },
    { ar: "ما هو الـ Subject في الجملة التالية؟", en: "My friends play chess on Fridays.", opts: ["My friends", "play", "chess", "on Fridays"], answer: 0, why: "من يلعب؟ My friends — الفاعل قد يكون أكثر من كلمة." },
    { ar: "اختر الجملة الصحيحة:", opts: ["Mahmoud watches the stars.", "Watches Mahmoud the stars.", "Mahmoud the stars watches.", "The stars watches Mahmoud."], answer: 0, why: "نبدأ بالفاعل ثم الفعل ثم المفعول به." },
    { ar: "ما هو الـ Verb في الجملة التالية؟", en: "The baby cries loudly.", opts: ["cries", "The baby", "loudly", "baby cries"], answer: 0, why: "ماذا يفعل الطفل؟ cries — هو الفعل." },
    { ar: "ما هو الـ Subject في الجملة التالية؟", en: "Sara and Liam study French.", opts: ["Sara and Liam", "study", "French", "study French"], answer: 0, why: "من يدرس؟ Sara and Liam معًا — فاعل مزدوج." },
    { ar: "أي جملة تتبع نمط S + V + O؟", opts: ["Mia eats an apple.", "Eats Mia an apple.", "Mia an apple eats.", "An apple eats Mia."], answer: 0, why: "Mia فاعل + eats فعل + an apple مفعول به." },
  ],

  // ---------------- الدرس 2 ----------------
  2: [
    { ar: "أكمل: ___ am a pilot.", en: "___ am a pilot.", opts: ["I", "He", "They", "You"], answer: 0, why: "am لا تأتي إلا مع I." },
    { ar: "Liam and Adam are brothers. أكمل: ___ are tall.", en: "___ are tall.", opts: ["They", "He", "She", "It"], answer: 0, why: "شخصان ← They." },
    { ar: "Mira is a nurse. أكمل: ___ is kind.", en: "___ is kind.", opts: ["She", "He", "They", "We"], answer: 0, why: "ميرا أنثى مفرد ← She." },
    { ar: "The phone is new. أكمل: ___ is expensive.", en: "___ is expensive.", opts: ["It", "He", "She", "They"], answer: 0, why: "الهاتف شيء مفرد ← It." },
    { ar: "Sara and I are neighbors. أكمل: ___ are friends.", en: "___ are friends.", opts: ["We", "They", "He", "You"], answer: 0, why: "أنا + شخص آخر ← We." },
    { ar: "أكمل: You ___ welcome.", en: "You ___ welcome.", opts: ["are", "is", "am", "be"], answer: 0, why: "You تأخذ are دائمًا." },
    { ar: "أكمل: Mahmoud ___ a driver.", en: "Mahmoud ___ a driver.", opts: ["is", "are", "am", "be"], answer: 0, why: "محمود مفرد غائب (He) ← is." },
    { ar: "أكمل: I ___ ready for school.", en: "I ___ ready for school.", opts: ["am", "is", "are", "be"], answer: 0, why: "I تأخذ am دائمًا." },
    { ar: "أكمل: The dogs ___ hungry.", en: "The dogs ___ hungry.", opts: ["are", "is", "am", "be"], answer: 0, why: "الكلاب جمع (They) ← are." },
    { ar: "نخاطب Mia ونقول لها: ___ are late!", en: "___ are late!", opts: ["You", "She", "They", "We"], answer: 0, why: "عند مخاطبة شخص نستخدم You." },
    { ar: "أكمل: Khalil ___ my cousin.", en: "Khalil ___ my cousin.", opts: ["is", "are", "am", "be"], answer: 0, why: "خليل مفرد غائب (He) ← is." },
    { ar: "اختر الجملة الصحيحة:", opts: ["They are happy.", "They is happy.", "They am happy.", "They be happy."], answer: 0, why: "They تأخذ are." },
  ],

  // ---------------- الدرس 3 ----------------
  3: [
    { ar: "ما نفي الجملة: She is busy.", en: "She is busy.", opts: ["She is not busy.", "She not is busy.", "She don't be busy.", "She isn't busy not."], answer: 0, why: "نضع not بعد is مباشرة." },
    { ar: "ما سؤال الجملة: They are ready.", en: "They are ready.", opts: ["Are they ready?", "They are ready?", "Do they ready?", "Is they ready?"], answer: 0, why: "نقلب: الفعل قبل الفاعل — Are they...?" },
    { ar: "أكمل السؤال: ___ I late?", en: "___ I late?", opts: ["Am", "Is", "Are", "Do"], answer: 0, why: "مع I نبدأ السؤال بـ Am." },
    { ar: "أجب بـ Yes عن: Is he tired?", en: "Is he tired?", opts: ["Yes, he is.", "Yes, he are.", "Yes, he am.", "Yes, he do."], answer: 0, why: "الإجابة القصيرة تكرر نفس الفعل: is." },
    { ar: "أجب بـ No عن: Are you hungry?", en: "Are you hungry?", opts: ["No, I am not.", "No, you are not.", "No, I are not.", "No, I is not."], answer: 0, why: "عندما أتكلم عن نفسي أستخدم I — حتى لو كان السؤال بـ you." },
    { ar: "اختر الجملة الصحيحة:", opts: ["He is not tall.", "He not is tall.", "He don't be tall.", "He no is tall."], answer: 0, why: "not تأتي بعد is وليس قبلها." },
    { ar: "أكمل السؤال: ___ she a doctor?", en: "___ she a doctor?", opts: ["Is", "Are", "Am", "Does"], answer: 0, why: "مع she نبدأ بـ Is." },
    { ar: "ما نفي الجملة: We are late.", en: "We are late.", opts: ["We are not late.", "We is not late.", "We don't late.", "We not are late."], answer: 0, why: "not بعد are مباشرة." },
    { ar: "أجب بـ Yes عن: Are they friends?", en: "Are they friends?", opts: ["Yes, they are.", "Yes, they is.", "Yes, they do.", "Yes, they am."], answer: 0, why: "السؤال بـ are ← الجواب بـ are." },
    { ar: "ما سؤال الجملة: It is cold.", en: "It is cold.", opts: ["Is it cold?", "It is cold?", "Does it cold?", "Are it cold?"], answer: 0, why: "نقلب is قبل it." },
    { ar: "اختر السؤال الصحيح:", opts: ["Is he happy?", "Does he is happy?", "He is happy?", "Do he is happy?"], answer: 0, why: "مع Verb to be لا نستخدم do/does أبدًا." },
    { ar: "ما نفي الجملة: I am tired.", en: "I am tired.", opts: ["I am not tired.", "I is not tired.", "I don't tired.", "I not am tired."], answer: 0, why: "not بعد am مباشرة." },
  ],

  // ---------------- الدرس 4 ----------------
  4: [
    { ar: "اختر الأداة: ___ egg", en: "___ egg", opts: ["an", "a", "the", "—"], answer: 0, why: "egg تبدأ بصوت علة ← an." },
    { ar: "اختر الأداة: ___ tiger", en: "___ tiger", opts: ["a", "an", "the", "—"], answer: 0, why: "tiger تبدأ بصوت ساكن ← a." },
    { ar: "اختر الأداة: ___ ice cream", en: "___ ice cream", opts: ["an", "a", "the", "—"], answer: 0, why: "ice تبدأ بصوت علة ← an." },
    { ar: "اختر الأداة: ___ house", en: "___ house", opts: ["a", "an", "the", "—"], answer: 0, why: "house تبدأ بصوت ساكن ← a." },
    { ar: "أكمل: I need ___ pencil.", en: "I need ___ pencil.", opts: ["a", "an", "the", "—"], answer: 0, why: "قلم غير محدد ومفرد ← a." },
    { ar: "أكمل: She is ___ artist.", en: "She is ___ artist.", opts: ["an", "a", "the", "—"], answer: 0, why: "artist تبدأ بصوت علة ← an." },
    { ar: "أذكر شيئًا لأول مرة: I bought ___ bike.", en: "I bought ___ bike.", opts: ["a", "an", "the", "—"], answer: 0, why: "أول ذكر لشيء غير محدد ← a." },
    { ar: "أتحدث عن نفس الدراجة: ___ bike is blue.", en: "___ bike is blue.", opts: ["The", "A", "An", "—"], answer: 0, why: "أصبحت معروفة للقارئ ← the." },
    { ar: "اختر الجملة الصحيحة:", opts: ["She is a teacher.", "She is teacher.", "She is an teacher.", "She a teacher."], answer: 0, why: "teacher اسم مفرد يبدأ بساكن ← a teacher." },
    { ar: "أكمل: ___ sun is hot.", en: "___ sun is hot.", opts: ["The", "A", "An", "—"], answer: 0, why: "الشمس شيء واحد معروف للجميع ← the." },
    { ar: "أكمل: They are ___ doctors.", en: "They are ___ doctors.", opts: ["—", "a", "an", "the"], answer: 0, why: "doctors جمع غير محدد ← بدون أداة." },
    { ar: "أكمل: He is ___ old friend.", en: "He is ___ old friend.", opts: ["an", "a", "the", "—"], answer: 0, why: "old تبدأ بصوت علة ← an." },
  ],

  // ---------------- الدرس 5 ----------------
  5: [
    { ar: "أي كلمة Adjective (صفة)؟", opts: ["quick", "run", "car", "swim"], answer: 0, why: "quick تصف شيئًا بأنه سريع — البقية أفعال وأسماء." },
    { ar: "أكمل: The soup is ___.", en: "The soup is ___.", opts: ["hot", "a hot", "hot is", "hots"], answer: 0, why: "hot صفة — لا تأخذ a ولا s." },
    { ar: "اختر الجملة الصحيحة:", opts: ["The girls are tall.", "The girls are talls.", "The girls is tall.", "The girls are a tall."], answer: 0, why: "الصفة لا تتغير مع الجمع أبدًا." },
    { ar: "أكمل: She is a ___ girl.", en: "She is a ___ girl.", opts: ["beautiful", "beauty", "beautifully", "beaut"], answer: 0, why: "قبل الاسم تأتي الصفة: a + beautiful + girl." },
    { ar: "أكمل: They are ___.", en: "They are ___.", opts: ["tired", "a tired", "tireds", "tired is"], answer: 0, why: "tired صفة بعد are مباشرة." },
    { ar: "ما عكس weak؟", en: "weak ↔ ?", opts: ["strong", "small", "slow", "sad"], answer: 0, why: "ضعيف ↔ قوي." },
    { ar: "ما نفي الجملة: He is strong.", en: "He is strong.", opts: ["He is not strong.", "He not is strong.", "He is no strong.", "He don't strong."], answer: 0, why: "not بعد is — والصفة تبقى كما هي." },
    { ar: "ما سؤال الجملة: They are busy.", en: "They are busy.", opts: ["Are they busy?", "They are busy?", "Do they busy?", "Is they busy?"], answer: 0, why: "نقلب are قبل they." },
    { ar: "اختر الترتيب الصحيح:", opts: ["a small cat", "a cat small", "small a cat", "cat a small"], answer: 0, why: "الصفة قبل الاسم: a + small + cat." },
    { ar: "أكمل: Mira is ___.", en: "Mira is ___.", opts: ["tall", "a tall", "talls", "tall is"], answer: 0, why: "tall صفة — بدون a." },
    { ar: "أي كلمة Noun (اسم)؟", opts: ["teacher", "happy", "fast", "red"], answer: 0, why: "teacher اسم شخص — البقية صفات." },
    { ar: "أكمل: It is ___.", en: "It is ___.", opts: ["cold", "a cold", "colds", "cold is"], answer: 0, why: "cold صفة بعد is مباشرة." },
  ],

  // ---------------- الدرس 6 ----------------
  6: [
    { ar: "أكمل: She ___ to work by bus.", en: "She ___ to work by bus.", opts: ["goes", "go", "going", "goed"], answer: 0, why: "She ← + es لأن الفعل ينتهي بـ o." },
    { ar: "أكمل: They ___ dinner at seven.", en: "They ___ dinner at seven.", opts: ["eat", "eats", "eating", "eates"], answer: 0, why: "They من المجموعة الأولى ← الفعل بدون إضافة." },
    { ar: "أكمل: He ___ his teeth twice a day.", en: "He ___ his teeth twice a day.", opts: ["brushes", "brush", "brushs", "brushing"], answer: 0, why: "ينتهي بـ sh ← + es." },
    { ar: "أكمل: Sara ___ her homework after lunch.", en: "Sara ___ her homework after lunch.", opts: ["does", "do", "doe", "doing"], answer: 0, why: "Sara = She ← does." },
    { ar: "أكمل: The cat ___ milk.", en: "The cat ___ milk.", opts: ["drinks", "drink", "drinkes", "drinking"], answer: 0, why: "The cat = It ← + s." },
    { ar: "أكمل: We ___ football on Sundays.", en: "We ___ football on Sundays.", opts: ["play", "plays", "playing", "plaies"], answer: 0, why: "We ← الفعل الأساسي بدون s." },
    { ar: "أكمل: My father ___ in a bank.", en: "My father ___ in a bank.", opts: ["works", "work", "working", "workes"], answer: 0, why: "My father = He ← + s." },
    { ar: "أكمل: Liam ___ English every day.", en: "Liam ___ English every day.", opts: ["studies", "study", "studys", "studying"], answer: 0, why: "ساكن + y ← ies." },
    { ar: "أكمل: Birds ___ in spring.", en: "Birds ___ in spring.", opts: ["fly", "flies", "flying", "flys"], answer: 0, why: "Birds جمع (They) ← الفعل بدون s رغم أن المفرد يأخذ ies." },
    { ar: "أكمل: She ___ TV in the evening.", en: "She ___ TV in the evening.", opts: ["watches", "watch", "watchs", "watching"], answer: 0, why: "ينتهي بـ ch ← + es." },
    { ar: "أكمل (حقيقة عامة): Water ___ at 100°C.", en: "Water ___ at 100°C.", opts: ["boils", "boil", "boiles", "boiling"], answer: 0, why: "Water = It ← + s." },
    { ar: "أكمل: He ___ to school.", en: "He ___ to school.", opts: ["goes", "go", "gos", "going"], answer: 0, why: "go الشاذة ← goes." },
  ],

  // ---------------- الدرس 7 ----------------
  7: [
    { ar: "أكمل السؤال: ___ you live here?", en: "___ you live here?", opts: ["Do", "Does", "Is", "Are"], answer: 0, why: "مع you نستخدم Do." },
    { ar: "أكمل السؤال: ___ she work here?", en: "___ she work here?", opts: ["Does", "Do", "Is", "Are"], answer: 0, why: "مع she نستخدم Does." },
    { ar: "أكمل: He ___ like tea.", en: "He ___ like tea.", opts: ["doesn't", "don't", "isn't", "not"], answer: 0, why: "مع He نستخدم doesn't." },
    { ar: "أكمل: They ___ eat meat.", en: "They ___ eat meat.", opts: ["don't", "doesn't", "aren't", "not"], answer: 0, why: "مع They نستخدم don't." },
    { ar: "اختر الجملة الصحيحة:", opts: ["He doesn't play.", "He doesn't plays.", "He don't play.", "He doesn't playing."], answer: 0, why: "بعد doesn't يعود الفعل لشكله الأساسي." },
    { ar: "أكمل: Does he ___ football?", en: "Does he ___ football?", opts: ["play", "plays", "playing", "played"], answer: 0, why: "بعد Does الفعل أساسي بدون s." },
    { ar: "أجب بـ Yes عن: Do they swim?", en: "Do they swim?", opts: ["Yes, they do.", "Yes, they does.", "Yes, they swim.", "Yes, they are."], answer: 0, why: "السؤال بـ Do ← الجواب بـ do." },
    { ar: "أجب بـ No عن: Does she drive?", en: "Does she drive?", opts: ["No, she doesn't.", "No, she don't.", "No, she drivesn't.", "No, she isn't."], answer: 0, why: "السؤال بـ Does ← الجواب بـ doesn't." },
    { ar: "صحح: Do he like pizza?", en: "Do he like pizza?", opts: ["Does he like pizza?", "Do he likes pizza?", "Does he likes pizza?", "Is he like pizza?"], answer: 0, why: "مع he نستخدم Does + الفعل الأساسي." },
    { ar: "أكمل: She ___ watch TV.", en: "She ___ watch TV.", opts: ["doesn't", "don't", "isn't", "does"], answer: 0, why: "مع She نستخدم doesn't." },
    { ar: "أكمل السؤال: ___ they need help?", en: "___ they need help?", opts: ["Do", "Does", "Is", "Are"], answer: 0, why: "مع they نستخدم Do." },
    { ar: "أكمل: I ___ smoke.", en: "I ___ smoke.", opts: ["don't", "doesn't", "amn't", "not"], answer: 0, why: "مع I نستخدم don't." },
  ],

  // ---------------- الدرس 8 ----------------
  8: [
    { ar: "أكمل: Maya ___ before bed.", en: "Maya ___ before bed.", opts: ["reads", "read", "reading", "reades"], answer: 0, why: "Maya = She ← + s." },
    { ar: "أكمل السؤال: ___ your brothers play football?", en: "___ your brothers play football?", opts: ["Do", "Does", "Is", "Are"], answer: 0, why: "brothers جمع ← Do." },
    { ar: "أكمل: He ___ chess every Tuesday.", en: "He ___ chess every Tuesday.", opts: ["plays", "play", "playing", "plaies"], answer: 0, why: "قبل y حرف علة ← + s فقط." },
    { ar: "اختر الصحيح: She ___ horror movies.", en: "She ___ horror movies.", opts: ["doesn't watch", "doesn't watches", "don't watch", "doesn't watching"], answer: 0, why: "بعد doesn't الفعل أساسي." },
    { ar: "أكمل: I wear these shoes ___.", en: "I wear these shoes ___.", opts: ["every day", "everyday", "each days", "all day"], answer: 0, why: "كل يوم (عبارة زمنية) = كلمتان: every day." },
    { ar: "أكمل: These are my ___ shoes.", en: "These are my ___ shoes.", opts: ["everyday", "every day", "each day", "every days"], answer: 0, why: "صفة بمعنى (يومية) = كلمة واحدة: everyday." },
    { ar: "رتّب: usually / she / visits / the library", opts: ["She usually visits the library.", "She visits usually the library.", "Usually she the library visits.", "She usually the library visits."], answer: 0, why: "كلمة التكرار قبل الفعل: She + usually + visits." },
    { ar: "اختر الجملة الصحيحة:", opts: ["He never eats breakfast.", "He never doesn't eat breakfast.", "He doesn't never eat breakfast.", "He doesn't eats breakfast never."], answer: 0, why: "never وحدها تكفي — لا تجتمع مع doesn't." },
    { ar: "أكمل: The baby ___ every night.", en: "The baby ___ every night.", opts: ["cries", "cry", "crys", "crying"], answer: 0, why: "ساكن + y ← ies." },
    { ar: "أكمل السؤال: Does Lina ___ every evening?", en: "Does Lina ___ every evening?", opts: ["study", "studies", "studying", "studys"], answer: 0, why: "بعد Does الفعل أساسي بدون s." },
    { ar: "أكمل: My parents ___ shopping on Sundays.", en: "My parents ___ shopping on Sundays.", opts: ["go", "goes", "going", "gos"], answer: 0, why: "parents جمع (They) ← الفعل الأساسي." },
    { ar: "أكمل: I ___ understand this.", en: "I ___ understand this.", opts: ["don't", "doesn't", "amn't", "not"], answer: 0, why: "مع I نستخدم don't." },
  ],

  // ---------------- الدرس 10 ----------------
  10: [
    { ar: "أكمل: I ___ tired yesterday.", en: "I ___ tired yesterday.", opts: ["was", "were", "am", "is"], answer: 0, why: "مع I في الماضي نستخدم was." },
    { ar: "أكمل: They ___ at home last night.", en: "They ___ at home last night.", opts: ["were", "was", "are", "is"], answer: 0, why: "They جمع ← were." },
    { ar: "أكمل: She ___ football yesterday.", en: "She ___ football yesterday.", opts: ["played", "play", "playing", "plays"], answer: 0, why: "أمس ← ماضي: played." },
    { ar: "أكمل: He ___ pizza last night.", en: "He ___ pizza last night.", opts: ["ate", "eated", "eat", "eating"], answer: 0, why: "eat شاذ: ate." },
    { ar: "اختر صيغة الماضي للفعل study:", opts: ["studied", "studyed", "studys"], answer: 0, why: "ساكن + y ← ied: studied." },
    { ar: "اختر صيغة الماضي للفعل stop:", opts: ["stopped", "stoped", "stoppped"], answer: 0, why: "مقطع واحد + ساكن بعد علة ← نضاعف p: stopped." },
    { ar: "ما نفي الجملة: He played football.", en: "He played football.", opts: ["He didn't play football.", "He didn't played football.", "He wasn't play football.", "He don't play football."], answer: 0, why: "بعد didn't الفعل يعود أساسي: play." },
    { ar: "ما سؤال الجملة: She visited Paris.", en: "She visited Paris.", opts: ["Did she visit Paris?", "Did she visited Paris?", "Was she visit Paris?", "Does she visit Paris?"], answer: 0, why: "Did تحمل الماضي — الفعل أساسي: visit." },
    { ar: "أجب بـ Yes عن: Did you see him?", en: "Did you see him?", opts: ["Yes, I did.", "Yes, I was.", "Yes, I do.", "Yes, I am."], answer: 0, why: "السؤال بـ Did ← الجواب بـ did." },
    { ar: "اختر الكلمة الدالة على الماضي:", opts: ["yesterday", "every day", "usually", "always"], answer: 0, why: "yesterday تعني أمس — انتهى." },
    { ar: "أي جملة صحيحة؟", opts: ["I went to school yesterday.", "I goed to school yesterday.", "I go to school yesterday.", "I going to school yesterday."], answer: 0, why: "go شاذ: went." },
    { ar: "صحح الخطأ: He didn't went to school.", en: "He didn't went to school.", opts: ["He didn't go to school.", "He didn't goed to school.", "He wasn't go to school.", "He didn't goes to school."], answer: 0, why: "بعد didn't الفعل أساسي: go." },
  ],

  // ---------------- الدرس 9 ----------------
  9: [
    { ar: "أكمل: I ___ watching a movie.", en: "I ___ watching a movie.", opts: ["am", "is", "are", "be"], answer: 0, why: "مع I نستخدم am دائمًا." },
    { ar: "أكمل: They ___ playing basketball.", en: "They ___ playing basketball.", opts: ["are", "is", "am", "be"], answer: 0, why: "They جمع ← are." },
    { ar: "أكمل: She ___ singing a song.", en: "She ___ singing a song.", opts: ["is", "are", "am", "be"], answer: 0, why: "She مفرد غائب ← is." },
    { ar: "اختر صيغة ing الصحيحة للفعل write:", opts: ["writing", "writeing", "writting"], answer: 0, why: "نحذف e الصامتة ثم نضيف ing." },
    { ar: "اختر صيغة ing الصحيحة للفعل swim:", opts: ["swimming", "swiming", "swimeing"], answer: 0, why: "مقطع واحد + ساكن بعد علة ← نضاعف الحرف m." },
    { ar: "اختر صيغة ing الصحيحة للفعل watch:", opts: ["watching", "watchhing", "watcheing"], answer: 0, why: "نضيف ing مباشرة بدون تغيير." },
    { ar: "ما نفي الجملة: He is sleeping.", en: "He is sleeping.", opts: ["He is not sleeping.", "He not is sleeping.", "He don't sleeping.", "He isn't not sleeping."], answer: 0, why: "not تأتي بعد is مباشرة." },
    { ar: "ما سؤال الجملة: They are studying.", en: "They are studying.", opts: ["Are they studying?", "They are studying?", "Do they studying?", "Is they studying?"], answer: 0, why: "نقلب are إلى بداية الجملة." },
    { ar: "أجب بـ Yes عن: Is she cooking?", en: "Is she cooking?", opts: ["Yes, she is.", "Yes, she are.", "Yes, she does.", "Yes, she am."], answer: 0, why: "السؤال بـ Is ← الجواب بـ is." },
    { ar: "اختر الكلمة الدالة على الآن:", opts: ["right now", "every day", "usually", "always"], answer: 0, why: "right now تعني في هذه اللحظة بالذات." },
    { ar: "أي جملة صحيحة؟", opts: ["Look! He is running.", "Look! He run.", "Look! He running.", "Look! He runs now."], answer: 0, why: "بعد Look! نستخدم Present Continuous كاملًا: is + verb-ing." },
    { ar: "صحح الخطأ: We not are playing.", en: "We not are playing.", opts: ["We are not playing.", "We not playing are.", "We aren't not playing.", "We not is playing."], answer: 0, why: "not تأتي بعد فعل الكينونة are وليس قبله." },
  ],
};
