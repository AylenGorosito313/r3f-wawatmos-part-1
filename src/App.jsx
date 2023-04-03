import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overley";

function App() {
  return (
    <>
      <Canvas>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={3} damping={0.3}>
          <Experience />
          {/* <Overlay/> */}
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default App;
