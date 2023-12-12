import SimpleCarousel from "@/components/carousel/SimpleCarousel";
import React from "react";

export default function Carousel() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="./doggy1.mp4" type="video/mp4" />
      </video>
      <div className="  pt-72">
        <SimpleCarousel />
      </div>
    </div>
  );
}
