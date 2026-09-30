import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Download, Monitor, Sparkles } from 'lucide-react';
import { Distro } from '../types';
import DesktopMockupView from './DesktopMockupView';

interface ScreenshotLightboxProps {
  distro: Distro | null;
  onClose: () => void;
}

export default function ScreenshotLightbox({ distro, onClose }: ScreenshotLightboxProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const [showSimulation, setShowSimulation] = useState(false);

  useEffect(() => {
    setImgFailed(false);
    setShowSimulation(false);
  }, [distro]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (distro) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [distro, onClose]);

  if (!distro) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#0F141E] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0B0E17]/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-lg p-1.5 flex items-center justify-center border border-white/10"
                style={{ backgroundColor: `${distro.brandColor}15` }}
              >
                <img 
                  src={distro.logoUrl} 
                  alt={distro.name} 
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
                  {distro.name} Desktop Interface
                </h3>
                <p className="text-xs text-slate-400">
                  {distro.specs.desktopEnvironment} · {distro.specs.displayServer || 'Wayland'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSimulation(!showSimulation)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
              >
                <Sparkles size={13} className="text-amber-400" />
                <span>{showSimulation ? 'Show Screenshot' : 'Live Desktop View'}</span>
              </button>

              <a
                href={distro.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
              >
                <span>Official Site</span>
                <ExternalLink size={13} />
              </a>

              {distro.downloadUrl && (
                <a
                  href={distro.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white rounded-lg transition-opacity hover:opacity-90"
                  style={{ backgroundColor: distro.brandColor }}
                >
                  <Download size={13} />
                  <span>Get ISO</span>
                </a>
              )}

              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-1"
                aria-label="Close preview"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Screenshot Container */}
          <div className="relative flex-1 bg-black/60 overflow-hidden flex items-center justify-center p-2 sm:p-4 min-h-[50vh]">
            {!imgFailed && !showSimulation ? (
              <img
                src={distro.screenshotUrl}
                alt={`${distro.name} high-resolution desktop`}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/5"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('/api/proxy-image')) {
                    target.src = `/api/proxy-image?url=${encodeURIComponent(distro.screenshotUrl)}`;
                  } else {
                    setImgFailed(true);
                  }
                }}
              />
            ) : (
              <div className="w-full h-[65vh] rounded-lg overflow-hidden border border-white/10">
                <DesktopMockupView distro={distro} />
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 border-t border-white/10 bg-[#0B0E17]/90 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <Monitor size={14} className="text-slate-500" />
              <span>Recommended: {distro.systemRequirements.recommended.gpu || 'Hardware 3D Acceleration'}</span>
              <span className="text-slate-600">·</span>
              <span>Kernel: {distro.specs.kernel}</span>
            </div>
            <div className="text-slate-500 text-[11px]">
              Press ESC or click outside to dismiss
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
