import {
  DUTY_CHANNELS_44,
  NEXT_LESSON_44,
  SOURCE_SECTIONS_44,
  SOURCE_UNIT_COUNT_44,
  STATIONS_44,
  splitTitle44,
  station44,
  stepChannel44,
  type DutyChannelId44,
} from "./ledger44";

export {
  DUTY_CHANNELS_44,
  NEXT_LESSON_44,
  SOURCE_SECTIONS_44,
  SOURCE_UNIT_COUNT_44,
  STATIONS_44,
  splitTitle44,
  station44,
  stepChannel44,
};

export const LESSON_TITLE_44 = "MUST & HAVE TO";
export const LESSON_SUBTITLE_44 = "الضرورة، والإلزام، والقواعد، والمسؤوليات";
export const LESSON_SUBTITLE_EN_44 = "The Language of Necessity & Obligation";
export const LESSON_SECTION_COUNT_44 = 39;
export const LESSON_STEP_COUNT_44 = 39;
export const LESSON_CURRICULUM_TOTAL_44 = 120;
export const LESSON_IDENTITY_44 = "The Obligation Command Center";
export const LESSON_IDENTITY_AR_44 = "مركز قيادة الإلزام والضرورة";

export interface StepDescriptor44 {
  index: number;
  navId: string;
  railLabel: string;
  purposeAr: string;
  channel: DutyChannelId44;
}

