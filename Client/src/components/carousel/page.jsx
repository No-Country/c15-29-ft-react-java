import SimpleCarousel from "@/components/carousel/SimpleCarousel";
import { Image } from "@nextui-org/react";
import React from "react";

export default function Carousel() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }} >
      <Image src="carrouselFirstAsset.png" alt="carrouselSprite" className="animate-raining absolute top-0 left-0" width="150px" height="auto" />
      <Image src="carrouselSecondAsset.png" alt="carrouselSprite" className="animate-raining absolute top-0 left-0" width="150px" height="auto" />
      <Image src="carrouselThirdAsset.png" alt="carrouselSprite" className="animate-raining absolute top-0 left-0" width="150px" height="auto" />
      <div className="pt-64">
        <SimpleCarousel />
      </div>
    </div>
  );
}
