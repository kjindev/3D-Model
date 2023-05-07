import React, { useEffect, useRef, useState } from "react";
import Cube from "./Cube";
import Dodecahedron from "./Dodecahedron";
import { useDispatch } from "react-redux";
import { colorUpdate } from "./store/colorSlice";

import { Vector3 } from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, SpotLight } from "@react-three/drei";

function Model() {
  const dispatch = useDispatch();
  const [light, setLight] = useState(true);
  const [model, setModel] = useState(true);

  const handleLight = (event) => {
    const name = event.target.innerText;
    if (name === "Light On") {
      setLight(true);
    } else if (name === "Light Off") {
      setLight(false);
    }
  };

  const handleModel = (event) => {
    const name = event.target.innerText;
    if (name === "Cube") {
      setModel(true);
    } else if (name === "Dodecahedron") {
      setModel(false);
    }
  };

  const handleColor = (event) => {
    const color = event.target.id;
    if (color !== "") {
      dispatch(colorUpdate(color));
    }
  };

  const MovingSpot = ({ vec = new Vector3(), ...props }) => {
    const light = useRef();
    const viewport = useThree((state) => state.viewport);
    useFrame((state) => {
      light.current.target.position.lerp(
        vec.set(
          (state.mouse.x * viewport.width) / 2,
          (state.mouse.y * viewport.height) / 2,
          0
        ),
        0.1
      );
      light.current.target.updateMatrixWorld();
    });
    return (
      <SpotLight
        ref={light}
        distance={5}
        angle={0.3}
        attenuation={5}
        anglePower={3}
        {...props}
      />
    );
  };
  const Caption = ({ children }) => {
    const { width } = useThree((state) => state.viewport);
    const [size, setSize] = useState(width / 9);
    const [position, setPosition] = useState([0, 0, -5]);

    useEffect(() => {
      if (width >= 8 && width < 12) {
        setSize(width / 6);
      } else if (width > 0 && width < 8) {
        setSize(width / 4);
      } else {
        setSize(width / 9);
      }
    }, [width]);

    useEffect(() => {
      if (width > 0 && width < 6) {
        setPosition([0, 2, -5]);
      } else if (width >= 6 && width < 8) {
        setPosition([0, 1, -5]);
      } else {
        setPosition([0, 0, -5]);
      }
    }, [width]);

    return (
      <Text
        position={position}
        lineHeight={0.9}
        fontSize={size}
        anchorX="center"
        anchorY="middle"
      >
        {children}
      </Text>
    );
  };

  return (
    <>
      <Canvas>
        {light && <MovingSpot position={[2, 2, 0]} />}
        <pointLight position={[10, 10, -10]} color="gray" />
        <pointLight position={[-10, -10, 10]} color="white" />
        {model ? <Cube /> : <Dodecahedron />}
        <Caption>{`Art is\nanything\nyou can\nget away with.`}</Caption>
      </Canvas>
      <div className="fixed z-[2] top-[80%] md:top-[85%] left-[50%] translate-x-[-50%] translate-y-[-50%] hover:cursor-pointer ">
        <div onClick={handleColor} className="flex p-2">
          <div
            id="#ffffff"
            className="mx-1 bg-white w-[30px] h-[30px] rounded-full"
          ></div>
          <div
            id="#ef4444"
            className="mx-1 bg-[#ef4444] w-[30px] h-[30px] rounded-full"
          ></div>
          <div
            id="#eab308"
            className="mx-1 bg-[#eab308] w-[30px] h-[30px] rounded-full"
          ></div>
          <div
            id="#84cc16"
            className="mx-1 bg-[#84cc16] w-[30px] h-[30px] rounded-full"
          ></div>
          <div
            id="#06b6d4"
            className="mx-1 bg-[#06b6d4] w-[30px] h-[30px] rounded-full"
          ></div>
          <div
            id="#8b5cf6"
            className="mx-1 bg-[#8b5cf6] w-[30px] h-[30px] rounded-full"
          ></div>
        </div>
        <div onClick={handleModel} className="flex justify-center text-center">
          <span className="px-2 py-1 m-2 bg-white hover:bg-gray-400 ">
            Cube
          </span>
          <span className="px-2 py-1 m-2 bg-white hover:bg-gray-400 ">
            Dodecahedron
          </span>
        </div>
        <div onClick={handleLight} className="text-center text-white p-2">
          {light ? "Light Off" : "Light On"}
        </div>
      </div>
    </>
  );
}
export default Model;
