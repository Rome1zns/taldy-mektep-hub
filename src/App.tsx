import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MatrixRain from "@/components/MatrixRain";
import Index from "./pages/Index.tsx";
import Schools from "./pages/Schools.tsx";
import SchoolProfile from "./pages/SchoolProfile.tsx";
import News from "./pages/News.tsx";
import Rating from "./pages/Rating.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MatrixRain />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/schools/:id" element={<SchoolProfile />} />
          <Route path="/news" element={<News />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
