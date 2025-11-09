import { Linkedin, Github, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="mx-auto text-center gap-8 space-y-5">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gradient ">
              Mehadi  Hasan
            </h3>
          </div>

          {/* Quick Links */}
          <div>
            <ul className="text-white flex items-center justify-center flex-wrap gap-4">
              {[
                "Home",
                "Experience",
                "Work",
                "Reels",
                "Technology",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="text-white flex items-center justify-center flex-wrap gap-4">
            <div className="flex gap-2">
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
        </div>

        <div className="pt-8  border-t-2 flex flex-col md:flex-row items-center justify-center  text-sm text-muted-foreground">
          <p>© {currentYear} Copyright Mehadi  Hasan | All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
