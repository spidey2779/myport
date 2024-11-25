import { Canvas } from "@react-three/fiber";
import { cn } from "../utils/cn";
import MeshOne from "../components/rtf/MeshOne";
import { OrbitControls } from "@react-three/drei";

const About = () => {
  return (
    <main className={cn("pt-0  ")}>
      <section
        className={cn(
          "grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] h-screen pt-20"
        )}
      >
        <div
          className={cn(
            "bg-black flex flex-col gap-5 p-2 text-white items-center justify-center relative"
          )}
        >
          <div
            className={cn(
              "absolute top-10 left-0 w-full h-[25rem]  flex flex-col items-center justify-center "
            )}
          >
            <Canvas >
              <OrbitControls />
              <group>
                <MeshOne />
              </group>
            </Canvas>
            <p className={cn("text-center")}>
              ~~ "Embrace the flow, pursue your passions, uphold integrity, and
              thrive through setbacks."
            </p>
          </div>
        </div>
        <div className={cn("bg-white")}>
          <h1></h1>
        </div>
      </section>
    </main>
  );
};

export default About;
