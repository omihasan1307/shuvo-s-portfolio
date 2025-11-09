/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Volume2, VolumeX } from "lucide-react";

const projects = [
  {
    id: 5,
    videoId: "gbEaEmgQd2E",
  },
  {
    id: 1,
    videoId: "7yxMlyEscVE",
  },
  {
    id: 2,
    videoId: "HHJSdamG4W4",
  },
  {
    id: 6,
    videoId: "vImbKjlTJtY",
  },
  {
    id: 3,
    videoId: "nXa3kTdHTwI",
  },
];

export const Work = () => {
  const [mutedStates, setMutedStates] = useState<{ [key: number]: boolean }>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const iframeRefs = useRef<{ [key: number]: HTMLIFrameElement | null }>({});
  const carouselRef = useRef<any>(null);

  // Initialize all videos as muted
  useEffect(() => {
    const initialMutedStates: { [key: number]: boolean } = {};
    projects.forEach((project) => {
      initialMutedStates[project.id] = true;
    });
    setMutedStates(initialMutedStates);
  }, []);

  // Set up carousel API and slide change listener
  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", handleSelect);
    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi]);

  // Get iframe URL with all UI removed and autoplay enabled
  const getIframeUrl = (videoId: string, muted: boolean) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${
      muted ? 1 : 0
    }&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&loop=1&playlist=${videoId}&disablekb=1&playsinline=1&vq=hd1080&enablejsapi=1&widget_referrer=null`;
  };

  // Reliable mute toggle without restarting video
  const toggleMute = useCallback((id: number, e: React.MouseEvent) => {
    e.stopPropagation();

    setMutedStates((prev) => {
      const newMuted = !prev[id];
      const iframe = iframeRefs.current[id];

      if (iframe && iframe.contentWindow) {
        // Use YouTube API to toggle mute without restarting
        if (newMuted) {
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"mute","args":""}',
            "*"
          );
        } else {
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"unMute","args":""}',
            "*"
          );
        }
      }

      return { ...prev, [id]: newMuted };
    });
  }, []);

  // Auto-play visible project and ensure videos are always running
  useEffect(() => {
    if (!carouselRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const projectId = parseInt(
            entry.target.getAttribute("data-project-id") || ""
          );
          if (!projectId) return;

          const iframe = iframeRefs.current[projectId];
          if (!iframe || !iframe.contentWindow) return;

          if (entry.isIntersecting) {
            // Ensure video is playing when visible
            setTimeout(() => {
              iframe.contentWindow?.postMessage(
                '{"event":"command","func":"playVideo","args":""}',
                "*"
              );
            }, 300);
          }
        });
      },
      {
        threshold: 0.7,
        rootMargin: "50px",
      }
    );

    // Observe all project containers
    projects.forEach((project) => {
      const element = document.getElementById(
        `project-container-${project.id}`
      );
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Initialize all videos to play automatically
  useEffect(() => {
    const timer = setTimeout(() => {
      projects.forEach((project) => {
        const iframe = iframeRefs.current[project.id];
        if (iframe && iframe.contentWindow) {
          // Start playing all videos initially (muted)
          setTimeout(() => {
            iframe.contentWindow?.postMessage(
              '{"event":"command","func":"playVideo","args":""}',
              "*"
            );
          }, 500);
        }
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="work" className="py-20 bg-background/50">
      <div className="px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Landscape Video</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of recent projects in motion design and animation
          </p>
        </div>

        <div className="container mx-auto">
          <Carousel
            ref={carouselRef}
            setApi={setCarouselApi}
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4">
              {projects.map((project, index) => (
                <CarouselItem
                  key={project.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/2 xl:basis-full"
                >
                  <Card
                    id={`project-container-${project.id}`}
                    data-project-id={project.id}
                    className="bg-card border-border overflow-hidden group hover:scale-[1.02] transition-all duration-300 cursor-pointer h-full"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {/* 🎥 YouTube iframe with clean UI */}
                    <div className="relative aspect-video overflow-hidden">
                      <iframe
                        ref={(el) => (iframeRefs.current[project.id] = el)}
                        src={getIframeUrl(project.videoId, true)}
                        className="w-full h-full pointer-events-none"
                        title={"project.title"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />

                      {/* Mute/Unmute button */}
                      <button
                        onClick={(e) => toggleMute(project.id, e)}
                        className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-90 hover:opacity-100 transition-all duration-200 hover:scale-110 hover:bg-black/80 z-10"
                      >
                        {mutedStates[project.id] ? (
                          <VolumeX className="w-5 h-5 text-white" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-white" />
                        )}
                      </button>

                      {/* Sound indicator */}
                      {!mutedStates[project.id] && (
                        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-red-500/90 backdrop-blur-sm z-10">
                          <span className="text-white text-xs font-semibold">
                            SOUND ON
                          </span>
                        </div>
                      )}

                      {/* Video counter */}
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm z-10">
                        <span className="text-white text-sm font-medium">
                          {index + 1} / {projects.length}
                        </span>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 hidden md:flex" />
            <CarouselNext className="right-0 hidden md:flex" />

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (carouselApi) {
                      carouselApi.scrollTo(index);
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-primary scale-110"
                      : "bg-gray-400 hover:bg-gray-600"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};