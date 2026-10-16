import { lazy, Suspense, useState } from 'react';
import { Panel44 } from './kit44';
// Same established client-side teacher mechanism/password as Lessons 38–43.
export const TEACHER_PASSWORD_44 = 'somer173';
const TeacherGuide44=lazy(()=>import('./TeacherGuide44'));
export function TeacherArea44({unlocked,unlock,lock}:{unlocked:boolean;unlock:()=>void;lock:()=>void}) {
 const [password,setPassword]=useState(''),[error,setError]=useState('');
 return <section data-area="teacher">{unlocked?<><Panel44 title="مساحة المعلم مفتوحة"><button type="button" onClick={lock}>قفل مساحة المعلم</button></Panel44><Suspense fallback={<p role="status">جارٍ تحميل الدليل…</p>}><TeacherGuide44/></Suspense></>:<Panel44 kicker="TEACHER ACCESS" title="بوابة المعلم المحمية">
 <p>دليل التدريس ومفاتيح التدريبات والاختبار. استخدم رمز المعلم المعتمد في المنصة.</p>
 <form onSubmit={e=>{e.preventDefault();if(password.trim()===TEACHER_PASSWORD_44){setPassword('');setError('');unlock();}else setError('الرمز غير صحيح. حاول مجددًا.');}}>
 <label className="field44">رمز المعلم<input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required aria-invalid={!!error} aria-describedby={error?'teacher44-error':undefined}/></label>
 <button className="primary44" type="submit">فتح مساحة المعلم</button>{error&&<p id="teacher44-error" className="feedback44 error" role="alert">{error}</p>}</form></Panel44>}</section>;
}
