import { useEffect, useRef, useState } from 'react';
import './CursorTrail.css';

const POINT_COUNT = 120;
const HEAD_EASE = 0.19;
const RIBBON_HEAD_WIDTH = 13.5;
const RIBBON_TAIL_WIDTH = 0.08;
const SMOOTHING_PASSES = 2;

const lerp = (start, end, alpha) => start + (end - start) * alpha;
const midpoint = (first, second) => ({
  x: (first.x + second.x) * 0.5,
  y: (first.y + second.y) * 0.5,
});

const smoothPoints = (points, passes = 1) => {
  let smoothed = points;

  for (let pass = 0; pass < passes; pass += 1) {
    if (smoothed.length < 3) {
      return smoothed;
    }

    const next = [smoothed[0]];

    for (let index = 0; index < smoothed.length - 1; index += 1) {
      const current = smoothed[index];
      const following = smoothed[index + 1];

      next.push({
        x: current.x * 0.75 + following.x * 0.25,
        y: current.y * 0.75 + following.y * 0.25,
      });
      next.push({
        x: current.x * 0.25 + following.x * 0.75,
        y: current.y * 0.25 + following.y * 0.75,
      });
    }

    next.push(smoothed[smoothed.length - 1]);
    smoothed = next;
  }

  return smoothed;
};

export default function CursorTrail() {
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !isReducedMotion;
  });

  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const headRef = useRef({ x: 0, y: 0 });
  const hasInteractionRef = useRef(false);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const pointsRef = useRef(
    Array.from({ length: POINT_COUNT }, () => ({
      x: 0,
      y: 0,
    }))
  );

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) {
      return undefined;
    }

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      sizeRef.current = { width, height, dpr };

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
    };

    const startX = window.innerWidth * 0.5;
    const startY = window.innerHeight * 0.5;

    mouseRef.current = { x: startX, y: startY };
    headRef.current = { x: startX, y: startY };
    pointsRef.current = pointsRef.current.map(() => ({ x: startX, y: startY }));
    hasInteractionRef.current = false;

    document.body.classList.add('cursor-trail-active');
    setCanvasSize();

    const updatePointer = (clientX, clientY) => {
      hasInteractionRef.current = true;
      mouseRef.current.x = clientX;
      mouseRef.current.y = clientY;
    };

    const handlePointerMove = (event) => {
      updatePointer(event.clientX, event.clientY);
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }

      updatePointer(touch.clientX, touch.clientY);
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = headRef.current.x;
      mouseRef.current.y = headRef.current.y;
    };

    const drawRibbon = () => {
      const { width, height } = sizeRef.current;
      const points = pointsRef.current;
      const mouse = mouseRef.current;
      const head = headRef.current;

      head.x = lerp(head.x, mouse.x, HEAD_EASE);
      head.y = lerp(head.y, mouse.y, HEAD_EASE);

      points.unshift({ x: head.x, y: head.y });
      if (points.length > POINT_COUNT) {
        points.length = POINT_COUNT;
      }

      context.clearRect(0, 0, width, height);

      if (!hasInteractionRef.current) {
        frameRef.current = window.requestAnimationFrame(drawRibbon);
        return;
      }

      context.lineCap = 'round';
      context.lineJoin = 'round';

      const ribbonPoints = smoothPoints(points, SMOOTHING_PASSES);

      if (ribbonPoints.length > 2) {
        const first = ribbonPoints[0];
        const second = ribbonPoints[1];
        const headEnd = midpoint(first, second);

        context.beginPath();
        context.strokeStyle = 'rgba(0, 0, 0, 1)';
        context.lineWidth = RIBBON_HEAD_WIDTH;
        context.moveTo(first.x, first.y);
        context.lineTo(headEnd.x, headEnd.y);
        context.stroke();

        for (let index = 0; index < ribbonPoints.length - 2; index += 1) {
          const current = ribbonPoints[index];
          const next = ribbonPoints[index + 1];
          const afterNext = ribbonPoints[index + 2];
          const start = midpoint(current, next);
          const end = midpoint(next, afterNext);
          const progress = index / (ribbonPoints.length - 3 || 1);
          const lineWidth = lerp(
            RIBBON_HEAD_WIDTH,
            RIBBON_TAIL_WIDTH,
            Math.pow(progress, 0.72)
          );

          context.beginPath();
          context.strokeStyle = 'rgba(0, 0, 0, 1)';
          context.lineWidth = lineWidth;
          context.moveTo(start.x, start.y);
          context.quadraticCurveTo(next.x, next.y, end.x, end.y);
          context.stroke();
        }
      }

      frameRef.current = window.requestAnimationFrame(drawRibbon);
    };

    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    frameRef.current = window.requestAnimationFrame(drawRibbon);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.cancelAnimationFrame(frameRef.current);
      context.clearRect(0, 0, sizeRef.current.width, sizeRef.current.height);
      document.body.classList.remove('cursor-trail-active');
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div className="cursor-trail" aria-hidden="true">
      <canvas ref={canvasRef} className="cursor-trail__canvas" />
    </div>
  );
}
