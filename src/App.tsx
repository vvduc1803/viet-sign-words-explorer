
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Index from "./pages/Index";
import Dictionary from "./pages/Dictionary";
import Practice from "./pages/Practice";
import Games from "./pages/Games";
import MatchGame from "./pages/MatchGame";
import MimicGame from "./pages/MimicGame";
import TreasureGame from "./pages/TreasureGame";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/match" element={<MatchGame />} />
            <Route path="/games/mimic" element={<MimicGame />} />
            <Route path="/games/treasure" element={<TreasureGame />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
