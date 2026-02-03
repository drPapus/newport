import React, { useEffect, useRef } from "react";

/**
 * HexWaveCanvas
 * - Draws a hex grid and animates it with a smooth wave deformation.
 * - Pure 2D canvas, suitable as a hero background.
 */
export default function HexWaveCanvas({
  className,
  hexSize = 22,
  lineWidth = 1,
  alpha = 0.55,
  speed = 0.9,
  amplitude = 14,
  fps = 45,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    let lastTime = 0;
    const frameInterval = 1000 / Math.max(1, fps);

    // Simple hash-based 2D value noise (fast, deterministic).
    const hash = (x, y) => {
      const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
      return s - Math.floor(s);
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const smoothstep = (t) => t * t * (3 - 2 * t);

    const noise2D = (x, y) => {
      const x0 = Math.floor(x);
      const y0 = Math.floor(y);
      const x1 = x0 + 1;
      const y1 = y0 + 1;

      const sx = smoothstep(x - x0);
      const sy = smoothstep(y - y0);

      const n00 = hash(x0, y0);
      const n10 = hash(x1, y0);
      const n01 = hash(x0, y1);
      const n11 = hash(x1, y1);

      const ix0 = lerp(n00, n10, sx);
      const ix1 = lerp(n01, n11, sx);
      return lerp(ix0, ix1, sy);
    };

    // Axial hex directions for neighbor connections.
    const dirs = [
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
    ];

    // Convert axial (q, r) to pixel (pointy-top layout).
    const axialToPixel = (q, r, size) => {
      const x = size * Math.sqrt(3) * (q + r / 2);
      const y = size * (3 / 2) * r;
      return { x, y };
    };

    // Build a list of hex centers to cover the viewport.
    const buildGrid = (w, h, size) => {
      // Add padding to avoid edge popping.
      const pad = size * 3;
      const W = w + pad * 2;
      const H = h + pad * 2;

      // Approximate axial bounds.
      const rMax = Math.ceil(H / (size * 1.5)) + 2;
      const qMax = Math.ceil(W / (size * Math.sqrt(3))) + 2;

      const cells = [];
      for (let r = -rMax; r <= rMax; r++) {
        for (let q = -qMax; q <= qMax; q++) {
          const p = axialToPixel(q, r, size);
          const x = p.x + w / 2;
          const y = p.y + h / 2;
          // Keep only cells that are reasonably inside padded viewport.
          if (x > -pad && x < w + pad && y > -pad && y < h + pad) {
            cells.push({ q, r, x, y });
          }
        }
      }
      return cells;
    };

    let grid = buildGrid(1, 1, hexSize);

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent
        ? parent.getBoundingClientRect()
        : canvas.getBoundingClientRect();

      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      grid = buildGrid(width, height, hexSize);
    };

    // --- Drawing -------------------------------------------------------------

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);

      // Create a subtle gradient similar to your screenshot.
      const grad = ctx.createLinearGradient(0, height, width, 0);
      grad.addColorStop(0.0, "rgba(0, 150, 255, 0.85)");
      grad.addColorStop(0.45, "rgba(0, 255, 200, 0.55)");
      grad.addColorStop(1.0, "rgba(80, 120, 255, 0.75)");

      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = grad;
      ctx.globalAlpha = alpha;

      // Wave params.
      const time = t * 0.001 * speed;
      const kx = 0.012; // wave frequency X
      const ky = 0.010; // wave frequency Y

      // Draw connections between centers (grid lines).
      // To avoid double-drawing, connect only to 3 neighbors (half of directions).
      const halfDirs = [dirs[0], dirs[1], dirs[2]];

      ctx.beginPath();

      for (let i = 0; i < grid.length; i++) {
        const c = grid[i];

        // Deform the center point with a wave + slight noise.
        const n = noise2D(c.x * 0.01 + time * 0.6, c.y * 0.01 - time * 0.4);
        const wave =
          Math.sin(c.x * kx + time * 2.0) * 0.55 +
          Math.sin(c.y * ky - time * 1.6) * 0.45 +
          (n - 0.5) * 0.35;

        const dx = Math.cos(c.y * 0.006 + time) * amplitude * wave * 0.55;
        const dy = Math.sin(c.x * 0.006 - time) * amplitude * wave;

        const x0 = c.x + dx;
        const y0 = c.y + dy;

        for (const [dq, dr] of halfDirs) {
          const q2 = c.q + dq;
          const r2 = c.r + dr;

          // Compute neighbor pixel position directly (no lookup map needed).
          const p2 = axialToPixel(q2, r2, hexSize);
          const xBase = p2.x + width / 2;
          const yBase = p2.y + height / 2;

          const n2 = noise2D(
            xBase * 0.01 + time * 0.6,
            yBase * 0.01 - time * 0.4
          );
          const wave2 =
            Math.sin(xBase * kx + time * 2.0) * 0.55 +
            Math.sin(yBase * ky - time * 1.6) * 0.45 +
            (n2 - 0.5) * 0.35;

          const dx2 = Math.cos(yBase * 0.006 + time) * amplitude * wave2 * 0.55;
          const dy2 = Math.sin(xBase * 0.006 - time) * amplitude * wave2;

          const x1 = xBase + dx2;
          const y1 = yBase + dy2;

          // Fade lines towards the top to mimic "hero fade".
          const fade = Math.min(1, Math.max(0, (y0 / height) * 1.2));
          // We can't easily vary alpha per segment in one path; so we use a trick:
          // draw in batches by quick strokes. For simplicity: just skip very faint segments.
          if (fade < 0.08) continue;

          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
        }
      }

      ctx.stroke();

      // Optional dark fade overlay at the top (like your screenshot).
      const topFade = ctx.createLinearGradient(0, 0, 0, height);
      topFade.addColorStop(0.0, "rgba(0,0,0,0.95)");
      topFade.addColorStop(0.55, "rgba(0,0,0,0.65)");
      topFade.addColorStop(1.0, "rgba(0,0,0,0.0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, width, height);
    };

    // --- Animation loop ------------------------------------------------------

    const loop = (now) => {
      if (!lastTime) lastTime = now;
      const dt = now - lastTime;

      if (dt >= frameInterval) {
        lastTime = now - (dt % frameInterval);
        draw(now);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    // Pause when tab is hidden
    const onVisibility = () => {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else {
        lastTime = 0;
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    const ro = new ResizeObserver(resize);

    resize();
    ro.observe(canvas.parentElement ?? canvas);
    document.addEventListener("visibilitychange", onVisibility);

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hexSize, lineWidth, alpha, speed, amplitude, fps]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
