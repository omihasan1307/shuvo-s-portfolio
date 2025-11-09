import profilePhoto from "@/assets/img.png";
import { Button } from "@/components/ui/button";
import { Download, Linkedin, Github, Mail, Play, Sparkles } from "lucide-react";
import Typewriter from "typewriter-effect";

export const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
    >
      {/* Animated gradient background with particles */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/15 animate-gradient-slow" />
        
        {/* Animated particles */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced floating orbs with glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/40 rounded-full blur-3xl animate-float opacity-60" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-float opacity-50"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/30 rounded-full blur-3xl animate-float opacity-60"
        style={{ animationDelay: "4s" }}
      />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8 text-center md:text-left animate-slide-in-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Available for Freelance
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-lg uppercase tracking-widest text-muted-foreground mb-2">
                Hello! I'm <span className="text-white font-semibold">Mehadi  Hasan</span>
              </p>
              
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black leading-tight">
                <Typewriter
                  options={{
                    strings: [
                      'MOTION <span class="text-gradient bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">DESIGNER</span>',
                      'VIDEO <span class="text-gradient bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">EDITOR</span>',
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 80,
                    deleteSpeed: 50,
                  }}
                />
              </h1>
            </div>

            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Crafting captivating visual experiences through{" "}
              <span className="text-white font-medium">motion design</span>,{" "}
              <span className="text-white font-medium">animation</span>, and{" "}
              <span className="text-white font-medium">interactive storytelling</span>.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="https://drive.google.com/file/d/1W1wzaydxAs-T8piVbZtgTs86swEtSmHf/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="default" 
                  size="lg" 
                  className="gap-3 px-8 py-6 text-lg font-semibold rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-primary/25"
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </Button>
              </a>
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-3 px-8 py-6 text-lg font-semibold rounded-2xl border-2 hover:scale-105 transition-transform duration-300 group"
                asChild
              >
                <a href="#work" className="flex items-center">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  View My Work
                </a>
              </Button>
            </div>

            {/* Enhanced Social Links */}
            <div className="flex gap-3 justify-center md:justify-start pt-6">
              {[
                { icon: Linkedin, href: "#", color: "hover:text-blue-400" },
                { icon: Github, href: "#", color: "hover:text-gray-300" },
                { icon: Mail, href: "#", color: "hover:text-red-400" },
              ].map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className={`w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:scale-110 transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Enhanced Right side - Photo card */}
          <div className="relative flex justify-center animate-slide-in-right">
            <div className="relative group">
              {/* Glowing background effect */}
              <div className="absolute -inset-6 bg-gradient-to-r from-primary/30 via-purple-500/20 to-pink-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 animate-pulse-slow" />
              
              {/* Animated border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-rotate">
                <div className="absolute inset-0 bg-background/95 rounded-3xl blur-sm" />
              </div>

              {/* Main photo card */}
              <div className="relative bg-card/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover-lift shadow-2xl group-hover:shadow-primary/25 transition-all duration-500">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={profilePhoto}
                    alt="Motion Designer"
                    className="w-full h-auto rounded-xl transform group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Shine overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
                
                {/* Enhanced info section */}
                <div className="mt-6 space-y-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Mehadi  Hasan
                    </h3>
                  </div>
                  
                  <p className="text-sm uppercase tracking-widest text-primary font-semibold">
                    Video Editor & Motion Designer
                  </p>
                  
                  <div className="space-y-1 pt-2">
                    <p className="text-xs text-muted-foreground font-medium">
                      📧 hasanshuvo7641@gmail.com
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">
                      📱 01798889907
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest animate-pulse">
            Scroll Down
          </span>
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2 group hover:border-primary transition-colors">
            <div className="w-1 h-3 bg-primary rounded-full animate-bounce group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
};