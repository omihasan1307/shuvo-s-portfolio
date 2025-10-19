/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Volume2, VolumeX } from "lucide-react";

// YouTube Shorts IDs (from your links)
const reels = [
  {
    id: 1,
    title: "Short 1",
    videoId: "SAtDVVZrv84",
  },
  {
    id: 2,
    title: "Short 2",
    videoId: "49yK00_ITK8",
  },
  {
    id: 3,
    title: "Short 3",
    videoId: "psVva03raB8",
  },
];

export const Reels = () => {
  const [mutedStates, setMutedStates] = useState<{ [key: number]: boolean }>({});
  const iframeRefs = useRef<{ [key: number]: HTMLIFrameElement | null }>({});
  const carouselRef = useRef<any>(null);

  // Initialize all videos as muted
  useEffect(() => {
    const initialMutedStates: { [key: number]: boolean } = {};
    reels.forEach(reel => {
      initialMutedStates[reel.id] = true;
    });
    setMutedStates(initialMutedStates);
  }, []);

  // Get iframe URL with all UI removed and autoplay enabled
  const getIframeUrl = (videoId: string, muted: boolean) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&loop=1&playlist=${videoId}&disablekb=1&playsinline=1&vq=hd1080&enablejsapi=1&widget_referrer=null`;
  };

  // Reliable mute toggle without restarting video
  const toggleMute = useCallback((id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setMutedStates(prev => {
      const newMuted = !prev[id];
      const iframe = iframeRefs.current[id];
      
      if (iframe && iframe.contentWindow) {
        // Use YouTube API to toggle mute without restarting
        if (newMuted) {
          iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
        } else {
          iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
        }
      }
      
      return { ...prev, [id]: newMuted };
    });
  }, []);

  // Auto-play visible reel and ensure videos are always running
  useEffect(() => {
    if (!carouselRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const reelId = parseInt(entry.target.getAttribute('data-reel-id') || '');
          if (!reelId) return;

          const iframe = iframeRefs.current[reelId];
          if (!iframe || !iframe.contentWindow) return;

          if (entry.isIntersecting) {
            // Ensure video is playing when visible
            setTimeout(() => {
              iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            }, 300);
          }
        });
      },
      {
        threshold: 0.7,
        rootMargin: '50px'
      }
    );

    // Observe all reel containers
    reels.forEach(reel => {
      const element = document.getElementById(`reel-container-${reel.id}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Initialize all videos to play automatically
  useEffect(() => {
    const timer = setTimeout(() => {
      reels.forEach(reel => {
        const iframe = iframeRefs.current[reel.id];
        if (iframe && iframe.contentWindow) {
          // Start playing all videos initially (muted)
          setTimeout(() => {
            iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
          }, 500);
        }
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="reels" className="py-20 bg-background/50">
      <div className="px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Motion Reels</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quick glimpses of my latest motion design work
          </p>
        </div>

        <div className="max-w-screen-2xl mx-auto">
          <Carousel 
            ref={carouselRef}
            opts={{ 
              align: "start", 
              loop: true,
              dragFree: true,
            }} 
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {reels.map((reel) => (
                <CarouselItem
                  key={reel.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div
                    id={`reel-container-${reel.id}`}
                    data-reel-id={reel.id}
                    className="relative group aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-border hover:scale-[1.02] transition-all duration-300"
                  >
                    {/* YouTube Iframe - Completely clean UI, always playing */}
                    <iframe
                      ref={(el) => iframeRefs.current[reel.id] = el}
                      src={getIframeUrl(reel.videoId, true)}
                      className="w-full h-full pointer-events-none"
                      title={reel.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />

                    {/* Mute/Unmute button - Only control */}
                    <button
                      onClick={(e) => toggleMute(reel.id, e)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-90 hover:opacity-100 transition-all duration-200 hover:scale-110 hover:bg-black/80 z-10"
                    >
                      {mutedStates[reel.id] ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </button>

                    {/* Sound indicator */}
                    {!mutedStates[reel.id] && (
                      <div className="absolute top-4 left-4 px-2 py-1 rounded-full bg-red-500/90 backdrop-blur-sm z-10">
                        <span className="text-white text-xs font-semibold">SOUND ON</span>
                      </div>
                    )}

                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-semibold text-lg drop-shadow-lg">
                        {reel.title}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 hidden md:flex" />
            <CarouselNext className="right-0 hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};