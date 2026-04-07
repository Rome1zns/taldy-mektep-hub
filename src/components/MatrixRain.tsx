import { useEffect, useRef } from "react";

/**
 * Fullscreen, fixed-position digital rain background canvas.
 *
 * - Sits behind all content (z-index: -1) and is pointer-events: none.
 * - Honors `prefers-reduced-motion: reduce` by skipping animation entirely
 *   and leaving a static dark background.
 * - Adapts column density and frame rate to viewport width so mobile
 *   devices don't burn battery.
 */
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId = 0;
    let intervalId: number | null = null;
    let drops: number[] = [];
    let fontSize = 16;
    let columns = 0;
    const charset =
      "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]<>+=*";

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Slightly larger glyphs (= fewer columns) on small screens
      fontSize = w < 640 ? 18 : w < 1024 ? 16 : 14;
      columns = Math.ceil(w / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -50);
      // Pre-fill with solid background so the first frames don't show through
      ctx.fillStyle = "#03060A";
      ctx.fillRect(0, 0, w, h);
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Translucent fade — produces the trailing-tail look
      ctx.fillStyle = "rgba(3, 6, 10, 0.08)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px "Share Tech Mono", "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < columns; i++) {
        const text = charset.charAt(Math.floor(Math.random() * charset.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Brighter "head" character, dimmer trailing fill — 1 in ~8 columns
        if (Math.random() > 0.975) {
          ctx.fillStyle = "rgba(200, 255, 210, 0.95)";
        } else {
          ctx.fillStyle = "rgba(0, 255, 65, 0.55)";
        }
        ctx.fillText(text, x, y);

        if (y > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const startAnimated = () => {
      const w = window.innerWidth;
      // Cap framerate on small screens
      if (w < 768) {
        // ~24 fps via setInterval
        intervalId = window.setInterval(draw, 1000 / 24);
      } else {
        let last = 0;
        const targetMs = 1000 / 30; // ~30fps cap on desktop
        const loop = (t: number) => {
          if (t - last >= targetMs) {
            draw();
            last = t;
          }
          rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
      }
    };

    const stopAnimated = () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (intervalId !== null) clearInterval(intervalId);
      rafId = 0;
      intervalId = null;
    };

    const renderStatic = () => {
      // Just a flat dark background — no animation
      ctx.fillStyle = "#03060A";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const handleResize = () => {
      stopAnimated();
      setSize();
      if (reducedMotionQuery.matches) {
        renderStatic();
      } else {
        startAnimated();
      }
    };

    const handleMotionPrefChange = () => {
      stopAnimated();
      if (reducedMotionQuery.matches) {
        renderStatic();
      } else {
        startAnimated();
      }
    };

    setSize();
    if (reducedMotionQuery.matches) {
      renderStatic();
    } else {
      startAnimated();
    }

    window.addEventListener("resize", handleResize);
    if (reducedMotionQuery.addEventListener) {
      reducedMotionQuery.addEventListener("change", handleMotionPrefChange);
    } else {
      // Safari < 14 fallback
      reducedMotionQuery.addListener(handleMotionPrefChange);
    }

    return () => {
      stopAnimated();
      window.removeEventListener("resize", handleResize);
      if (reducedMotionQuery.removeEventListener) {
        reducedMotionQuery.removeEventListener("change", handleMotionPrefChange);
      } else {
        reducedMotionQuery.removeListener(handleMotionPrefChange);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: -1, opacity: 0.22 }}
    />
  );
};

export default MatrixRain;
