import { useEffect } from "react";

/**
 * شارة "Built with Arena" تُحقن في الصفحة من خارج الكود.
 * هذه الأداة تبحث عنها في الـ DOM وتزيلها أينما ظهرت، مع مراقبة أي إضافة جديدة.
 */
export default function ArenaClean() {
  useEffect(() => {
    const RX = /built with arena/i;

    const scan = () => {
      const all = Array.from(document.querySelectorAll("body *"));
      const matches = all.filter((el) => {
        const tag = el.tagName;
        if (tag === "SCRIPT" || tag === "STYLE") return false;
        return RX.test(el.textContent || "");
      });
      if (!matches.length) return;
      // الأعلى فقط (الذي لا يحتويه عنصر مطابق آخر)
      const topmost = matches.filter((m) => !matches.some((o) => o !== m && o.contains(m)));
      for (const t of topmost) {
        if (t === document.body || t.id === "root") {
          // إن كانت داخل جذر التطبيق: أزل أعمق عنصر مطابق فقط
          const deep = matches.filter((m) => !matches.some((o) => o !== m && m.contains(o)));
          deep.forEach((d) => d.remove());
        } else {
          t.remove();
        }
      }
    };

    scan();
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });
    const iv = window.setInterval(scan, 1200);
    return () => {
      mo.disconnect();
      window.clearInterval(iv);
    };
  }, []);
  return null;
}
