"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { VIDEO_DEPOIMENTOS } from "@/lib/content";

/**
 * Facade do YouTube: mostra a thumbnail local e só carrega o iframe no clique.
 * Evita ~700 kB de scripts de terceiros no carregamento inicial.
 */
function VideoCard({
  id,
  name,
  thumb,
}: {
  id: string;
  name: string;
  thumb: StaticImageData;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={`Depoimento de ${name}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full rounded-[20px] border-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Reproduzir o depoimento de ${name}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-[20px]"
    >
      <Image
        src={thumb}
        alt=""
        fill
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
      <span className="absolute inset-0 grid place-items-center bg-brand-950/25 transition-colors group-hover:bg-brand-950/10">
        <span className="grid size-16 place-items-center rounded-full bg-cream/90 text-brand-800 transition-transform group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          <Play className="size-7 translate-x-0.5 fill-current" aria-hidden />
        </span>
      </span>
    </button>
  );
}

export function VideoCarousel() {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="w-full"
      aria-label="Depoimentos em vídeo"
    >
      <CarouselContent className="-ml-4">
        {VIDEO_DEPOIMENTOS.map((video) => (
          <CarouselItem
            key={video.id}
            className="pl-4 sm:basis-1/2 lg:basis-1/3"
          >
            <div className="flex flex-col gap-3">
              <VideoCard
                id={video.id}
                name={video.name}
                thumb={video.thumb}
              />
              <div className="text-center sm:text-left">
                <h3 className="text-[20px] text-cream sm:text-[22px]">
                  {video.name}
                </h3>
                <p className="text-[14px] text-cream/75 sm:text-[15px]">
                  {video.subtitle}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden border-cream/30 bg-brand-900/60 text-cream hover:bg-brand-800 hover:text-cream sm:flex" />
      <CarouselNext className="hidden border-cream/30 bg-brand-900/60 text-cream hover:bg-brand-800 hover:text-cream sm:flex" />
    </Carousel>
  );
}
