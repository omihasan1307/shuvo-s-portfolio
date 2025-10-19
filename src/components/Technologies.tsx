import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

import {
  SiFigma,
  SiAdobecreativecloud,
  SiBlender,
  SiDavinciresolve,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiUnrealengine,
  SiUnity,
  SiAdobeaftereffects,
  SiCinema4D,
} from "react-icons/si";

const technologies = [
  { name: "Figma", icon: <SiFigma /> },
  { name: "Adobe Premiere Pro", icon: <SiAdobecreativecloud /> },
  { name: "After Effects", icon: <SiAdobeaftereffects /> },
  { name: "DaVinci Resolve", icon: <SiDavinciresolve /> },
  { name: "Photoshop", icon: <SiAdobephotoshop /> },
  { name: "Illustrator", icon: <SiAdobeillustrator /> },
];

export const Technologies = () => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
    },
    [
      AutoScroll({
        playOnInit: true,
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  return (
    <section id="technology" className="py-16 bg-secondary/50 overflow-hidden">
      <div className="container mx-auto px-6 mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="text-gradient">Technologies & Tools</span>
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Expertise in industry-leading creative software and tools
        </p>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {/* Duplicate the array to ensure seamless loop */}
          {[...technologies, ...technologies].map((tech, index) => (
            <div key={index} className="flex-[0_0_280px] min-w-0">
              <div className="bg-card border border-border rounded-xl p-6 hover-lift cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                      {tech.name}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
