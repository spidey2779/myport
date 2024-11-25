import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
const MeshOne = () => {
  const texture = useTexture("/images/myimageOne.jpg");
  const image = useRef<any>(null);
  useFrame((state, delta) => {
    image.current.rotation.y += (delta * 1) / 2;
  });
  return (
    <mesh rotation={[0, 0, 0]} ref={image}>
      <ambientLight intensity={3} />
      {/* <cylinderGeometry args={[2, 2, 3, 30, 30, true]} /> */}
      <boxGeometry args={[3, 3, 3, 20]} />
      <meshStandardMaterial map={texture} transparent side={THREE.DoubleSide} />
    </mesh>
  );
};

export default MeshOne;
