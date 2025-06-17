"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface BacktestCarouselProps {
  botId: string;
  pairName: string;
}

export const BacktestCarousel = ({ botId, pairName }: BacktestCarouselProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const images = [
    `/images/backtests/${botId}_${pairName}.png`,
    `/images/backtests/${botId}_${pairName}1.png`,
  ];

  const prev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <>
      {/* Carrusel mini */}
      <div
        className="relative h-[250px] w-full bg-muted flex items-center justify-center rounded overflow-hidden cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={images[currentImage]}
          alt={`Backtest ${pairName}`}
          width={400}
          height={250}
          className="object-contain rounded transition duration-300 group-hover:scale-[1.01]"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-1"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-1"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Modal de imagen grande */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-fadeIn">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white bg-black/60 p-2 rounded-full hover:bg-black"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={prev}
            className="absolute left-4 text-white bg-black/40 p-2 rounded-full hover:bg-black"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <Image
            src={images[currentImage]}
            alt={`Backtest ampliado ${pairName}`}
            width={1000}
            height={600}
            className="max-w-full max-h-full object-contain rounded shadow-xl transition-all duration-300"
          />

          <button
            onClick={next}
            className="absolute right-4 text-white bg-black/40 p-2 rounded-full hover:bg-black"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
};
