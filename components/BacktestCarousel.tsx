"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BacktestCarouselProps {
  botId: string;
  pairName: string;
}

export const BacktestCarousel = ({ botId, pairName }: BacktestCarouselProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    `/images/backtests/${botId}_${pairName}.png`,
    `/images/backtests/${botId}_${pairName}1.png`,
  ];

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative h-[250px] w-full bg-muted flex items-center justify-center rounded overflow-hidden">
      <Image
        src={images[currentImage]}
        alt={`Backtest ${pairName}`}
        width={400}
        height={250}
        className="object-contain rounded"
      />
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-1"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-1"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};
