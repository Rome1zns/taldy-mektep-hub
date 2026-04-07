import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ValuesSection from "@/components/ValuesSection";

const Index = () => {
  return (
    <div className="relative z-10 min-h-screen">
      <Header />
      <HeroSection />
      <ValuesSection />
      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 TaldiHub — Талдықорған мектептерінің цифрлық хабы
        </div>
      </footer>
    </div>
  );
};

export default Index;
