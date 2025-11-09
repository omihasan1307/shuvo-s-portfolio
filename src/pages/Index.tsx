import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Technologies } from "@/components/Technologies";
import { Work } from "@/components/Work";
import { Reels } from "@/components/Reels";
import { VideoShowcase } from "@/components/VideoShowcase";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <VideoShowcase />
        <Work />
        <Reels />
        <Experience />
        <Technologies />

        {/* <Contact /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
