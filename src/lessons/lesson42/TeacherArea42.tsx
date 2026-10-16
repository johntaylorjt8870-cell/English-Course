import { lazy, Suspense, useState } from 'react';
import { Panel42 } from './kit42';
// Same established client-side teacher mechanism/password as Lessons 38–41.
// This is a pedagogical access gate, not a server-side security boundary.
export const TEACHER_PASSWORD_42 = 'somer173';
const TeacherGuide42=lazy(()=>import('./TeacherGuide42'));
export function TeacherArea42({unlocked,unlock,lock}:{unlocked:boolean;unlock:()=>void;lock:()=>void}) {
 const [password,setPassword]=useState(''),[error,setError]=useState('');
 return <section data-area="teacher">{unlocked?<><Panel42 title="مساحة المعلم مفتوحة"><button type="button" onClick={lock}>قفل مساحة المعلم</button></Panel42><Suspense fallback={<p role="status">جارٍ تحميل الدليل…</p>}><TeacherGuide42/></Suspense></>:<Panel42 kicker="TEACHER ACCESS" title="بوابة المعلم المحمية">
 <p>دليل التدريس ومفاتيح التدريبات والاختبار. استخدم رمز المعلم المعتمد في المنصة.</p>
 <form onSubmit={e=>{e.preventDefault();if(password.trim()===TEACHER_PASSWORD_42){setPassword('');setError('');unlock();}else setError('الرمز غير صحيح. حاول مجددًا.');}}>
 <label className="field42">رمز المعلم<input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required aria-invalid={!!error} aria-describedby={error?'teacher42-error':undefined}/></label>
 <button className="primary42" type="submit">فتح مساحة المعلم</button>{error&&<p id="teacher42-error" className="feedback42 error" role="alert">{error}</p>}</form></Panel42>}</section>;
}
