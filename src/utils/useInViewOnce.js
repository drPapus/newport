import { useEffect, useRef, useState } from "react";

export function useInViewOnce(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // only once
        }
      },
      {
        root: null,
        threshold: 0.2, // 20% visible is enough
        ...options,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [visible, options]);

  return { ref, visible };
}