const STEP_PURPOSES_44: Record<number, { rail: string; purpose: string }> = {
  0: {
    rail: "بوابة الدرس ومصادر الإلزام",
    purpose: "التمهيد التفاعلي لمصادر الضرورة الثلاثة والفرق المحوري بين المنع وعدم الضرورة.",
  },
  1: {
    rail: "أهداف الدرس الاثنا عشر",
    purpose: "خريطة الكفاءات المستهدفة من صيغ الإلزام حتى الاختبار النهائي الشامل.",
  },
  2: {
    rail: "معنى MUST وبنية الجملة",
    purpose: "إتقان صيغة Subject + must + V1 وتشريح عناصر جملة الإلزام.",
  },
  3: {
    rail: "قاعدة MUST الذهبية الثابتة",
    purpose: "التثبت من ثبات MUST مع جميع الضمائر وتجنب أخطاء musts وmust to.",
  },
  4: {
    rail: "الضرورة التي يؤكدها المتحدث",
    purpose: "تمييز الالتزام النابع من قناعة المتحدث وتأكيده الشخصي.",
  },
  5: {
    rail: "MUST في القوانين والتعليمات",
    purpose: "توظيف MUST في اللوائح الرسمية وتعليمات السلامة الإلزامية.",
  },
  6: {
    rail: "MUST للتوصية القوية",
    purpose: "التفريق بالسياق بين الأمر الرسمي والتوصية الحماسية الودية.",
  },
  7: {
    rail: "معنى HAVE TO والتركيب شبه الناقص",
    purpose: "فهم طبيعة Semi-modal ولماذا تتصرف HAVE TO بحسب الفاعل والزمن.",
  },
  8: {
    rail: "HAS TO مع المفرد الغائب",
    purpose: "إتقان التحويل بين have to وhas to ومقارنته بثبات MUST.",
  },
  9: {
    rail: "متى نستخدم HAVE TO؟",
    purpose: "ربط HAVE TO بالقوانين والأنظمة والظروف العملية المحيطة.",
  },
  10: {
    rail: "الفرق الحقيقي والتداخل السياقي",
    purpose: "استيعاب الفرق بوصفه اتجاهًا شائعًا لا قانونًا جامدًا مع مواضع التداخل.",
  },
  11: {
    rail: "جدول المقارنة الذهبي",
    purpose: "موازنة شاملة بين MUST وHAVE TO من حيث البنية والتصريف والاستخدام.",
  },
  12: {
    rail: "حوار تطبيقي: Preparing for the Exam",
    purpose: "تحليل توظيف MUST وHAVE TO والسؤال في محادثة دراسية واقعية.",
  },
  13: {
    rail: "الفارق الحاسم: MUSTN'T مقابل DON'T HAVE TO",
    purpose: "التمييز البصري والدلالي الحاسم بين المنع القاطع وعدم الضرورة.",
  },
  14: {
    rail: "MUSTN'T — صيغة المنع القاطع",
    purpose: "صياغة الحظر التام بـ must not / mustn't + V1 في المواقف التحذيرية.",
  },
  15: {
    rail: "DON'T / DOESN'T HAVE TO — عدم الضرورة",
    purpose: "التعبير عن غياب الإلزام وعودة الفعل إلى have بعد doesn't.",
  },
  16: {
    rail: "مقارنة تغيّر المعنى بالكامل",
    purpose: "محاكاة أثر تبديل أداة النفي على المعنى المسموح والممنوع في الموقف الواحد.",
  },
  17: {
    rail: "تكوين السؤال مع DO / DOES",
    purpose: "بناء سؤال الالتزام الحاضر وإرجاع الفعل إلى have بعد Does.",
  },
  18: {
    rail: "الإجابات القصيرة ودلالتها",
    purpose: "الرد بـ Yes, I do / No, she doesn't وفهم أن النفي يعني عدم الإلزام لا المنع.",
  },
  19: {
    rail: "MUST في السؤال وفخ الإجابة المنفية",
    purpose: "التمييز بين الجواب No, you don't have to والجواب المانع No, you mustn't.",
  },
  20: {
    rail: "HAD TO — الضرورة في الماضي",
    purpose: "التعبير عن التزامات الماضي بـ had to + V1 واستبعاد الخطأ musted.",
  },
  21: {
    rail: "DIDN'T HAVE TO — عدم الضرورة ماضيًا",
    purpose: "فهم دلالة didn't have to ولماذا لا تحسم وحدها وقوع الفعل من عدمه.",
  },
  22: {
    rail: "السؤال عن الضرورة في الماضي",
    purpose: "صياغة Did + Subject + have to + V1 وتفادي خطأ Did you had to.",
  },
  23: {
    rail: "WILL HAVE TO — الضرورة في المستقبل",
    purpose: "بناء الالتزام المستقبلي بـ will have to + V1 مع ثبات have بعد will.",
  },
  24: {
    rail: "نفي المستقبل وسؤاله ومصفوفة الأزمنة",
    purpose: "إتقان won't have to وWill ... have to؟ ومقارنة الأزمنة الثلاثة.",
  },
  25: {
    rail: "مقارنة تمهيدية: الضرورة مقابل النصيحة",
    purpose: "تمييز قوة الإلزام في MUST وHAVE TO عن النصيحة في SHOULD.",
  },
  26: {
    rail: "الحوار الشامل: Science Competition",
    purpose: "تتبع المنع والإلزام وعدم الضرورة والماضي والمستقبل في حوار متكامل.",
  },
  27: {
    rail: "المحقق النحوي — Grammar Detective",
    purpose: "اكتشاف وتصحيح 10 أخطاء نحوية ودلالية مع فتح المفتاح بعد المحاولة.",
  },
  28: {
    rail: "التدريب الأول: MUST أم HAVE TO؟",
    purpose: "تطبيق الاختيار السياقي والنحوي في 5 جمل متدرجة.",
  },
  29: {
    rail: "التدريب الثاني: MUSTN'T أم DON'T HAVE TO؟",
    purpose: "التمييز التطبيقي بين المنع وعدم الضرورة انطلاقًا من المعنى العربي.",
  },
  30: {
    rail: "التدريب الثالث: الماضي والمستقبل",
    purpose: "إكمال جمل الالتزام والأسئلة والنفي عبر الماضي والمستقبل.",
  },
  31: {
    rail: "التدريب الرابع: التحويل إلى سؤال",
    purpose: "تحويل جمل الإلزام في الحاضر والماضي والمستقبل إلى أسئلة سليمة.",
  },
  32: {
    rail: "التدريب الخامس: التحويل إلى النفي",
    purpose: "اختيار صيغة النفي الدقيقة وفق المعنى المطلوب بين منع وعدم ضرورة.",
  },
  33: {
    rail: "تحدي القراءة: A Day at the Science Centre",
    purpose: "قراءة نص قصصي متكامل والإجابة عن 10 أسئلة فهم واستخراج.",
  },
  34: {
    rail: "بوابة الاختبار النهائي الشامل",
    purpose: "استعراض مستويات الاختبار الخمسة والانطلاق إلى تقييم 25 سؤالًا.",
  },
  35: {
    rail: "بوابة التصحيح ودليل المعلم",
    purpose: "توجيه المتعلم والمعلم إلى منطقة الحلول وبوابة المعلم المخصصة.",
  },
  36: {
    rail: "مهمة الكتابة: Rules and Responsibilities",
    purpose: "كتابة فقرة من 12–15 جملة تحقق المتطلبات الثمانية مع فحص ذاتي تفاعلي.",
  },
  37: {
    rail: "الملخص الذهبي الشامل",
    purpose: "مراجعة مركّزة لجميع الصيغ والقواعد الذهبية عبر البطاقات الست.",
  },
  38: {
    rail: "خريطة التقدم والمحطة القادمة (44 / 120)",
    purpose: "توثيق إتمام الدرس 44 واستشراف الدرس 45 حول SHOULD وOUGHT TO.",
  },
};

export const STEP_DESCRIPTORS_44: StepDescriptor44[] = SOURCE_SECTIONS_44.map((sec) => {
  const meta = STEP_PURPOSES_44[sec.num] ?? {
    rail: sec.title,
    purpose: sec.title,
  };
  return {
    index: sec.num,
    navId: sec.id,
    railLabel: meta.rail,
    purposeAr: meta.purpose,
    channel: stepChannel44(sec.num),
  };
});
