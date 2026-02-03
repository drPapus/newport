import { useEffect, useRef, useState } from "react";

export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {
        root: null,
        threshold: 0.25,
        ...options,
      }
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}
