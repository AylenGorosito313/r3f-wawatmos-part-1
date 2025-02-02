import {
  Float,
  OrbitControls,
  PerspectiveCamera,
  PointerLockControls,
  Sparkles,
  SpotLight,
  Stars,
  Text,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Airplane } from "./Airplane";
import { Background } from "./Background";
import { Cloud } from "./Cloud";
import { HouseModel } from "./Hoouse";
import { MoonModel } from "./Moon";
import { MoonModelPoly } from "./MoonPoly";
import { ModelFPS } from "./Fps_animated_carbine";

const LINE_NB_POINTS = 12000;

export const Experience = () => {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -10),
        new THREE.Vector3(-2, 0, -20),
        new THREE.Vector3(-3, 0, -30),
        new THREE.Vector3(0, 0, -40),
        new THREE.Vector3(5, 0, -50),
        new THREE.Vector3(7, 0, -60),
        new THREE.Vector3(5, 0, -70),
        new THREE.Vector3(0, 0, -80),
        new THREE.Vector3(0, 0, -90),
        new THREE.Vector3(0, 0, -100),
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.2);
    shape.lineTo(0, 0.2);

    return shape;
  }, [curve]);

  const cameraGroup = useRef();
  const scroll = useScroll();

  useFrame((_state, delta) => {
    const curPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    );
    const curPoint = linePoints[curPointIndex];
    const pointAhead =
      linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];

    const xDisplacement = (pointAhead.x - curPoint.x) * 80;

    // Math.PI / 2 -> LEFT
    // -Math.PI / 2 -> RIGHT

    const angleRotation =
      (xDisplacement < 0 ? 1 : -1) *
      Math.min(Math.abs(xDisplacement), Math.PI / 3);

    const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        angleRotation
      )
    );
    const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        cameraGroup.current.rotation.x,
        angleRotation,
        cameraGroup.current.rotation.z
      )
    );

    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);
    cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2);

    cameraGroup.current.position.lerp(curPoint, delta * 24);
  });

  const airplane = useRef();
  const cameraRef = useRef();


 
  return (
    <>
      {/* <OrbitControls enableZoom={false} /> */}
      <group ref={cameraGroup}>
        <Background />
        {/* <OrbitControls /> */}
        {/* <PerspectiveCamera position={[0, 0,4]} fov={30} makeDefault /> */}
        <PerspectiveCamera ref={cameraRef} fov={150} makeDefault position={[0, 1.6, 0]} />
        <group ref={airplane}>
          {/* <ModelFPS
            rotation-y={Math.PI / 1}
            scale={[0.5, 0.2, 0.2]}
            position-y={-1}
          /> */}
          <Float floatIntensity={2} speed={2}>
        
            <Airplane
              rotation-y={Math.PI / 2}
              scale={[0.2, 0.2, 0.2]}
              position-y={0.1}
            />
          </Float>
        </group>
      </group>

      {/* text */}
      <group position={[-3, 0, -20]}>
        {" "}
        <Text
          color="white"
          anchorX={"left"}
          anchorY="middle"
          fontSize={0.22}
          maxWidth={2.5}
          font={"https://fonts.gstatic.com"}
        >
          Hi , I am Aylen Gorosito
        </Text>
      </group>

      {/* text */}

      {/* LINE */}
      <group position-y={-2}>
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshStandardMaterial color={"#ebd0f2"} opacity={0.7} transparent />
        </mesh>
      </group>

      {/* CLOUDS */}
      <Cloud opacity={0.5} scale={[0.3, 0.3, 0.3]} position={[-2, 1, -3]} />
      <Cloud opacity={0.5} scale={[0.2, 0.3, 0.4]} position={[1.5, -0.5, -2]} />
      <Cloud
        opacity={0.7}
        scale={[0.3, 0.3, 0.4]}
        rotation-y={Math.PI / 9}
        position={[2, -0.2, -2]}
      />
      <Cloud
        opacity={0.7}
        scale={[0.4, 0.4, 0.4]}
        rotation-y={Math.PI / 9}
        position={[1, -0.2, -12]}
      />
      <Cloud opacity={0.7} scale={[0.5, 0.5, 0.5]} position={[-1, 1, -53]} />
      <Cloud opacity={0.3} scale={[0.8, 0.8, 0.8]} position={[0, 1, -100]} />

      <Suspense>
        <HouseModel scale={[1.2, 1.2, 1.2]} position={[-2, -1, -80]} />
      </Suspense>
      <Suspense>
        <MoonModelPoly scale={[0.2, 0.2, 0.2]} position={[-20, 10, -120]} />
      </Suspense>
      <Sparkles
        opacity={0.5}
        speed={0.1}
        width={"100%"}
        depth={10.5}
        scale={[5, 5, 5]}
        count={5000}
        size={0.5}
        segments={200}
        distance={450000}
        radius={100}
        position={[0, 1, -100]}
      />

      <Sparkles
        opacity={2.5}
        speed={0.1}
        width={"100%"}
        depth={10.5}
        scale={[5, 5, 5]}
        count={5000}
        size={0.5}
        segments={100}
        distance={450000}
        radius={100}
        position={[-2, 1, -80]}
      />

      <Sparkles
        opacity={2.5}
        speed={0.1}
        width={"100%"}
        depth={10.5}
        scale={[5, 5, 5]}
        count={5000}
        size={0.5}
        segments={100}
        distance={450000}
        radius={500}
        position={[0, 1, -20]}
      />
      <Sparkles
        opacity={2.5}
        speed={0.1}
        width={"100%"}
        depth={10.5}
        scale={[5, 5, 5]}
        count={5000}
        size={0.5}
        segments={100}
        radius={500}
        distance={450000}
        position={[0, 1, -10]}
      />

      <Sparkles
        opacity={2.5}
        speed={0.1}
        width={"100%"}
        depth={10.5}
        scale={[5, 5, 5]}
        count={5000}
        size={0.5}
        segments={100}
        radius={500}
        distance={450000}
        position={[0, 1, 0]}
      />
    </>
  );
};
