import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import ErrorBoundary from "./components/ErrorBoundary";
import PageSkeleton from "./components/PageSkeleton";

const Destinations = lazy(() => import("./pages/Destinations"));
const DestinationPage = lazy(() => import("./pages/DestinationPage"));
const Guides = lazy(() => import("./pages/Guides"));
const GuidePage = lazy(() => import("./pages/GuidePage"));
const About = lazy(() => import("./pages/About"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ErrorBoundary>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:slug" element={<DestinationPage />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:slug" element={<GuidePage />} />
            <Route path="/travel-tips" element={<Guides key="tips" fixedCategory="travel-tips" />} />
            <Route path="/food-culture" element={<Guides key="food" fixedCategory="food-culture" />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
