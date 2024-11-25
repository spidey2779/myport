import { useEffect, useRef } from "react";
import { useAnimationFrame } from "framer-motion";

interface Dot {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
}

export const useCanvasAnimation = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  heroRef: React.RefObject<HTMLDivElement>
) => {
  const dotsRef = useRef<Dot[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const mouseRef = useRef<{ x: number | undefined; y: number | undefined }>({
    x: undefined,
    y: undefined,
  });

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !hero || !ctx) return;
    ctxRef.current = ctx;

    const arrayColors: string[] = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#FF33A1",
      "#33FFF5",
      "#FFD733",
      "#D733FF",
      "#FF9133",
      "#33FF8D",
      "#5733FF",
    ];

    const handleResize = () => {
      if (!canvas || !ctx) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      dotsRef.current = [];
      for (let i = 1; i <= 50; i++) {
        dotsRef.current.push({
          x: Math.floor(Math.random() * canvas.width),
          y: Math.floor(Math.random() * canvas.height),
          size: Math.random() * 2 + 4,
          color: arrayColors[Math.floor(Math.random() * arrayColors.length)],
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
        });
      }
    };

    hero.addEventListener("mousemove", onMouseMove);
    hero.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      hero.removeEventListener("mousemove", onMouseMove);
      hero.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef, heroRef]);

  const onMouseMove = (e: MouseEvent) => {
    const mousePosition = mouseRef.current;
    const hero = heroRef.current;
    if (!hero) return;
    mousePosition.x = e.pageX - hero.getBoundingClientRect().left;
    mousePosition.y = e.pageY - hero.getBoundingClientRect().top;
  };

  const onMouseLeave = () => {
    const mousePosition = mouseRef.current;
    mousePosition.x = undefined;
    mousePosition.y = undefined;
  };

  const updateDots = (delta: number) => {
    const dots = dotsRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const deltaFactor = delta * 0 + 1; // Adjust this value to control the speed
    dots.forEach((dot) => {
      dot.x += dot.speedX * deltaFactor;
      dot.y += dot.speedY * deltaFactor;

      if (dot.x < 0 || dot.x > canvas.width) dot.speedX *= -1;
      if (dot.y < 0 || dot.y > canvas.height) dot.speedY *= -1;
    });
  };

  const drawDots = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const dots = dotsRef.current;
    dots.forEach((dot) => {
      ctx.fillStyle = dot.color;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
      ctx.fill();
    });

    const mousePosition = mouseRef.current;
    if (mousePosition.x !== undefined && mousePosition.y !== undefined) {
      dots.forEach((dot) => {
        const distance: number = Math.sqrt(
          ((mousePosition.x as number) - dot.x) ** 2 +
            ((mousePosition.y as number) - dot.y) ** 2
        );
        if (distance < 200) {
          ctx.strokeStyle = dot.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(mousePosition.x as number, mousePosition.y as number);
          ctx.lineTo(dot.x, dot.y);
          ctx.stroke();
        }
      });
    }
  };

  useAnimationFrame((delta) => {
    updateDots(delta);
    drawDots();
  });
};
