"use client";
import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import SoilForm from '@/components/SoilForm';
import ResultCard from '@/components/ResultCard';
import PreviousAnalysis from '@/components/PreviousAnalysis';

export default function Home() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('soil_analyses');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const handleAnalyze = async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Use local IP or localhost. Sometimes browser prefers 127.0.0.1 on some setups.
      // But usually localhost:5000 is fine if the server is listening on 0.0.0.0 or 127.0.0.1.
      const response = await fetch('http://localhost:5000/api/analyze-soil', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          soilType: formData.soilType,
          cropType: formData.cropType,
          nitrogen: Number(formData.nitrogen),
          phosphorus: Number(formData.phosphorus),
          potassium: Number(formData.potassium),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Analysis failed. Please check your connection and try again.');
      }

      const data = await response.json();
      setResult(data);

      const newHistory = [{
        soilType: formData.soilType,
        cropType: formData.cropType,
        result: data,
        timestamp: new Date().toISOString()
      }, ...history].slice(0, 5); // Keep last 5

      setHistory(newHistory);
      localStorage.setItem('soil_analyses', JSON.stringify(newHistory));
    } catch (err) {
      console.error('Fetch Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <Hero />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <SoilForm onAnalyze={handleAnalyze} loading={loading} />
          {error && (
            <div className="glass-card animate-fade-in border-l-8 border-red-500 bg-red-50/50 p-6">
              <div className="flex items-center text-red-600">
                <span className="mr-3 text-2xl">⚠️</span>
                <div>
                  <strong className="block font-bold">Analysis Error</strong>
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="animate-fade-in lg:sticky lg:top-8">
          {loading && (
            <div className="glass-card flex flex-col items-center justify-center py-20">
              <div className="loader"></div>
              <p className="text-green-600 font-semibold animate-pulse">Consulting AI Soil Expert...</p>
            </div>
          )}
          {result && <ResultCard result={result} />}
          {!result && !loading && (
            <div className="glass-card flex flex-col items-center justify-center py-20 text-slate-400 border-dashed border-2 border-slate-200 bg-slate-50/30">
              <span className="text-6xl mb-4">🌾</span>
              <p className="text-lg">Ready to analyze your soil</p>
              <p className="text-sm">Enter details on the left to get started</p>
            </div>
          )}
        </div>
      </div>

      <PreviousAnalysis analyses={history} onSelect={setResult} />

      <footer className="mt-20 text-center text-slate-400 text-sm">
        <p>© 2026 AI Smart Farming Assistant. All rights reserved.</p>
      </footer>
    </main>
  );
}
