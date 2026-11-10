import { useState } from "react";
import { FinalTestAnswerKey } from "../../shared/finalTest";
import { En61, Mixed61, Scene61 } from "./kit61";
import { ORIGINAL_TEST_61, PRACTICE_COUNT_61, PRACTICES_61 } from "./practice61";
import { TEST_61 } from "./test61";

// Same presentation gate and password as the adjacent lessons. It is a UI gate,
// not server-side access control; the application's security contract is unchanged.
const TEACHER_PASSWORD_61 = "somer173";

function Alternatives61({ answers }: { answers?: string[] }) {
  if (!answers?.length) return null;
  return <div className="l61-accept" data-l61-teacher-alternatives><span>صيغ أخرى مقبولة:</span>{answers.map((answer) => <div dir="ltr" key={answer}><En61>{answer}</En61></div>)}</div>;
}

export default function TeacherArea61() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState("");
  if (!unlocked) return <Scene61 kicker="INSTRUCTOR ACCESS" title="مساحة المعلم" lead="مفتاح الاختبار المشترك والتدريبات والاختبار الأصلي في مساحة مخصصة للمعلم.">
    <section className="l61-teacher-gate" data-teacher-area="61"><div className="l61-kicker" dir="ltr">SECURE VIEW / 61</div><h3>افتح لوحة المراجعة</h3><p>هذه البوابة تحجب العرض في الواجهة فقط؛ ليست حماية أمنية لموقع ثابت.</p><form onSubmit={(event) => { event.preventDefault(); if (password.trim() === TEACHER_PASSWORD_61) { setUnlocked(true); setError(false); } else setError(true); }}><label><span>كلمة مرور المعلم</span><input type="password" dir="ltr" aria-label="كلمة مرور المعلم" autoComplete="off" value={password} onChange={(event) => { setPassword(event.target.value); setError(false); }} /></label><button className="l61-button" type="submit">فتح مساحة المعلم</button></form>{error && <p className="l61-feedback is-wrong" role="alert">كلمة المرور غير صحيحة.</p>}</section>
  </Scene61>;
  return <Scene61 kicker="INSTRUCTOR CONSOLE" title="لوحة المراجعة للمعلم" lead="اقرأ الإجابة والسبب والفخ لكل سؤال، مع ملاحظة اختلاف المعنى بحسب السياق.">
    <div className="l61-teacher" data-teacher-area="61">
      <div className="l61-teacher-stats"><div><b>16</b><span>قسمًا</span></div><div><b>{PRACTICE_COUNT_61}</b><span>بند تدريب</span></div><div><b>25</b><span>سؤالًا أصليًا</span></div><div><b>15</b><span>سؤالًا نهائيًا</span></div></div>
      <p className="l61-note"><Mixed61 text="اطلب من المتعلم تحديد المتحدث والمخاطَب والقصد قبل تغيير الضمير أو الزمن. في السؤال عن الإمكانية قد يصح if I could، بينما to help تنقل الطلب. تغير المكان والزمان مشروط بتغير المرجع." /></p>
      <FinalTestAnswerKey lesson={61} questions={TEST_61} accent="bg-[#07584d]" />
      <section className="l61-teacher-keys"><h3>مفاتيح التدريبات الثمانية</h3>{PRACTICES_61.map((group, i) => <div key={group.id} className="l61-key-group"><button type="button" aria-expanded={open === group.id} onClick={() => setOpen(open === group.id ? "" : group.id)}>{i + 1}. <Mixed61 text={group.title} /> <span>{group.items.length} بند</span></button>{open === group.id && <ol>{group.items.map((item, j) => <li key={j}><div dir="auto"><Mixed61 text={item.prompt} /></div><div><En61>{item.answer}</En61></div><Alternatives61 answers={item.accept} /><p><Mixed61 text={item.why} /></p></li>)}</ol>}</div>)}</section>
      <section className="l61-teacher-keys"><h3>مفتاح الاختبار الأصلي · 25 سؤالًا</h3><button type="button" className="l61-button l61-button--quiet" aria-expanded={open === "original"} onClick={() => setOpen(open === "original" ? "" : "original")}>{open === "original" ? "إخفاء المفتاح" : "عرض المفتاح الكامل"}</button>{open === "original" && <ol>{ORIGINAL_TEST_61.map((item) => <li key={item.n} data-l61-teacher-original={item.n}><div className="l61-teacher-original-row" dir="ltr" data-l61-teacher-original-row><bdi dir="ltr">{item.n}.</bdi><En61>{item.answer}</En61></div><Alternatives61 answers={item.accept} /><p><Mixed61 text={item.why} /></p></li>)}</ol>}</section>
    </div>
  </Scene61>;
}
