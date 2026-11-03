import { useEffect, useState } from "react";

/**
 * حفظ إجابات الطالب محليًا للدرس 54 فقط (مفتاح معزول عن بقية الدروس).
 * لا يلمس أي مكوّن مشترك ولا يغيّر سلوك الدرس الأول.
 */
export function usePersistent54<T>(key: string, initial: T) {
  const storageKey = `englishwithsomer-lesson54:${key}`;
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw === null ? initial : (JSON.parse(raw) as T);
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      /* التخزين الخاص قد يكون معطّلًا؛ الدرس يبقى يعمل في الذاكرة. */
    }
  }, [storageKey, value]);
  return [value, setValue] as const;
}
