"use client";
import React, { useEffect } from "react";
import Play from "./play";

export default function Three() {
  useEffect(() => {
    Play.init();
    return () => {};
  }, []);

  return (
    <div>
      <canvas
        style={{ width: "100vw", height: "50vh", display: "block" }}
        id="three"
      />
    </div>
  );
}
