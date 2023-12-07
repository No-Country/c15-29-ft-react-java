"use client";

import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";

export default function SimpleCarousel() {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    // Puedes realizar alguna lógica para obtener los textos dinámicamente si es necesario
    // Después de obtener los textos, actualiza el estado
    setTexts([
      "Cool Pets looking for a Family",
      "Tons of Love",
      "Tips for Newly and Undecided Pet Parents",
      "Life changing Stories",
    ]);
  }, []);

  const slideTemplate = (text) => {
    return (
      <div className="text-center py-5 px-3">
        <div>
          <h4 className="mb-1  text-3xl">{text}</h4>
          <div className="mt-5">
            {text == "Cool Pets looking for a Family" ||
            text == "Tons of Love" ? (
              <Button
                label="Find love"
                className=" w-40 h-10 rounded-3xl text-lg bg-neutral-800 text-stone-200 p-button p-button-rounded"
              />
            ) : (
              <Button
                label="Read More"
                className=" w-40 h-10 rounded-3xl text-lg  bg-neutral-800 text-stone-200 p-button p-button-rounded"
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className=" text-3xl card mt-36 mt-96 pt-96">
      <style>{`
        .custom-carousel .p-carousel-prev-icon,
        .custom-carousel .p-carousel-next {
          display: none;
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
