import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import {
  AnimatePresence,
  cubicBezier,
  motion,
  useAnimate,
} from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../store";
const MouseFollower = () => {
  const [mouseIn, setMouseIn] = useState(false);
  const [scope, animate] = useAnimate();
  const ref = useRef(null);
  const { showCursor, mouseBackground } = useSelector(
    (state: RootState) => state.sliceOne
  );
  const mouseEnter = () => {
    setMouseIn(() => true);
  };
  const mouseLeave = () => {
    setMouseIn(() => false);
  };
  const mouseMove = (e: MouseEvent) => {
    if (ref.current) {
      // Calculate distortions based on mouse position
      const scaleX = 1 + Math.sin(e.clientY * 0.01) * 0.2;
      const scaleY = 1 + Math.cos(e.clientX * 0.01) * 0.2;
      animate(
        ref.current,
        {
          x: e.clientX - 22,
          y: e.clientY - 22,
          scaleX,
          scaleY,
          // rotate: e.clientX,
          // borderRadius: [`${Math.abs(e.clientX - e.clientY)}px`, "100px"],
        },
        {
          type: "spring",
          ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
          stiffness: 50,
          damping: 50,
          mass: 10,
          velocity: 1,
          duration: 0,
        }
      );
    }
  };
  useEffect(() => {
    window.addEventListener("mouseover", mouseEnter);
    window.addEventListener("mouseout", mouseLeave);
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mouseover", mouseEnter);
      window.removeEventListener("mouseout", mouseLeave);
      window.removeEventListener("mousemove", mouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AnimatePresence>
        <div
          ref={scope}
          className="fixed hidden md:block h-screen w-full pointer-events-none  top-0 left-0 right-0 bottom-0 "
        >
          {mouseIn && showCursor && (
            <motion.div
              ref={ref}
              className={cn(
                "w-fit h-fit rounded-fullfixed  pointer-events-auto "
              )}
              variants={{
                hidden: {
                  y: -100,
                  opacity: 0,
                  scale: 0.5,
                  transition: { duration: 0.5 },
                },
                visible: {
                  opacity: 1,
                  scale: [0.8, 1.3, 0.8, 1],
                  transition: { duration: 1.5 },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: "spring" }}
            >
              <motion.div
                className={cn(
                  "h-12 w-12  rounded-full ",
                  "border-b-black border-t-zinc-900 border-t-[2px]  border-b-[2px] "
                )}
                style={{
                  backgroundColor: mouseBackground,
                }}
                // initial={{ rotate: 0 }}
                animate={{
                  rotate: [0, 360],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                whileTap={{
                  scale: 0.6,
                  rotate: 0,
                  opacity: 0.8,
                  backgroundColor: "#53cada89",
                  transition: { type: "spring", duration: 0.25 },
                }}
              ></motion.div>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </>
  );
};

export default MouseFollower;
