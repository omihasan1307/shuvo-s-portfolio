import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Reels", href: "#reels" },
  { name: "Experience", href: "#experience" },
  { name: "Technology", href: "#technology" },
  { name: "Work", href: "#work" },
  // { name: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-6">
        <nav className="flex items-center justify-center ">
          {/* <a
            href="#home"
            className="text-2xl font-bold text-gradient hover:opacity-80 transition-opacity"
          >
            Portfolio
          </a> */}

          <ul className="hidden md:flex items-center gap-8 px-10 rounded-full py-1 bg-[#1D1D1E] ">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.href.slice(1)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* <Button variant="default" size="sm" asChild>
            <a href="#contact">Get in Touch</a>
          </Button> */}
        </nav>
      </div>
    </header>
  );
};
