import profilePhoto from "@/assets/img.png";
import { Button } from "@/components/ui/button";
import { Download, Linkedin, Github, Mail } from "lucide-react";
import Typewriter from "typewriter-effect";

export const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20  animate-gradient" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "4s" }}
      />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6 text-center md:text-left animate-slide-in-left">
            <div className="inline-block">
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                Hello! I'm <span className="text-white">Mehedi Hasan</span>
              </p>
              <h1 className="text-3xl md:text-6xl lg:text-8xl py-2 font-extrabold mb-3 mt-1">
                <Typewriter
                  options={{
                    strings: [
                      ' <span class="text-gradient">MOTION</span> DESIGNER',
                      ' <span class="text-gradient">VIDEO</span> EDITOR',
                      ' <span class="text-gradient">FIGMA</span> DESIGNER',
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h1>
              {/* <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none mb-4">
                <span className="text-gradient animate-gradient glow">
                  MOTION
                </span>
                <br />
                <span className="text-foreground">DESIGNER</span>
              </h1> */}
            </div>

            <p className="text-lg text-muted-foreground max-w-lg">
              I'm a Motion Designer with combined experience in Animation,
              Product design, and Interactive storytelling.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="https://drive.google.com/file/d/1W1wzaydxAs-T8piVbZtgTs86swEtSmHf/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="default" size="lg" className="gap-2">
                  <Download className="w-4 h-4" />
                  Resume
                </Button>
              </a>
              <Button variant="outline" size="lg" className="gap-2" asChild>
                <a href="#work">View Work</a>
              </Button>
            </div>

            <div className="flex gap-4 justify-center md:justify-start pt-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
              >
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right side - Photo card */}
          <div className="relative flex justify-center animate-slide-in-right">
            <div className="relative group animate-float">
              {/* Decorative elements */}
              <div className="absolute -inset-4  rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500 animate-gradient" />

              {/* Photo card */}
              <div className="relative  border-border rounded-2xl p-6 hover-lift">
                <div className="relative">
                  <img
                    src={profilePhoto}
                    alt="Motion Designer"
                    className="w-full h-auto rounded-xl"
                  />
                  {/* Animated border overlay */}
                  <div className="absolute inset-0 rounded-xl border-2 border-primary/0 group-hover:border-primary/50 transition-all duration-500" />
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    Mehedi Hasan
                  </h3>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">
                    Video Editor & Motion Designer
                  </p>
                  <p className="text-xs text-muted-foreground">
                    hasanshuvo7641@gmail.com | 01798889907
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};
