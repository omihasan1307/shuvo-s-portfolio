/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export const VideoShowcase = () => {
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<any>(null);

  // Get current year for the showreel title
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // ✅ Load YouTube IFrame API only once
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    // ✅ Wait until API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("yt-player", {
        events: {
          onReady: (event: any) => {
            event.target.mute(); // start muted for autoplay
            event.target.playVideo();
          },
        },
      });
    };
  }, []);

  // ✅ Toggle Mute/Unmute button
  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Creative Showcase</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive showcase of my motion design capabilities
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative group rounded-2xl overflow-hidden bg-card border border-border aspect-video hover-lift">
            {/* ✅ Clean autoplaying video without YouTube UI */}
            <iframe
              id="yt-player"
              className="w-full h-full rounded-2xl pointer-events-none"
              src="https://www.youtube.com/embed/UwyTLcMwWBA?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&loop=1&playlist=UwyTLcMwWBA&enablejsapi=1&vq=hd1080"
              title="Motion Design Showreel"
              allow="autoplay; encrypted-media"
            ></iframe>

            {/* 🔊 Custom Mute Button */}
            <button
              onClick={toggleMute}
              className="absolute top-4 right-4 z-20 bg-primary/80 hover:bg-primary text-white p-3 rounded-full backdrop-blur-sm transition pointer-events-auto"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>

            {/* Bottom overlay text */}
            <div className="absolute bottom-0 left-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-2xl font-bold mb-2 drop-shadow-lg">
                {currentYear} Motion Design Showreel
              </h3>
              <p className="text-white/90 drop-shadow-lg">
                A collection of my best work in motion graphics and visual
                effects.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { num: "300+", label: "Projects Completed" },
              { num: "180+", label: "Happy Clients" },
              { num: "3+", label: "Years Experience" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 bg-card rounded-lg border border-border"
              >
                <div className="text-3xl font-bold text-primary mb-1">
                  {stat.num}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
