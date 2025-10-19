/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Volume2, VolumeX } from "lucide-react";

const projects = [
  {
    title: "Brand Animation",
    category: "Motion Graphics",
    description: "Dynamic brand identity animation with fluid transitions and modern aesthetics.",
    videoId: "7yxMlyEscVE",
    tags: ["After Effects", "Animation", "Branding"],
  },
  {
    title: "Kinetic Typography",
    category: "Typography",
    description: "Engaging typographic animation for social media campaign with bold visual impact.",
    videoId: "HHJSdamG4W4",
    tags: ["Typography", "Social Media", "Design"],
  },
  {
    title: "Motion Design Reel",
    category: "Showreel",
    description: "Collection of best motion design projects showcasing various styles and techniques.",
    videoId: "nXa3kTdHTwI",
    tags: ["Showreel", "Motion Design", "Animation"],
  },
];

export const Work = () => {
  const [mutedStates, setMutedStates] = useState<boolean[]>(
    Array(projects.length).fill(true)
  );
  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);

  // Get iframe URL with all UI removed
  const getIframeUrl = (videoId: string, muted: boolean) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&loop=1&playlist=${videoId}&disablekb=1&playsinline=1&vq=hd1080&enablejsapi=1`;
  };

  // Reliable mute toggle without restarting video
  const toggleMute = useCallback((index: number) => {
    const iframe = iframeRefs.current[index];
    if (!iframe || !iframe.contentWindow) return;

    setMutedStates(prev => {
      const newMuted = !prev[index];
      
      // Use YouTube API to toggle mute without restarting
      if (newMuted) {
        iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
      } else {
        iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
      }
      
      const newStates = [...prev];
      newStates[index] = newMuted;
      return newStates;
    });
  }, []);

  // Ensure videos are always playing
  useEffect(() => {
    const timer = setTimeout(() => {
      projects.forEach((_, index) => {
        const iframe = iframeRefs.current[index];
        if (iframe && iframe.contentWindow) {
          // Ensure video is playing
          setTimeout(() => {
            iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
          }, 1000);
        }
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="work" className="py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">My Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            A showcase of recent projects in motion design and animation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-card border-border overflow-hidden hover-lift cursor-pointer group animate-scale-in opacity-0"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* 🎥 YouTube iframe with clean UI */}
              <div className="relative overflow-hidden aspect-video">
                <iframe
                  ref={(el) => iframeRefs.current[index] = el}
                  className="w-full h-full object-cover rounded-none pointer-events-none"
                  src={getIframeUrl(project.videoId, true)}
                  title={project.title}
                  allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                {/* 🔊 Custom Button */}
                <button
                  onClick={() => toggleMute(index)}
                  className="absolute top-3 right-3 z-20 bg-primary/80 hover:bg-primary text-white p-2 rounded-full backdrop-blur-sm transition pointer-events-auto"
                  aria-label={mutedStates[index] ? "Unmute video" : "Mute video"}
                >
                  {mutedStates[index] ? (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>

                {/* Sound indicator */}
                {!mutedStates[index] && (
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-red-500/90 backdrop-blur-sm z-10">
                    <span className="text-white text-xs font-semibold">SOUND ON</span>
                  </div>
                )}
              </div>

              <CardContent className="p-4 sm:p-6">
                <Badge variant="secondary" className="mb-3 text-xs sm:text-sm">
                  {project.category}
                </Badge>
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};