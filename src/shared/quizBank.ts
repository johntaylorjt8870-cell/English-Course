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
    { ar: "أكمل: Sara _______ Japanese this year. (حدث خلال هذه الفترة)", en: "Sara _______ Japanese this year.", opts: ["is learning", "learns", "learning", "is learn"], answer: 0, why: "this year = فترة حالية → Present Continuous: is learning." },
    { ar: "أكمل: Nabil usually lives in Cairo, but he _______ in Alexandria this week. (مؤقت)", en: "he _______ in Alexandria this week.", opts: ["is staying", "stays", "stay", "is stay"], answer: 0, why: "this week مؤقت → is staying، بينما usually lives = عادة Simple." },
    { ar: "أي جملة تعبر عن الآن وليس العادة؟", opts: ["My brother is playing the piano.", "My brother plays the piano.", "My brother play the piano.", "My brother playing piano."], answer: 0, why: "is playing = يحدث الآن، plays = معلومة عامة/عادة." },
    { ar: "اختر الجملة الصحيحة مع today (سياق مؤقت):", opts: ["I am studying English today.", "Today is Monday.", "I study English today."], answer: 0, why: "I am studying today = نشاط خلال اليوم الحالي (Continuous). Today is Monday ليست Continuous أصلًا." },
    { ar: "أكمل: We _______ for the competition this week.", en: "We _______ for the competition this week.", opts: ["are preparing", "prepare", "is preparing", "prepares"], answer: 0, why: "this week كمؤقت → are preparing." },
    { ar: "أين الخطأ؟ She is writeing a message.", en: "She is writeing a message.", opts: ["She is writing a message.", "She is write a message.", "She is writting a message."], answer: 0, why: "write → writing (احذف e)." },
    { ar: "أين الخطأ؟ They are runing in the street.", en: "They are runing in the street.", opts: ["They are running in the street.", "They are run in street.", "They is running."], answer: 0, why: "run → running (مضاعفة n)." },
    { ar: "أكمل النفي: She is watching television. → She _______ watching television.", en: "She _______ watching television.", opts: ["isn't", "doesn't", "don't", "not is"], answer: 0, why: "نفي Continuous: isn't + verb-ing، وليس doesn't." },
    { ar: "ما السؤال الصحيح؟ She is reading.", en: "She is reading.", opts: ["Is she reading?", "Does she reading?", "Is she read?", "Does she read?"], answer: 0, why: "نقلب is: Is she reading? لا نستخدم Does مع ing." },
    { ar: "اختر سؤال Wh الصحيح:", opts: ["What is she studying?", "What she is studying?", "What does she studying?", "What is she study?"], answer: 0, why: "Wh + am/is/are + subject + verb-ing: What is she studying?" },
    { ar: "أي جملة صحيحة مع الأفعال الحالة؟", opts: ["I know the answer.", "I am knowing the answer.", "I am know the answer.", "I knows the answer."], answer: 0, why: "know فعل حالة لا يُستخدم مع Continuous — الصحيح I know." },
    { ar: "قارن: I think you are right. vs I am thinking about the problem. ما الفرق؟", opts: ["think = رأي (Simple) / thinking = عملية الآن (Continuous)", "كلاهما نفس المعنى", "الأولى خطأ", "الثانية خطأ"], answer: 0, why: "think كرأي = Simple، thinking كعملية ذهنية الآن = Continuous — حسب المعنى." },
  ],

  // ---------------- الدرس 11 ----------------
  11: [
    { ar: "أكمل: Every morning, Salma _______ her bicycle. (عادة)", en: "Every morning, Salma _______ her bicycle.", opts: ["checks", "is checking", "check", "checking"], answer: 0, why: "Every morning عادة → Present Simple: checks (She → +s)." },
    { ar: "أكمل: Look! Salma _______ her bicycle. (الآن)", en: "Look! Salma _______ her bicycle.", opts: ["is checking", "checks", "check", "checking"], answer: 0, why: "Look! الآن → Present Continuous: is checking." },
    { ar: "أكمل: My parents _______ in a quiet neighborhood. (وضع مستقر)", en: "My parents _______ in a quiet neighborhood.", opts: ["live", "are living", "lives", "is living"], answer: 0, why: "وضع مستقر/حقيقة → Simple: live." },
    { ar: "أكمل: This month, my parents _______ in a hotel. (مؤقت)", en: "This month, my parents _______ in a hotel.", opts: ["are living", "live", "lives", "is living"], answer: 0, why: "This month مؤقت → Continuous: are living." },
    { ar: "أكمل: The Earth _______ around the Sun. (حقيقة عامة)", en: "The Earth _______ around the Sun.", opts: ["moves", "is moving", "move", "moving"], answer: 0, why: "حقيقة عامة → Simple: moves." },
    { ar: "أكمل: He _______ coffee every morning. (عادة)", en: "He _______ coffee every morning.", opts: ["drinks", "is drinking", "drink", "drinking"], answer: 0, why: "every morning عادة → drinks." },
    { ar: "أكمل: He _______ coffee right now.", en: "He _______ coffee right now.", opts: ["is drinking", "drinks", "drink", "drinking"], answer: 0, why: "right now الآن → is drinking." },
    { ar: "ما الصحيح؟", en: "He is plays football.", opts: ["He plays football.", "He is plays football.", "He playing football.", "He play football."], answer: 0, why: "لا نخلط is + plays — إما plays (Simple) أو is playing (Continuous)." },
    { ar: "ما نفي الجملة: She is painting a landscape.", en: "She is painting a landscape.", opts: ["She isn't painting a landscape.", "She doesn't painting a landscape.", "She doesn't paint a landscape.", "She not is painting."], answer: 0, why: "نفي Continuous: isn't + verb-ing." },
    { ar: "ما سؤال الجملة: She studies French.", en: "She studies French.", opts: ["Does she study French?", "Is she study French?", "Does she studies French?", "Is she studying French?"], answer: 0, why: "Simple مع فعل عادي → Does + base verb." },
    { ar: "اختر الصحيح مع الأفعال الحالة:", en: "I _______ the answer.", opts: ["know", "am knowing", "knowing", "knows"], answer: 0, why: "know فعل حالة → Simple: I know." },
    { ar: "قارن: I think this movie is great. vs I am thinking about my future. ما الفرق؟", opts: ["think = رأي (Simple) / thinking = عملية الآن (Continuous)", "كلاهما نفس المعنى", "الأولى خطأ", "الثانية خطأ"], answer: 0, why: "think كرأي = Simple، thinking كعملية ذهنية الآن = Continuous — المعنى هو الحكم." },
  ],

  // ---------------- الدرس 12 ----------------
  12: [
    { ar: "أكمل: I _______ the museum yesterday.", en: "I _______ the museum yesterday.", opts: ["visited", "visit", "visits", "am visiting"], answer: 0, why: "yesterday يدل على الماضي → زرنا: visited، والماضي لا يأخذ s." },
    { ar: "أكمل: She _______ a new phone last week.", en: "She _______ a new phone last week.", opts: ["bought", "buyed", "buys", "buy"], answer: 0, why: "buy فعل غير منتظم → bought، ولا نقول buyed." },
    { ar: "اختر صيغة الماضي الصحيحة للفعل study:", opts: ["studied", "studyed", "studed", "studyied"], answer: 0, why: "consonant + y: نحوّل y إلى i ثم نضيف ed → studied." },
    { ar: "اختر صيغة الماضي الصحيحة للفعل live:", opts: ["lived", "liveed", "livd", "livved"], answer: 0, why: "الفعل ينتهي أصلًا بـ e → نضيف d فقط: lived." },
    { ar: "أي كلمة تدل على الماضي؟", opts: ["two days ago", "every day", "now", "usually"], answer: 0, why: "two days ago (منذ يومين) كلمة دالة على Past Simple." },
    { ar: "أكمل: They _______ pizza last night.", en: "They _______ pizza last night.", opts: ["ate", "eated", "eat", "eats"], answer: 0, why: "eat فعل غير منتظم → ate، ولا نقول eated." },
    { ar: "أي جملة صحيحة؟", opts: ["He played football yesterday.", "He playeds football yesterday.", "He plays football yesterday.", "He is played football yesterday."], answer: 0, why: "yesterday ماضٍ → played بدون s وبدون is: He played football yesterday." },
    { ar: "أكمل: The bus _______ near the school. (stop)", en: "The bus _______ near the school.", opts: ["stopped", "stoped", "stopt", "stopied"], answer: 0, why: "فعل قصير → نضاعف الحرف الأخير p ثم نضيف ed: stopped." },
    { ar: "أكمل: We _______ to the zoo last Friday.", en: "We _______ to the zoo last Friday.", opts: ["went", "goed", "go", "goes"], answer: 0, why: "go فعل غير منتظم → went، ولا نقول goed." },
    { ar: "اختر الترتيب الصحيح لعبارة (منذ يومين):", opts: ["two days ago", "ago two days", "two ago days", "days two ago"], answer: 0, why: "ago تأتي بعد المدة: two days ago وليس ago two days." },
    { ar: "أي فعل من الأفعال التالية غير منتظم (Irregular)؟", opts: ["went", "played", "opened", "cleaned"], answer: 0, why: "went هو ماضي go غير المنتظم؛ البقية منتظمة بإضافة ed." },
    { ar: "أكمل: Yesterday, I _______ a great book.", en: "Yesterday, I _______ a great book.", opts: ["read", "readed", "red", "reads"], answer: 0, why: "read تكتب كما هي في الماضي (لكن نطقها يتغير رِد) — لا نضيف ed." },
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

  // ---------------- الدرس 13 ----------------
  13: [
    { ar: "ما النفي الصحيح للجملة: She went to the library.", en: "She went to the library.", opts: ["She didn't go to the library.", "She didn't went to the library.", "She doesn't go to the library.", "She not went to the library."], answer: 0, why: "بعد didn't يعود الفعل إلى شكله الأساسي → didn't go، وليس didn't went." },
    { ar: "اختر السؤال الصحيح:", en: "He bought a telescope.", opts: ["Did he buy a telescope?", "Did he bought a telescope?", "Did he buys a telescope?", "Does he bought a telescope?"], answer: 0, why: "السؤال: Did + Subject + Base Verb? → Did he buy ...?" },
    { ar: "أكمل: Did she _______ the door?", en: "Did she _______ the door?", opts: ["open", "opened", "opens", "opening"], answer: 0, why: "بعد Did نستخدم الفعل الأساسي: open — والماضي عند Did." },
    { ar: "ما الإجابة القصيرة الصحيحة بـ Yes للسؤال: Did you finish your homework?", en: "Did you finish your homework?", opts: ["Yes, I did.", "Yes, I finished.", "Yes, I do.", "Yes, I was."], answer: 0, why: "الإجابة القصيرة: Yes, subject + did → Yes, I did." },
    { ar: "اختر النفي الصحيح للجملة: I visited the castle.", en: "I visited the castle.", opts: ["I didn't visit the castle.", "I didn't visited the castle.", "I don't visited the castle.", "I not visit the castle."], answer: 0, why: "النفي: Subject + didn't + Base Verb → didn't visit." },
    { ar: "أكمل: They _______ not finish the race.", en: "They _______ not finish the race.", opts: ["did", "do", "does", "are"], answer: 0, why: "في الماضي: did not = didn't → They did not finish the race." },
    { ar: "أكمل سؤال Wh: Where did they _______?", en: "Where did they _______?", opts: ["go", "went", "goes", "going"], answer: 0, why: "Wh-word + did + Subject + Base Verb → Where did they go?" },
    { ar: "ما الصحيح بدلًا من: Did he be tired?", en: "Did he be tired?", opts: ["Was he tired?", "Did he be tired?", "Did he tired?", "Was he be tired?"], answer: 0, why: "لا نخلط did مع Verb to be — مع was/were نقول: Was he tired?" },
    { ar: "أكمل: I _______ my homework yesterday. (فعل أساسي بمعنى أنجزت)", en: "I _______ my homework yesterday.", opts: ["did", "do", "does", "done"], answer: 0, why: "هنا did فعل أساسي في الماضي بمعنى (أنجزت) — وليست أداة سؤال." },
    { ar: "أكمل: Did you _______ your homework?", en: "Did you _______ your homework?", opts: ["do", "did", "does", "done"], answer: 0, why: "بعد Did المساعدة يأتي الفعل الأساسي do: Did you do ...?" },
    { ar: "ما الإجابة القصيرة الصحيحة بـ No للسؤال: Did she call you?", en: "Did she call you?", opts: ["No, she didn't.", "No, she did.", "No, she doesn't.", "No, she wasn't."], answer: 0, why: "الإجابة القصيرة: No, subject + didn't → No, she didn't." },
    { ar: "أي جملة صحيحة؟", opts: ["She didn't see the message.", "She didn't saw the message.", "She not saw the message.", "She doesn't saw the message."], answer: 0, why: "بعد didn't يأتي الفعل الأساسي see — لا نستخدم saw بعد did / didn't." },
  ],

  // ---------------- الدرس 15 ----------------
  15: [
    { ar: "أكمل: I ___ tired yesterday.", en: "I ___ tired yesterday.", opts: ["was", "were", "did", "are"], answer: 0, why: "I مفرد → was. لا نستخدم did مع الصفات." },
    { ar: "أكمل: They ___ excited about the trip.", en: "They ___ excited about the trip.", opts: ["were", "was", "did", "are"], answer: 0, why: "They جمع → were. excited صفة." },
    { ar: "ما النفي الصحيح: She was at home.", en: "She was at home.", opts: ["She wasn't at home.", "She didn't was at home.", "She didn't be at home.", "She wasn't at home not."], answer: 0, why: "نفي was/were: wasn't / weren't — لا نستخدم didn't مع was/were." },
    { ar: "ما السؤال الصحيح: He was nervous.", en: "He was nervous.", opts: ["Was he nervous?", "Did he be nervous?", "Did he nervous?", "Was he be nervous?"], answer: 0, why: "سؤال was/were: Was/Were + Subject. لا نستخدم did." },
    { ar: "أجب بـ Yes عن: Were you busy?", en: "Were you busy?", opts: ["Yes, I was.", "Yes, I were.", "Yes, you were.", "Yes, I did."], answer: 0, why: "Were you...? الإجابة: Yes, I was. الضمير يتحول إلى I و was للمفرد." },
    { ar: "اختر الجملة الصحيحة:", opts: ["He wasn't tired.", "He didn't was tired.", "He didn't were tired.", "He wasn't tireded."], answer: 0, why: "النفي الصحيح: wasn't / weren't. لا نقول didn't was." },
    { ar: "اختر الصحيح: ___ he tired? (تعبير عن حالة)", en: "___ he tired?", opts: ["Was", "Did", "Were", "Do"], answer: 0, why: "tired صفة → نستخدم Was، ليس Did. Did للفعل العادي." },
    { ar: "اختر الصحيح: ___ he visit the castle? (فعل عادي)", en: "___ he visit the castle?", opts: ["Did", "Was", "Were", "Is"], answer: 0, why: "visit فعل عادي → نستخدم Did. Was/Were للصفات والأماكن." },
    { ar: "ما نوع الجملة: She was happy.", en: "She was happy.", opts: ["Verb to be + Adjective", "ordinary verb", "Present Simple", "Present Continuous"], answer: 0, why: "was = Verb to be و happy = Adjective — نصف حالة، ليس فعل حدث." },
    { ar: "أكمل سؤال Wh: Where ___ she yesterday?", en: "Where ___ she yesterday?", opts: ["was", "were", "did", "is"], answer: 0, why: "Where + was/were + Subject للسؤال عن المكان مع Verb to be." },
    { ar: "أكمل: What ___ the problem?", en: "What ___ the problem?", opts: ["was", "were", "did", "are"], answer: 0, why: "What + was/were للسؤال عن المشكلة — problem مفرد → was." },
    { ar: "أكمل: He ___ a student last year.", en: "He ___ a student last year.", opts: ["was", "were", "did", "is"], answer: 0, why: "a student اسم مفرد → was. نحتاج a لأن الاسم مفرد معدود." },
  ],

  // ---------------- الدرس 14 ----------------
  14: [
    { ar: "أكمل سؤال Wh: Where did Ali _______?", en: "Where did Ali _______?", opts: ["go", "went", "goes", "going"], answer: 0, why: "بعد Wh-word + did يأتي الفعل الأساسي: Where did Ali go?" },
    { ar: "اختر السؤال الصحيح عن الشيء الذي اشترته سارة:", en: "She bought a telescope.", opts: ["What did she buy?", "What did she bought?", "Where did she buy?", "What she did buy?"], answer: 0, why: "What يسأل عن الشيء، وبعد did نستخدم buy لا bought." },
    { ar: "اختر السؤال الصحيح عن المكان:", en: "Nora went to the library.", opts: ["Where did Nora go?", "Where did Nora went?", "When did Nora go?", "Where Nora did go?"], answer: 0, why: "Where للمكان، وتركيب السؤال: Where + did + Nora + go." },
    { ar: "أكمل: When did Lina _______?", en: "When did Lina _______?", opts: ["arrive", "arrived", "arrives", "arriving"], answer: 0, why: "When للوقت، وبعد did يأتي Base Verb: arrive." },
    { ar: "أكمل: Why did they _______ the experiment?", en: "Why did they _______ the experiment?", opts: ["stop", "stopped", "stops", "stopping"], answer: 0, why: "Why للسبب، وبعد did نستخدم stop." },
    { ar: "أكمل: How did she _______ the puzzle?", en: "How did she _______ the puzzle?", opts: ["solve", "solved", "solves", "solving"], answer: 0, why: "How للطريقة، وبعد did نستخدم الفعل الأساسي solve." },
    { ar: "أي جملة تفرق بين Who كفاعل وWho كمفعول به بشكل صحيح؟", opts: ["Who visited the museum? / Who did Emma visit?", "Who did visited the museum? / Who Emma visit?", "Who visited the museum? / Who Emma did visit?", "Who did Emma visited? / Who visit Emma?"], answer: 0, why: "Who كفاعل لا يحتاج did، وWho كمفعول به يحتاج did." },
    { ar: "ما الإجابة القصيرة الصحيحة للسؤال: Did you travel?", en: "Did you travel?", opts: ["Yes, I did.", "Yes, I traveled.", "Yes, I do.", "Yes, I went."], answer: 0, why: "الإجابة القصيرة لسؤال Yes/No بـ Did هي Yes, subject + did." },
    { ar: "ما الإجابة الكاملة الصحيحة؟", en: "Where did Noah travel?", opts: ["Noah traveled to Canada.", "Noah did travel to Canada.", "Noah travel to Canada.", "Noah traveled Canada?"], answer: 0, why: "في الإجابة العادية لا نكرر did؛ يعود الفعل إلى الماضي: traveled." },
    { ar: "اختر المجموعة التي تعرض الأشكال الأربعة الصحيحة للفعل go:", opts: ["went / didn't go / Did she go? / Where did she go?", "go / didn't went / Did she went? / Where she did go?", "went / didn't went / Did she go? / Where did she went?", "go / didn't go / Did she went? / Where went she?"], answer: 0, why: "الماضي في المثبت went، وبعد did أو didn't يعود الفعل إلى go." },
    { ar: "أكمل: What did Omar _______?", en: "What did Omar _______?", opts: ["write", "wrote", "writes", "writing"], answer: 0, why: "بعد did نستخدم write، حتى لو كان الماضي الشاذ wrote." },
    { ar: "اختر السؤال الصحيح عن الزمن في جملة: They arrived at 7:30.", en: "They arrived at 7:30.", opts: ["When did they arrive?", "When did they arrived?", "Where did they arrive?", "When they did arrive?"], answer: 0, why: "When للسؤال عن الوقت، وبعد did نستخدم arrive." },
  ],

  // ---------------- الدرس 16 ----------------
  16: [
    { ar: "أكمل: I have a book. This is ______ book.", en: "This is ______ book.", opts: ["my", "his", "her", "their"], answer: 0, why: "I → my. صفة الملكية تعتمد على صاحب الشيء." },
    { ar: "أكمل: Sara has a bag. ______ bag is new.", en: "______ bag is new.", opts: ["Her", "His", "Its", "Their"], answer: 0, why: "Sara → She → her. صفة الملكية تتبع صاحب الشيء." },
    { ar: "أكمل: Omar has a bicycle. ______ bicycle is fast.", en: "______ bicycle is fast.", opts: ["His", "Her", "Its", "Our"], answer: 0, why: "Omar → He → his." },
    { ar: "أكمل: The cat lost ______ toy.", en: "The cat lost ______ toy.", opts: ["its", "his", "her", "their"], answer: 0, why: "The cat → It → its. غير عاقل مفرد." },
    { ar: "أكمل: We have a teacher. ______ teacher is kind.", en: "______ teacher is kind.", opts: ["Our", "Their", "My", "Your"], answer: 0, why: "We → our. نحن → خاص بنا." },
    { ar: "أكمل: They have a house. ______ house is big.", en: "______ house is big.", opts: ["Their", "Our", "His", "Her"], answer: 0, why: "They → their. هم → خاص بهم." },
    { ar: "ما الفرق بين its و it's؟", opts: ["its = ملكية | it's = it is", "its = it is | it's = ملكية", "لا يوجد فرق", "its للمفرد و it's للجمع"], answer: 0, why: "its = ملكية (بدون فاصلة عليا). it's = اختصار it is." },
    { ar: "أكمل: Sara has a brother. ______ brother is 10.", en: "______ brother is 10.", opts: ["Her", "His", "Its", "Their"], answer: 0, why: "صاحب الأخ هو Sara (She) → her. حتى لو كان brother ذكراً، الملكية تتبع صاحب الشيء." },
    { ar: "أكمل: Ali and Omar have a project. ______ project is difficult.", en: "______ project is difficult.", opts: ["Their", "Our", "His", "Her"], answer: 0, why: "Ali and Omar → They → their. أكثر من شخص → their." },
    { ar: "صحح الخطأ: I have a dog. His dog is friendly.", en: "I have a dog. His dog is friendly.", opts: ["I have a dog. My dog is friendly.", "I have a dog. Her dog is friendly.", "I have a dog. Their dog is friendly.", "الجملة صحيحة."], answer: 0, why: "صاحب الكلب أنا (I) → my وليس his." },
    { ar: "أكمل: This is my book. ولكن: This book is _____.", en: "This book is _____.", opts: ["mine", "my", "me", "I"], answer: 0, why: "my + noun (my book) لكن mine وحدها بدون اسم بعدها. هذا تمهيد للدرس 17." },
    { ar: "أكمل: Ahmed's car يمكن تحويلها إلى:", en: "Ahmed's car = ______ car", opts: ["His", "Her", "Its", "Their"], answer: 0, why: "Ahmed → He → his. اسم + 's يمكن تحويلها إلى صفة ملكية." },
  ],

  // ---------------- الدرس 17 ----------------
  17: [
    { ar: "أكمل: This is ______ book.", en: "This is ______ book.", opts: ["mine", "my", "me", "I"], answer: 1, why: "my + Noun ← قبل الاسم نستخدم my، وليس mine." },
    { ar: "أكمل: This book is ______.", en: "This book is ______.", opts: ["my", "me", "mine", "I"], answer: 2, why: "لا يوجد اسم بعدها ← ضمير الملكية mine وحدها." },
    { ar: "أكمل: That jacket is ______.", en: "That jacket is ______.", opts: ["your", "you're", "yours", "you"], answer: 2, why: "بدون اسم بعدها ← yours. أما your فتحتاج اسماً بعدها." },
    { ar: "أكمل: This is ______ camera.", en: "This is ______ camera.", opts: ["hers", "her", "she", "him"], answer: 1, why: "بعدها اسم (camera) ← صفة الملكية her." },
    { ar: "أكمل: These books are ______.", en: "These books are ______.", opts: ["ours", "our", "us", "we"], answer: 0, why: "بدون اسم بعدها ← ours." },
    { ar: "أكمل: That house is ______.", en: "That house is ______.", opts: ["their", "they're", "theirs", "them"], answer: 2, why: "بدون اسم بعدها ← theirs. their تحتاج اسماً بعدها." },
    { ar: "أي جملة فيها his كضمير ملكية (Possessive Pronoun)؟", opts: ["His car is fast.", "The car is his.", "This is his laptop.", "His laptop is new."], answer: 1, why: "في The car is his لا يوجد اسم بعد his ← ضمير ملكية. أما His car فصفة ملكية." },
    { ar: "اختر الجملة الصحيحة:", opts: ["This is my notebook.", "This is mine notebook.", "This notebook is my.", "This is my."], answer: 0, why: "mine لا تأتي قبل اسم، و my لا تقف وحدها بدون اسم." },
    { ar: "أي جملة خاطئة؟", opts: ["The bag is hers.", "This bag is hers.", "This is hers bag.", "Her bag is new."], answer: 2, why: "hers ضمير ملكية ولا يأتي قبل اسم — الصحيح: This is her bag." },
    { ar: "Whose bag is this? — It belongs to Sara. أكمل: It's ______.", en: "Whose bag is this? — It belongs to Sara. It's ______.", opts: ["she", "her", "hers", "herself"], answer: 2, why: "Sara → She → hers. بعد حذف الاسم نستخدم ضمير الملكية." },
    { ar: "أكمل: ______ happy today.", en: "______ happy today.", opts: ["Your", "Yours", "You're", "You"], answer: 2, why: "you're = you are ← ليست ملكية. your للملكية و yours ضمير ملكية." },
    { ar: "أكمل: ______ house is large.", en: "______ house is large.", opts: ["They're", "Theirs", "Their", "Them"], answer: 2, why: "بعدها اسم (house) ← صفة الملكية their. they're = they are و theirs وحدها." },
    { ar: "Omar has a phone. حذفنا الاسم: The phone is ______.", en: "Omar has a phone. → The phone is ______.", opts: ["he", "him", "his", "he's"], answer: 2, why: "Omar → He → his. كلمة his نفسها قبل الاسم وبعده، والموقع يحدد الوظيفة." },
    { ar: "I have five books. أكمل: The books are ______.", en: "I have five books. The books are ______.", opts: ["my", "mine", "mines", "me"], answer: 1, why: "ضمير الملكية لا يتغير مع الجمع — نفس mine للمفرد والجمع." },
  ],

  // ---------------- الدرس 18 ----------------
  18: [
    { ar: "أي كلمة من الكلمات التالية Plural (جمع)؟", opts: ["children", "child", "mouse", "person"], answer: 0, why: "children جمع شاذ — child / mouse / person أسماء مفردة." },
    { ar: "اختر العبارة الصحيحة:", opts: ["I have a book.", "I have a books.", "I have an apples.", "I have a cats."], answer: 0, why: "a / an للمفرد المعدود فقط — الجمع يأتي بدون أداة: books / apples." },
    { ar: "ما جمع كلمة book؟", en: "book → ?", opts: ["books", "bookes", "bookies", "bookss"], answer: 0, why: "القاعدة الأساسية للجمع العادي: Noun + s." },
    { ar: "ما جمع كلمة box؟", en: "box → ?", opts: ["boxes", "boxs", "boxies", "boxeez"], answer: 0, why: "تنتهي بـ x ← نضيف es: boxes." },
    { ar: "ما جمع كلمة baby؟", en: "baby → ?", opts: ["babies", "babys", "babyes", "babieses"], answer: 0, why: "b حرف ساكن قبل y ← نحوّل y إلى ies: babies." },
    { ar: "ما جمع كلمة toy؟", en: "toy → ?", opts: ["toys", "toies", "toyes", "toyss"], answer: 0, why: "o حرف علة قبل y ← y تبقى كما هي + s: toys." },
    { ar: "ما جمع كلمة knife؟", en: "knife → ?", opts: ["knives", "knifes", "knifves", "knifeses"], answer: 0, why: "من كلمات f/fe المشهورة: fe → ves — لكن انتبه، ليست كل f/fe تتحول (roof → roofs)." },
    { ar: "ما جمع كلمة mouse؟", en: "mouse → ?", opts: ["mice", "mouses", "mices", "mouse"], answer: 0, why: "mouse → mice — جمع شاذ لا يتبع قاعدة s / es." },
    { ar: "ما جمع كلمة sheep؟", en: "sheep → ?", opts: ["sheep", "sheeps", "sheepes", "shoop"], answer: 0, why: "sheep = sheep — المفرد والجمع بنفس الشكل. لا نقول sheeps." },
    { ar: "أكمل: The children ______ happy.", en: "The children ______ happy.", opts: ["are", "is", "am", "been"], answer: 0, why: "children جمع ← are. children is خطأ شائع." },
    { ar: "أكمل: The men ______ tired yesterday.", en: "The men ______ tired yesterday.", opts: ["were", "was", "did", "are"], answer: 0, why: "men جمع في الماضي ← were." },
    { ar: "أكمل: The boys ______ football every day.", en: "The boys ______ football every day.", opts: ["play", "plays", "played", "playing"], answer: 0, why: "The boys = They ← الفعل الأساسي بدون s. The boys plays خطأ." },
  ],

  // ---------------- الدرس 19 ----------------
  19: [
    { ar: "أكمل (معلم واحد): This is the ______ desk.", en: "This is the ______ desk.", opts: ["teacher's", "teachers'", "teachers", "teacher"], answer: 0, why: "معلم واحد = مفرد ← 's: teacher's." },
    { ar: "أكمل (عدة طلاب): These are the ______ bags.", en: "These are the ______ bags.", opts: ["students'", "student's", "students", "students's"], answer: 0, why: "students جمع ينتهي بـ s ← نضع ' فقط: students'." },
    { ar: "ما صيغة الملكية الصحيحة للجمع children؟", en: "children → ? (possessive)", opts: ["children's", "childrens'", "childs'", "children"], answer: 0, why: "children جمع شاذ لا ينتهي بـ s ← 's، ولا نقول childrens' أبداً." },
    { ar: "ولدان يملكان دراجة واحدة: This is the ______ bike.", en: "This is the ______ bike.", opts: ["boys'", "boy's", "boys", "boy"], answer: 0, why: "أكثر من ولد والجمع ينتهي بـ s ← boys' وليس boy's." },
    { ar: "طفل واحد يملك لعبة: This is the ______ toy.", en: "This is the ______ toy.", opts: ["child's", "children's", "childs'", "children"], answer: 0, why: "طفل واحد = مفرد ← child's." },
    { ar: "اختر الجملة الصحيحة (قرأنا ثلاثة كتب):", opts: ["We read three books.", "We read three book's.", "We read three books'.", "We read three book'."], answer: 0, why: "apostrophe ليست جمعًا — الجمع العادي هو books بدون أي علامة." },
    { ar: "أي جملة تستخدم Possessive Noun؟", opts: ["The woman's hat is red.", "Her hat is red.", "The hat is hers.", "The hat is her."], answer: 0, why: "The woman's = اسم المالك + 's ← Possessive Noun، والبقية صفات أو ضمائر ملكية." },
    { ar: "أي جملة فيها hers كضمير ملكية (Possessive Pronoun)؟", opts: ["The book is hers.", "Her book is new.", "This is her book.", "She has a book."], answer: 0, why: "في The book is hers لا يوجد اسم بعد hers ← ضمير ملكية." },
    { ar: "The girls' room is clean. كم عدد الفتيات؟", opts: ["More than one girl", "one girl", "no girls", "a room only"], answer: 0, why: "girls' = أكثر من فتاة؛ لو كانت فتاة واحدة لقلنا girl's." },
    { ar: "لماذا نقول: Liam's room؟ (فكرة من Final Boss)", opts: ["Liam is one person (singular)", "Liam is plural", "room is plural", "we add s to the room"], answer: 0, why: "Liam شخص واحد (مفرد) ← 's." },
    { ar: "ما الشكل الأساسي الصحيح في المستوى الأساسي؟", opts: ["James's book", "James s book", "Jameses book", "The book of James s"], answer: 0, why: "المفرد يأخذ 's حتى لو انتهى الاسم بحرف s — بعض الأساليب تعرض James' لكننا نستخدم James's." },
    { ar: "صحح الخطأ:", en: "The students's books are new.", opts: ["The students' books are new.", "The student's books are new.", "The students books are new.", "The students'' books are new."], answer: 0, why: "students ينتهي أصلًا بـ s ← نضيف ' فقط، ولا نقول students's." },
  ],

  // ---------------- الدرس 20 ----------------
  20: [
    { ar: "اختر اسم الإشارة لكتاب واحد قريب منك:", en: "___ notebook is on my desk.", opts: ["This", "That", "These", "Those"], answer: 0, why: "notebook مفرد وقريب ← This." },
    { ar: "اختر اسم الإشارة لسيارة واحدة بعيدة في آخر الشارع:", en: "___ car at the end of the street is blue.", opts: ["This", "That", "These", "Those"], answer: 1, why: "car مفرد وبعيدة ← That." },
    { ar: "اختر اسم الإشارة لعدة تفاحات قريبة:", en: "___ apples are fresh.", opts: ["This", "That", "These", "Those"], answer: 2, why: "apples جمع وقريبة ← These." },
    { ar: "أكمل باسم الإشارة وVerb to be مع جمع شاذ بعيد:", en: "___ children ___ playing in the park.", opts: ["Those / are", "That / is", "These / is", "This / are"], answer: 0, why: "children جمع شاذ، والمجموعة بعيدة ← Those are." },
    { ar: "اختر السؤال الصحيح عن أشياء جمع بعيدة:", en: "You can see several old buildings far away.", opts: ["What are those?", "What is those?", "What are that?", "What is that buildings?"], answer: 0, why: "those جمع، لذلك السؤال يبدأ بـ What are those?" },
    { ar: "اختر الإجابة القصيرة الصحيحة:", en: "Are these your keys? — Yes, ___.", opts: ["they are", "these are", "it is", "they is"], answer: 0, why: "These تتحول إلى الضمير they في الإجابة القصيرة، ومع الجمع نستخدم are." },
    { ar: "اختر التركيب الصحيح مع صفة الملكية:", en: "___ is my new camera.", opts: ["This", "These", "Those", "They"], answer: 0, why: "camera مفرد وقريبة ← This. ثم تأتي صفة الملكية my قبل الاسم." },
    { ar: "اختر الجملة الصحيحة لحقائب الطلاب:", en: "Several bags near us belong to the students.", opts: ["These are the students' bags.", "This is the students' bags.", "These is the student's bags.", "Those are the students's bags."], answer: 0, why: "bags جمع وقريبة ← These are؛ students جمع ينتهي بـ s فتكون ملكيته students'." },
    { ar: "صحح الخطأ الشائع في الاختيار للمفرد والجمع:", en: "This books are heavy.", opts: ["These books are heavy.", "This book are heavy.", "Those book is heavy.", "That books is heavy."], answer: 0, why: "books جمع وقريبة في هذا السياق ← These، ومع الجمع نستخدم are." },
    { ar: "صحح الخطأ الشائع في توافق الإشارة والفعل:", en: "That are my friends.", opts: ["Those are my friends.", "That is my friends.", "These is my friends.", "This are my friends."], answer: 0, why: "friends جمع، لذلك نحتاج Those أو These ومعها are؛ هنا الجواب Those are." },
    { ar: "اختر السؤال والإجابة الصحيحين عن دراجات الأطفال البعيدة:", en: "You see the children's bicycles across the playground.", opts: ["Whose bicycles are those? — They are the children's.", "Whose bicycle is that? — It is the children.", "Whose bicycles is those? — Those is children's.", "Whose are these bicycles? — It is children's."], answer: 0, why: "bicycles جمع وبعيدة ← those / are / they. children جمع شاذ، لذا ملكيته children's." },
    { ar: "اختر الجملة المتكاملة الصحيحة:", en: "You point to several telescopes far from you. They belong to your brother.", opts: ["Those are my brother's telescopes.", "That is my brother's telescopes.", "These are my brother telescope.", "Those is my brothers' telescope."], answer: 0, why: "telescopes جمع وبعيدة ← Those are؛ brother مفرد فتكون الملكية brother's." },
  ],

  // ---------------- الدرس 21 ----------------
  21: [
    { ar: "أكمل: ___ a cat in the garden.", en: "___ a cat in the garden.", opts: ["There is", "There are", "There am", "There be"], answer: 0, why: "a cat مفرد ← There is." },
    { ar: "أكمل: ___ three children in the park.", en: "___ three children in the park.", opts: ["There are", "There is", "There are a", "There be"], answer: 0, why: "children جمع شاذ (more than one) ← There are." },
    { ar: "اختر الجملة الصحيحة:", opts: ["There is an apple in the basket.", "There is apple in the basket.", "There are an apple in the basket.", "There are a apple in the basket."], answer: 0, why: "apple مفرد يبدأ بصوت علة ← an apple، ومع المفرد نستخدم There is." },
    { ar: "حقيبة علي على الكرسي. اختر الجملة الصحيحة:", en: "Ali's bag is on the chair.", opts: ["There is Ali's bag on the chair.", "There are Ali's bag on the chair.", "There is a Ali's bag on the chair.", "There are a Ali's bag on the chair."], answer: 0, why: "bag مفرد ← There is، والملكية Ali's تدخل داخل جملة There is بدون أداة." },
    { ar: "حوّل إلى النفي: There is a car outside.", en: "There is a car outside. → ?", opts: ["There isn't a car outside.", "There aren't a car outside.", "There not is a car outside.", "There are not a car outside."], answer: 0, why: "المفرد: There is not → There isn't." },
    { ar: "حوّل إلى سؤال: There are two windows in the room.", en: "There are two windows in the room. → ?", opts: ["Are there two windows in the room?", "Is there two windows in the room?", "Are there a two windows in the room?", "There are two windows in the room?"], answer: 0, why: "الجمع: There are... ← Are there...?" },
    { ar: "أجب بـ Yes عن السؤال: Is there a problem?", en: "Is there a problem? — Yes, ___.", opts: ["there is.", "it is.", "there are.", "it are."], answer: 0, why: "سؤال الوجود بإجابة قصيرة يكرر there is، ولا نقول it is." },
    { ar: "أكمل الإجابة: Are there any books here? — No, there ___.", en: "Are there any books here? — No, there ___.", opts: ["aren't.", "is.", "are.", "is not."], answer: 0, why: "نفي الجمع: There aren't / No, there aren't." },
    { ar: "لماذا نقول There is some water وليس There are some water؟", en: "There is some water in the bottle.", opts: ["Because water is uncountable.", "Because water is cold.", "Because bottle is singular.", "Because water is in a glass."], answer: 0, why: "water غير معدود في المستوى الأساسي، لذلك يأتي مع There is + some." },
    { ar: "There is a cat in the garden. It is black. ما وظيفة الجملة الثانية؟", en: "It is black.", opts: ["It describes the cat.", "It tells us the cat exists.", "It asks about the cat.", "It points to the garden."], answer: 0, why: "There is تعلن الوجود، ثم It is تصف الشيء بعد تحديده." },
    { ar: "يوجد كتاب على الطاولة، وأنت تشير إليه الآن. اختر الجملة الصحيحة:", en: "There is a book on the table. → I point to it: ?", opts: ["This is the book.", "There is the book.", "This are the book.", "Those is the books."], answer: 0, why: "الوجود: There is...، وعند الإشارة القربية: This is the book." },
    { ar: "أي جملة من الجمل التالية خاطئة؟", opts: ["There is many students.", "There are many students.", "There is a book.", "There are two books."], answer: 0, why: "many students جمع ← تحتاج There are، وليس There is." },
  ],

  // ---------------- الدرس 22 ----------------
  22: [
    { ar: "الكتاب موجود داخل الحقيبة. أكمل:", en: "The book is ___ the bag.", opts: ["in", "on", "under", "behind"], answer: 0, why: "داخل شيء → in." },
    { ar: "الهاتف على الطاولة. أكمل:", en: "The phone is ___ the table.", opts: ["on", "in", "under", "next to"], answer: 0, why: "على سطح شيء → on." },
    { ar: "القطة تحت الكرسي. أكمل:", en: "The cat is ___ the chair.", opts: ["under", "above", "on", "in"], answer: 0, why: "أسفل شيء مكانيًا → under." },
    { ar: "اختر الجملة التي تعني: الكرة بين علي وعمر.", en: "The ball is ___ Ali and Omar.", opts: ["between", "among", "opposite", "behind"], answer: 0, why: "بين شيئين محددين → between A and B." },
    { ar: "أكمل بسؤال صحيح: ___ is the book?", en: "___ is the book?", opts: ["Where", "What", "When", "Why"], answer: 0, why: "للسؤال عن المكان نستخدم Where." },
    { ar: "أكمل: Where ___ the keys?", en: "Where ___ the keys?", opts: ["are", "is", "am", "be"], answer: 0, why: "keys جمع → are." },
    { ar: "المعلم أمام الطلاب. أكمل:", en: "The teacher is ___ the students.", opts: ["in front of", "behind", "between", "under"], answer: 0, why: "أمام → in front of — عكس behind." },
    { ar: "أي حرف جر يعني أن الشيء في موضع أعلى (لا يلامس بالضرورة)؟", opts: ["above", "on", "under", "in"], answer: 0, why: "above = أعلى من، أما on فهي على سطح شيء وتلامسه." },
    { ar: "المدرسة مقابل الحديقة. أكمل:", en: "The school is ___ the park.", opts: ["opposite", "between", "next to", "in"], answer: 0, why: "مقابل/في الجهة المقابلة → opposite." },
    { ar: "أكمل: There ___ a book on the table.", en: "There ___ a book on the table.", opts: ["is", "are", "am", "be"], answer: 0, why: "a book مفرد → There is." },
    { ar: "أين حقيبة عمر؟ — هي تحت المكتب. أكمل:", en: "Where is Omar's bag? — ___ under the desk.", opts: ["It is", "They are", "He is", "She is"], answer: 0, why: "bag شيء مفرد (It) → It is." },
    { ar: "أي جملة تستخدم حرفَي جر في نفس الوقت؟", opts: ["There is a small box under the table next to the door.", "The book is on the table.", "The cat is under the chair.", "There is a pen in the drawer."], answer: 0, why: "تحتوي على under و next to معًا: أكثر من حرف جر في جملة واحدة." },
  ],

  // ---------------- الدرس 23 ----------------
  23: [
    { ar: "أي كلمة من الكلمات التالية Uncountable؟", en: "Which word is uncountable?", opts: ["furniture", "chair", "apple", "student"], answer: 0, why: "furniture غير معدود: some furniture، ولا نقول a furniture ولا furnitures." },
    { ar: "أكمل: اشتريت بيضة واحدة هذا الصباح.", en: "I bought ___ egg this morning.", opts: ["an", "a", "some", "many"], answer: 0, why: "egg مفرد معدود يبدأ بصوت علة ← an egg." },
    { ar: "أي جملة خاطئة؟", opts: ["I need a rice.", "I need some rice.", "I need a bag of rice.", "There is some rice in the bowl."], answer: 0, why: "rice غير معدود ← لا نستخدم a مباشرة؛ نقول some rice أو a bag of rice." },
    { ar: "أكمل السؤال:", en: "Are there ___ books on the shelf?", opts: ["any", "some", "much", "a"], answer: 0, why: "في الأسئلة والنفي نستخدم any مع الجمع المعدود: Are there any books?" },
    { ar: "أكمل النفي:", en: "There isn't ___ money in the box.", opts: ["any", "some", "many", "an"], answer: 0, why: "النفي مع غير المعدود ← any: There isn't any money؛ وmoney غير معدود." },
    { ar: "أكمل:", en: "___ some water in the bottle.", opts: ["There is", "There are", "There am", "There be"], answer: 0, why: "water غير معدود ← There is some water." },
    { ar: "أكمل:", en: "___ three eggs on the table.", opts: ["There are", "There is", "There are a", "There be"], answer: 0, why: "three eggs جمع معدود ← There are." },
    { ar: "أكمل السؤال عن كمية الماء:", en: "___ water do you drink?", opts: ["How much", "How many", "How", "How many of"], answer: 0, why: "water غير معدود ← How much water do you drink?" },
    { ar: "أكمل السؤال عن عدد الكتب:", en: "___ books are on the shelf?", opts: ["How many", "How much", "How", "How much of"], answer: 0, why: "books جمع معدود ← How many books...?" },
    { ar: "اختر الجملة الصحيحة:", opts: ["There isn't much information about it.", "There isn't an information about it.", "There aren't many informations.", "There is many information."], answer: 0, why: "much + غير معدود؛ ولا نقول an information ولا informations." },
    { ar: "كيف تقول: زجاجتا ماء؟", opts: ["two bottles of water", "two waters", "two water", "a two water"], answer: 0, why: "لا نعدّ الماء نفسه بل نعدّ الوحدات ← two bottles of water." },
    { ar: "أكمل: أعطتني نصيحة قبل الامتحان.", en: "She gave me ___ before the exam.", opts: ["a piece of advice", "an advice", "advices", "a advices"], answer: 0, why: "advice غير معدود ← نعدّ pieces: a piece of advice." },
  ],
};
