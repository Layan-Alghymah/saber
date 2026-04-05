import { useState } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/context/ThemeContext";
import type { VerificationResult } from "@/data/mockData";
import HomePage from "@/pages/HomePage";
import LoadingPage from "@/pages/LoadingPage";
import ResultPage from "@/pages/ResultPage";
import TrendingPage from "@/pages/TrendingPage";

const queryClient = new QueryClient();

function NotFound() {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen bg-page flex items-center justify-center" dir="rtl">
      <div className="text-center space-y-4">
        <div className="text-6xl font-black" style={{ color: "var(--c-text-muted)" }}>٤٠٤</div>
        <h1 className="text-xl font-bold" style={{ color: "var(--c-text-1)" }}>الصفحة غير موجودة</h1>
        <button
          onClick={() => setLocation("/")}
          className="btn-green px-6 py-2 font-semibold"
        >
          العودة للرئيسية
        </button>
      </div>
    </div>
  );
}

function AppRoutes() {
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [newsText, setNewsText] = useState<string>("");

  const handleResult = (r: VerificationResult, text: string) => {
    setResult(r);
    setNewsText(text);
  };

  return (
    <Switch>
      <Route path="/" component={() => <HomePage onResult={handleResult} />} />
      <Route path="/loading" component={() => <LoadingPage />} />
      <Route path="/result" component={() => <ResultPage result={result} newsText={newsText} />} />
      <Route path="/trending" component={TrendingPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppRoutes />
        </WouterRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
