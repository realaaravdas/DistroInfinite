/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Distro } from './types';
import DistroCard from './components/DistroCard';
import VisualBackground from './components/VisualBackground';
import StreamToolbar from './components/StreamToolbar';
import ScreenshotLightbox from './components/ScreenshotLightbox';

export default function App() {
  const [distros, setDistros] = useState<Distro[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Random session seed generated fresh on every page load
  const [sessionSeed, setSessionSeed] = useState<number>(() => Math.floor(Math.random() * 1000000) + 1);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Active distro ambient color
  const [activeBrandColor, setActiveBrandColor] = useState<string>('#3B82F6');
  
  // Lightbox modal state
  const [lightboxDistro, setLightboxDistro] = useState<Distro | null>(null);

  // Scroll velocity tracking
  const [scrollVelocity, setScrollVelocity] = useState<number>(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(performance.now());
  const velocityTimeout = useRef<number | null>(null);

  // InView detector for infinite scroll triggering
  const { ref: loadMoreRef, inView } = useInView({
    rootMargin: '600px',
    threshold: 0,
  });

  const loadingRef = useRef(false);
  const seenSlugsRef = useRef<Set<string>>(new Set());

  // Track scroll speed
  useEffect(() => {
    const handleScroll = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const dt = now - lastScrollTime.current;
      const dy = currentY - lastScrollY.current;

      if (dt > 10) {
        const speed = (dy / dt) * 1000; // px per second
        setScrollVelocity(speed);
        lastScrollY.current = currentY;
        lastScrollTime.current = now;

        if (velocityTimeout.current) {
          window.clearTimeout(velocityTimeout.current);
        }
        velocityTimeout.current = window.setTimeout(() => {
          setScrollVelocity(0);
        }, 150);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (velocityTimeout.current) window.clearTimeout(velocityTimeout.current);
    };
  }, []);

  // Fetch distros batch
  const fetchNextBatch = useCallback(async (reset = false, customSeed?: number, customCategory?: string) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setError(null);

    const currentCategory = customCategory ?? selectedCategory;
    const currentSeed = customSeed ?? sessionSeed;
    const currentExcludeList = reset ? [] : Array.from(seenSlugsRef.current);

    try {
      const response = await fetch('/api/distros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          excludeList: currentExcludeList,
          seed: currentSeed,
          category: currentCategory,
          limit: 6
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve distribution batch');
      }

      const newDistros: Distro[] = await response.json();

      if (reset) {
        seenSlugsRef.current = new Set(newDistros.map(d => d.slug));
        setDistros(newDistros);
        if (newDistros.length > 0) {
          setActiveBrandColor(newDistros[0].brandColor);
        }
      } else {
        const uniqueItems = newDistros.filter(d => !seenSlugsRef.current.has(d.slug));
        uniqueItems.forEach(d => seenSlugsRef.current.add(d.slug));
        setDistros(prev => [...prev, ...uniqueItems]);
      }
    } catch (err: any) {
      console.error("Distro stream error:", err);
      setError(err?.message || "Unable to stream distributions. Please try again.");
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [sessionSeed, selectedCategory]);

  // Initial load
  useEffect(() => {
    fetchNextBatch(true);
  }, []);

  // Infinite scroll trigger when reaching bottom
  useEffect(() => {
    if (inView && distros.length > 0 && !loadingRef.current) {
      fetchNextBatch(false);
    }
  }, [inView, fetchNextBatch, distros.length]);

  // Handle Category Filter change
  const handleSelectCategory = (cat: string) => {
    if (cat === selectedCategory) return;
    setSelectedCategory(cat);
    seenSlugsRef.current.clear();
    setDistros([]);
    fetchNextBatch(true, sessionSeed, cat);
  };

  // Handle Randomize Order (fresh seed)
  const handleRandomize = () => {
    const freshSeed = Math.floor(Math.random() * 1000000) + 1;
    setSessionSeed(freshSeed);
    seenSlugsRef.current.clear();
    setDistros([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchNextBatch(true, freshSeed, selectedCategory);
  };

  // Filter distros by search query
  const filteredDistros = distros.filter(distro => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      distro.name.toLowerCase().includes(q) ||
      distro.tagline.toLowerCase().includes(q) ||
      distro.description.toLowerCase().includes(q) ||
      distro.family.toLowerCase().includes(q) ||
      distro.specs.packageManager.toLowerCase().includes(q) ||
      distro.specs.desktopEnvironment.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-blue-600 selection:text-white flex flex-col relative overflow-x-hidden">
      {/* Reactive Visual Background responding to cursor and scroll velocity */}
      <VisualBackground 
        activeBrandColor={activeBrandColor} 
        scrollVelocity={scrollVelocity} 
      />

      {/* Sticky Interactive Toolbar */}
      <StreamToolbar
        distroCount={distros.length}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onRandomize={handleRandomize}
        scrollVelocity={scrollVelocity}
      />

      {/* Main Distro Stream */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-10 pb-32 relative z-10">
        {/* Intro banner */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <p className="text-xs uppercase tracking-widest text-blue-400 font-mono">
            Continuous Linux Chronicle
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Infinite Distro Stream
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
            Scroll continuously down to discover every Linux distribution in existence.
            Specifications, origin chronicles, hardware requirements, real critical reviews, and authentic desktop screenshots.
          </p>
        </div>

        {/* Distros Feed */}
        <div className="space-y-6">
          {filteredDistros.map((distro, index) => (
            <DistroCard
              key={`${distro.slug}-${index}`}
              distro={distro}
              index={index}
              onOpenLightbox={(d) => setLightboxDistro(d)}
              onVisibleInCenter={(d) => setActiveBrandColor(d.brandColor)}
            />
          ))}
        </div>

        {/* Empty Search State */}
        {filteredDistros.length === 0 && !loading && (
          <div className="py-20 text-center space-y-3">
            <p className="text-base font-semibold text-slate-300">
              No distributions matched "{searchQuery}"
            </p>
            <p className="text-xs text-slate-500">
              Try searching for a different name, package manager, or desktop environment.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors inline-block mt-2"
            >
              Clear Search Filter
            </button>
          </div>
        )}

        {/* Infinite Scroll Trigger & Loading Indicator */}
        <div ref={loadMoreRef} className="py-16 flex flex-col items-center justify-center gap-4">
          {loading && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="animate-spin text-blue-500" size={36} />
              <p className="text-xs font-mono text-slate-400">
                Streaming next distributions into chronicle...
              </p>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 px-5 py-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-xs">
              <AlertCircle size={16} className="text-red-400 shrink-0" />
              <span>{error}</span>
              <button
                onClick={() => fetchNextBatch(false)}
                className="ml-2 inline-flex items-center gap-1 font-semibold text-white underline hover:no-underline"
              >
                <RefreshCw size={12} />
                <span>Retry</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* High-Resolution Screenshot Lightbox Modal */}
      <ScreenshotLightbox
        distro={lightboxDistro}
        onClose={() => setLightboxDistro(null)}
      />

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-[#06080E] py-8 px-6 text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            DistroInfinite Chronicle · Open-source Linux distribution encyclopedia
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Randomized each reload</span>
            <span>·</span>
            <span>Truly infinite streaming</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
