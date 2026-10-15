import { lazy, Suspense, useState } from 'react';
import { Panel41 } from './kit41';
// Same established client-side teacher mechanism/password as Lessons 38–40.
// This is a pedagogical access gate, not a server-side security boundary.
const TeacherGuide41=lazy(()=>import('./TeacherGuide41'));
export function TeacherArea41({unlocked,unlock,lock}:{unlocked:boolean;unlock:()=>void;lock:()=>void}) {
 const [password,setPassword]=useState(''),[error,setError]=useState('');
 return <section data-area="teacher">{unlocked?<><Panel41 title="مساحة المعلم مفتوحة"><button onClick={lock}>قفل مساحة المعلم</button></Panel41><Suspense fallback={<p role="status">جارٍ تحميل الدليل…</p>}><TeacherGuide41/></Suspense></>:<Panel41 kicker="TEACHER ACCESS" title="بوابة المعلم المحمية"><p>دليل التدريس ومفاتيح الممارسة والاختبار. استخدم رمز المعلم المعتمد في المنصة.</p><form onSubmit={e=>{e.preventDefault();if(password.trim()==='somer173'){setPassword('');setError('');unlock();}else setError('الرمز غير صحيح. حاول مجددًا.');}}><label className="field41">رمز المعلم<input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required aria-invalid={!!error} aria-describedby={error?'teacher41-error':undefined}/></label><button className="primary41" type="submit">فتح مساحة المعلم</button>{error&&<p id="teacher41-error" className="feedback41 error" role="alert">{error}</p>}</form></Panel41>}</section>;
}
