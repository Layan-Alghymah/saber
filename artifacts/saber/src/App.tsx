import { useState } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { VerificationResult } from "@/data/mockData";
import HomePage from "@/pages/HomePage";
import LoadingPage from "@/pages/LoadingPage";
import ResultPage from "@/pages/ResultPage";
import TrendingPage from "@/pages/TrendingPage";

const queryClient = new QueryClient();

function NotFound() {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen flex items-center justify-center" dir="rtl">
      <div className="text-center space-y-4">
        <div className="text-6xl font-black text-muted-foreground/30">٤٠٤</div>
        <h1 className="text-xl font-bold text-foreground">الصفحة غير موجودة</h1>
        <button
          onClick={() => setLocation("/")}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-medium"
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
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <AppRoutes />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
