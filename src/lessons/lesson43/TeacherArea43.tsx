import { lazy, Suspense, useState } from 'react';
import { Panel43 } from './kit43';
// Same established client-side teacher mechanism/password as Lessons 38–42.
// This is a pedagogical access gate, not a server-side security boundary.
export const TEACHER_PASSWORD_43 = 'somer173';
const TeacherGuide43=lazy(()=>import('./TeacherGuide43'));
export function TeacherArea43({unlocked,unlock,lock}:{unlocked:boolean;unlock:()=>void;lock:()=>void}) {
 const [password,setPassword]=useState(''),[error,setError]=useState('');
 return <section data-area="teacher">{unlocked?<><Panel43 title="مساحة المعلم مفتوحة"><button type="button" onClick={lock}>قفل مساحة المعلم</button></Panel43><Suspense fallback={<p role="status">جارٍ تحميل الدليل…</p>}><TeacherGuide43/></Suspense></>:<Panel43 kicker="TEACHER ACCESS" title="بوابة المعلم المحمية">
 <p>دليل التدريس ومفاتيح التدريبات والاختبار. استخدم رمز المعلم المعتمد في المنصة.</p>
 <form onSubmit={e=>{e.preventDefault();if(password.trim()===TEACHER_PASSWORD_43){setPassword('');setError('');unlock();}else setError('الرمز غير صحيح. حاول مجددًا.');}}>
 <label className="field43">رمز المعلم<input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required aria-invalid={!!error} aria-describedby={error?'teacher43-error':undefined}/></label>
 <button className="primary43" type="submit">فتح مساحة المعلم</button>{error&&<p id="teacher43-error" className="feedback43 error" role="alert">{error}</p>}</form></Panel43>}</section>;
}
