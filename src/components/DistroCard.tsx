import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Package, 
  Terminal, 
  Cpu, 
  HardDrive, 
  ExternalLink, 
  Download, 
  BookOpen, 
  Maximize2, 
  Copy, 
  Check, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Monitor, 
  Quote
} from "lucide-react";
import { Distro } from "../types";
import DesktopMockupView from "./DesktopMockupView";

interface DistroCardProps {
  key?: React.Key;
  distro: Distro;
  index: number;
  onOpenLightbox: (distro: Distro) => void;
  onVisibleInCenter?: (distro: Distro) => void;
}

export default function DistroCard({ 
  distro, 
  index, 
  onOpenLightbox, 
  onVisibleInCenter 
}: DistroCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'desktop' | 'fastfetch' | 'architecture'>('desktop');
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [useMockup, setUseMockup] = useState(false);

  // 3D perspective mouse tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -4; // max -4 to +4 deg
    const tiltY = ((x - centerX) / centerX) * 4;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ x: tiltX, y: tiltY, glareX, glareY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  const copyCommand = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Center visibility detection to trigger ambient background color change
  useEffect(() => {
    const card = cardRef.current;
    if (!card || !onVisibleInCenter) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            onVisibleInCenter(distro);
          }
        });
      },
      { threshold: [0.4, 0.7] }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [distro, onVisibleInCenter]);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered 
          ? `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)` 
          : 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="relative w-full max-w-5xl mx-auto mb-20 bg-[#0E131F]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-500 hover:shadow-black/60"
    >
      {/* Dynamic Specular Glare following mouse */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Top Accent Stripe matching Distro Brand Color */}
      <div 
        className="h-1 w-full"
        style={{ 
          background: `linear-gradient(90deg, ${distro.brandColor}, ${distro.accentColor || distro.brandColor})` 
        }}
      />

      <div className="p-6 sm:p-8 md:p-10 space-y-8">
        {/* Header: Logo, Title, Family & Tagline */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-white/5">
          <div className="flex items-center gap-5">
            <div 
              className="w-16 h-16 sm:w-20 sm:h-20 p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 shadow-inner"
              style={{ borderColor: `${distro.brandColor}30` }}
            >
              {!logoError ? (
                <img 
                  src={distro.logoUrl} 
                  alt={`${distro.name} logo`} 
                  className="max-h-full max-w-full object-contain filter drop-shadow-md"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div 
                  className="w-full h-full rounded-xl flex items-center justify-center font-mono font-bold text-lg text-white"
                  style={{ backgroundColor: distro.brandColor }}
                >
                  {distro.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                <span className="font-medium text-white">{distro.family} Family</span>
                <span className="text-slate-600">·</span>
                <span>{distro.releaseModel}</span>
                <span className="text-slate-600">·</span>
                <span>Established {distro.releaseDate ? distro.releaseDate.slice(0, 4) : '2000s'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                {distro.name}
              </h2>
              <p className="text-sm text-slate-300 font-normal leading-relaxed max-w-2xl">
                {distro.tagline}
              </p>
            </div>
          </div>

          {/* Quick links & Distro counter index */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0">
            <span className="text-xs font-mono text-slate-500">
              #{String(index + 1).padStart(3, '0')}
            </span>
            <div className="flex items-center gap-2">
              <a
                href={distro.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                title="Official Website"
              >
                <span>Website</span>
                <ExternalLink size={12} />
              </a>
              {distro.downloadUrl && (
                <a
                  href={distro.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white rounded-lg transition-opacity hover:opacity-90"
                  style={{ backgroundColor: distro.brandColor }}
                  title="Download ISO"
                >
                  <Download size={12} />
                  <span>Download</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Media Preview Tabs & Screen Showcase */}
        <div className="space-y-3">
          {/* Tab Selector Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/5 rounded-lg text-xs">
              <button
                onClick={() => setActiveTab('desktop')}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === 'desktop' 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Monitor size={14} />
                <span>Desktop Interface</span>
              </button>

              <button
                onClick={() => setActiveTab('fastfetch')}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === 'fastfetch' 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal size={14} />
                <span>System Console</span>
              </button>

              <button
                onClick={() => setActiveTab('architecture')}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                  activeTab === 'architecture' 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers size={14} />
                <span>Lineage & Architecture</span>
              </button>
            </div>

            {activeTab === 'desktop' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setUseMockup(!useMockup)}
                  className="px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors"
                >
                  {useMockup ? 'Show Real Screenshot' : 'Live Desktop View'}
                </button>
                <button
                  onClick={() => onOpenLightbox(distro)}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <Maximize2 size={13} />
                  <span>Expand Fullscreen</span>
                </button>
              </div>
            )}
          </div>

          {/* Tab Content Display */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/50 border border-white/10 group">
            {activeTab === 'desktop' && (
              <div 
                onClick={() => onOpenLightbox(distro)}
                className="relative w-full h-full cursor-zoom-in overflow-hidden"
              >
                {!imgError && !useMockup ? (
                  <>
                    <img
                      src={distro.screenshotUrl}
                      alt={`${distro.name} desktop interface`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('/api/proxy-image')) {
                          target.src = `/api/proxy-image?url=${encodeURIComponent(distro.screenshotUrl)}`;
                        } else {
                          setImgError(true);
                        }
                      }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 drop-shadow">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{distro.specs.desktopEnvironment}</span>
                        <span className="text-white/60">·</span>
                        <span className="text-white/80">{distro.specs.displayServer || 'Wayland'}</span>
                      </div>
                      <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10 text-[11px] font-mono">
                        Click image to inspect in full HD
                      </span>
                    </div>
                  </>
                ) : (
                  <DesktopMockupView distro={distro} />
                )}
              </div>
            )}

            {activeTab === 'fastfetch' && (
              <div className="w-full h-full bg-[#080B10] p-6 font-mono text-xs overflow-y-auto space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-white/10 text-slate-400">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="ml-2 text-slate-500">terminal — fastfetch</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2 text-slate-300">
                    <div className="text-slate-400">user@{distro.slug}</div>
                    <div className="text-slate-600">----------------------</div>
                    <div><span className="text-slate-500">OS:</span> {distro.name} ({distro.releaseModel})</div>
                    <div><span className="text-slate-500">Host:</span> Virtual / Bare-metal Hardware</div>
                    <div><span className="text-slate-500">Kernel:</span> {distro.specs.kernel}</div>
                    <div><span className="text-slate-500">Init:</span> {distro.specs.initSystem}</div>
                    <div><span className="text-slate-500">Packages:</span> {distro.specs.packageManager}</div>
                    <div><span className="text-slate-500">DE:</span> {distro.specs.desktopEnvironment}</div>
                    <div><span className="text-slate-500">Display:</span> {distro.specs.displayServer || 'Wayland'}</div>
                    <div><span className="text-slate-500">Filesystem:</span> {distro.specs.defaultFilesystem || 'ext4 / Btrfs'}</div>
                  </div>

                  <div className="space-y-4 bg-white/[0.02] p-4 rounded-lg border border-white/5 flex flex-col justify-between">
                    <div>
                      <div className="text-slate-400 mb-2 font-semibold">Live Terminal Command:</div>
                      <div className="p-3 bg-black/60 rounded border border-white/10 text-emerald-400 font-mono text-xs break-all">
                        {distro.cliSnippet.command}
                      </div>
                    </div>

                    <button
                      onClick={() => copyCommand(distro.cliSnippet.command)}
                      className="inline-flex items-center justify-center gap-2 w-full py-2 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 rounded text-xs transition-colors"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      <span>{copied ? 'Command Copied to Clipboard!' : 'Copy Shell Command'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="w-full h-full bg-[#090D15] p-6 sm:p-8 flex flex-col justify-center space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Lineage & Structural Foundation</h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                    {distro.name} belongs to the <span className="font-semibold text-white">{distro.family}</span> lineage.
                    It uses <span className="font-semibold text-white">{distro.specs.packageManager}</span> for binary delivery and <span className="font-semibold text-white">{distro.specs.initSystem}</span> for process supervision.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-white/[0.03] border border-white/5 rounded-lg">
                    <span className="text-slate-500 block text-[11px] mb-1">Architecture</span>
                    <span className="font-mono text-slate-200">
                      {distro.specs.architecture ? distro.specs.architecture.join(', ') : 'x86_64, aarch64'}
                    </span>
                  </div>
                  <div className="p-3 bg-white/[0.03] border border-white/5 rounded-lg">
                    <span className="text-slate-500 block text-[11px] mb-1">Init System</span>
                    <span className="font-mono text-slate-200">{distro.specs.initSystem}</span>
                  </div>
                  <div className="p-3 bg-white/[0.03] border border-white/5 rounded-lg">
                    <span className="text-slate-500 block text-[11px] mb-1">Display Compositor</span>
                    <span className="font-mono text-slate-200">{distro.specs.displayServer || 'Wayland'}</span>
                  </div>
                  <div className="p-3 bg-white/[0.03] border border-white/5 rounded-lg">
                    <span className="text-slate-500 block text-[11px] mb-1">Storage Layout</span>
                    <span className="font-mono text-slate-200">{distro.specs.defaultFilesystem || 'ext4'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Narrative & History Section */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-semibold text-white tracking-tight">
            Historical Evolution & Purpose
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {distro.description}
          </p>
          <div className="p-4 bg-white/[0.02] border-l-2 border-white/20 rounded-r-lg text-xs text-slate-300 leading-relaxed italic">
            "{distro.history}"
          </div>
        </div>

        {/* Specifications & Hardware Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-white/5">
          {/* Left: Key Features & Technical Attributes */}
          <div className="md:col-span-6 space-y-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Distinctive Features
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {distro.keyFeatures && distro.keyFeatures.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Minimum vs Recommended System Requirements */}
          <div className="md:col-span-6 space-y-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Hardware Specifications
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Minimum Requirements */}
              <div className="p-3.5 bg-white/[0.03] border border-white/5 rounded-xl space-y-2">
                <div className="font-medium text-slate-400 text-[11px] uppercase tracking-wider border-b border-white/5 pb-1">
                  Minimum Baseline
                </div>
                <div className="space-y-1.5 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Cpu size={12} className="text-slate-500" />
                    <span>{distro.systemRequirements.min.cpu}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500 font-mono text-[11px]">RAM:</span>
                    <span>{distro.systemRequirements.min.ram}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HardDrive size={12} className="text-slate-500" />
                    <span>{distro.systemRequirements.min.hdd}</span>
                  </div>
                </div>
              </div>

              {/* Recommended Requirements */}
              <div className="p-3.5 bg-white/[0.03] border border-white/5 rounded-xl space-y-2">
                <div className="font-medium text-emerald-400/90 text-[11px] uppercase tracking-wider border-b border-white/5 pb-1">
                  Recommended Spec
                </div>
                <div className="space-y-1.5 text-slate-200">
                  <div className="flex items-center gap-1.5">
                    <Cpu size={12} className="text-slate-400" />
                    <span>{distro.systemRequirements.recommended.cpu}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-mono text-[11px]">RAM:</span>
                    <span>{distro.systemRequirements.recommended.ram}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HardDrive size={12} className="text-slate-400" />
                    <span>{distro.systemRequirements.recommended.hdd}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real Sourced Critical Reviews */}
        {distro.reviews && distro.reviews.length > 0 && (
          <div className="pt-4 border-t border-white/5 space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Quote size={13} /> Sourced Critical Reviews
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {distro.reviews.map((rev, i) => (
                <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{rev.quote}"
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span className="font-medium text-slate-400">
                      {rev.source} {rev.author ? `(${rev.author})` : ''}
                    </span>
                    {rev.year && <span>{rev.year}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
