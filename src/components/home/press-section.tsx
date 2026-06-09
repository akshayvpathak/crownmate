import Image from "next/image";
import { images } from "@/data/images";

const pressLogos = [
  { src: images.press.interviewer, alt: "Interviewer" },
  { src: images.press.indianBusinessTimes, alt: "Indian Business Times" },
  { src: images.press.mediaHindustan, alt: "Media Hindustan" },
];

export function PressSection() {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-frizty">
        <h2 className="section-heading mb-6 text-center md:mb-10">In The News</h2>
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-14">
          {pressLogos.map((logo) => (
            <div
              key={logo.alt}
              className="relative h-8 w-24 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 sm:h-10 sm:w-28 md:h-12 md:w-36"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes="144px"
                className="object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
