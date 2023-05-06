import React, { useState } from "react";
import Model from "./Model";
import Model2 from "./Model2";
import { useDispatch } from "react-redux";
import { colorUpdate } from "./store/colorSlice";

export default function App() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);

  return (
    <div className="w-[100%] h-[100vh]">
      <div onClick={() => setVisible(!visible)} className="fixed z-[1]">
        THREE
      </div>
      {visible ? (
        <div className="w-[100%] h-[100%]">
          <Model />
        </div>
      ) : (
        <div className="w-[100%] h-[100%]">
          <Model2 />
        </div>
      )}
    </div>
  );
}
