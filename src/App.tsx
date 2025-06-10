
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Dictionary from "./pages/Dictionary";
import Practice from "./pages/Practice";
import AboutSignLanguage from "./pages/AboutSignLanguage";
import SignUs from "./pages/SignUs";
import LearnSignLanguage from "./pages/LearnSignLanguage";
import Blog from "./pages/Blog";
import Feedback from "./pages/Feedback";
import Jobs from "./pages/Jobs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 w-full">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Index />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/about-sign-language" element={<AboutSignLanguage />} />
            <Route path="/signus" element={<SignUs />} />
            <Route path="/learn-sign-language" element={<LearnSignLanguage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
