import { Environment, ContactShadows } from "@react-three/drei";
import Stethoscope from "./Stethoscope";

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <Stethoscope />
      <ContactShadows opacity={0.4} blur={2} far={5} position={[0, -1.5, 0]} />
      <Environment preset="city" />
    </>
  );
}
