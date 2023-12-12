"use client";

import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";

export default function SimpleCarousel() {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    setTexts([
      "Cool Pets looking for a Family",
      "Tons of Love",
      "Tips for Newly and Undecided Pet Parents",
      "Life-changing Stories",
    ]);
  }, []);

  const slideTemplate = (text) => {
    return (
      <div className="text-stone-200 carousel-slide">
        <div className="text-center py-5 px-3 content-overlay ">
          <div>
            <h4
              className="mb-1 text-stone-200  text-3xl"
              style={{ color: "w" }}
            >
              {text}
            </h4>
            <div className="mt-5">
              {text === "Cool Pets looking for a Family" ||
              text === "Tons of Love" ? (
                <Button
                  label="Find love"
                  className="w-40 h-10 rounded-3xl text-lg bg-neutral-800 text-stone-200 p-button p-button-rounded"
                />
              ) : (
                <Button
                  label="Read More"
                  className="w-40 h-10 rounded-3xl text-lg bg-neutral-800 text-stone-200 p-button p-button-rounded"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="text-3xl  card ">
      <style>{`
       .custom-carousel{
        color:white
       }
        .custom-carousel .p-carousel-prev-icon,
        .custom-carousel .p-carousel-next {
          display: none;
        }
        .carousel-slide {
          position: relative;
          width: 100%;
          height: 100vh; /* Ajusta la altura a tu necesidad */
        }
        
        .content-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <Carousel
        value={texts}
        numVisible={1}
        numScroll={1}
        className="custom-carousel"
        circular
        autoplayInterval={3000}
        itemTemplate={slideTemplate}
      />
    </div>
  );
}
