/**
 * مدخل حزمة اختبار المتصفح فقط.
 *
 * يركّب تطبيق App الحقيقي (بكل الدروس والبوابة والفهرس)، مع استبدال حزمة
 * الدرس 2 عند البناء بمكوّن اختبار يرمي خطأ. لا شيء من هذا الملف أو من
 * إعداد Vite المجاور يُضمَّن في حزمة الإنتاج (dist).
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./harness.css";
import App from "../../../../src/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
