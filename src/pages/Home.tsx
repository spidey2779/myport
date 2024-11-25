import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { useCanvasAnimation } from "../hooks/useCanvasAnimation";

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const MyDuration = 0.25;
  const MyDelay = 0.1;
  useCanvasAnimation(canvasRef, heroRef);

  return (
    <motion.div
      className={cn(
        "hero overflow-y-auto  z-10 relative h-screen"
        // " h-[calc(100vh-14*.25rem)] md:h-[calc(100vh-20*.25rem)]"
      )}
      ref={heroRef}
    >
      <canvas
        id="canvas"
        ref={canvasRef}
        className={cn("bg-black")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -11,
          pointerEvents: "none",
        }}
      />
      {/* <motion.div
        className={cn(
          "text-white text-2xl md:text-6xl fixed top-1/2 left-[-1%]  translate-x-1/4 translate-y-1/4 font-['Ga_Maamli'] welcome "
        )}
      >
        <motion.span> Welcome To </motion.span>
        <motion.span>My Portfolio</motion.span>
      </motion.div> */}
      <motion.div
        className={cn(
          "z-10 absolute text-white flex flex-col pl-7 md:pl-[5rem] py-[7rem] font-semibold select-none overflow-hidden w-fit"
        )}
      >
        <motion.div className="  overflow-hidden leading-loose ">
          <motion.span
            className={cn("text-3xl md:text-5xl ")}
            style={{ display: "block" }}
            initial={{ y: "-110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hello ,
          </motion.span>
        </motion.div>
        <motion.div
          className={cn(
            "text-4xl md:text-5xl flex items-center  overflow-hidden  p-3 md:p-5"
          )}
        >
          <motion.span
            initial={{ x: "-110%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.5 }}
            className={cn("md:leading-loose")}
          >
            I am
          </motion.span>
          <motion.span
            className={cn(
              " text-6xl md:text-8xl  overflow-hidden uppercase relative  "
            )}
            initial="initial"
            animate={{
              scale: [0, 1.1, 0.9, 1], // x position at each keyframe
              transition: {
                delay: 0.2,
                duration: 1, // total duration of the animation
                times: [0, 0.5, 0.75, 1],
                ease: "easeInOut", // easing function
              },
            }}
            whileHover="animate"
          >
            <div className={cn("")}>
              {"Teja".split("").map((item, i) => {
                return (
                  <motion.span
                    className={cn("inline-block ")}
                    key={i}
                    variants={{
                      initial: {
                        y: 0,
                      },
                      animate: {
                        y: "-100%",
                        transition: {
                          duration: MyDuration,
                          delay: MyDelay * i,
                          ease: "easeInOut",
                        },
                      },
                    }}
                  >
                    {item}
                  </motion.span>
                );
              })}
            </div>
            <div className={cn("absolute top-0 ")}>
              {"Teja".split("").map((item, i) => {
                return (
                  <motion.span
                    className={cn(" inline-block ")}
                    key={i}
                    variants={{
                      initial: {
                        y: "100%",
                      },
                      animate: {
                        y: 0,
                        transition: {
                          duration: MyDuration,
                          delay: MyDelay * i,
                          ease: "easeInOut",
                        },
                      },
                    }}
                  >
                    {item}
                  </motion.span>
                );
              })}
            </div>
          </motion.span>
        </motion.div>
        <motion.div className={cn("overflow-hidden")}>
          <motion.span
            className={cn("text-3xl tracking-tighter md:text-7xl ")}
            style={{ display: "block" }}
            initial={{ y: "130%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Full Stack Developer
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
