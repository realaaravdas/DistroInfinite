import React from 'react';
import { Distro } from '../types';
import { Terminal as TerminalIcon, Wifi, Volume2, Battery, Shield, Folder, Globe, Settings } from 'lucide-react';

interface DesktopMockupViewProps {
  distro: Distro;
}

export default function DesktopMockupView({ distro }: DesktopMockupViewProps) {
  const isGnome = distro.specs.desktopEnvironment.toLowerCase().includes('gnome') || 
                  distro.family === 'Debian' || 
                  distro.family === 'Fedora/RHEL';
  const isKde = distro.specs.desktopEnvironment.toLowerCase().includes('kde') || 
                distro.specs.desktopEnvironment.toLowerCase().includes('plasma');
  const isCinnamon = distro.specs.desktopEnvironment.toLowerCase().includes('cinnamon') || 
                     distro.name.toLowerCase().includes('mint');
  const isTiling = distro.specs.desktopEnvironment.toLowerCase().includes('hyprland') || 
                   distro.specs.desktopEnvironment.toLowerCase().includes('sway') || 
                   distro.specs.desktopEnvironment.toLowerCase().includes('i3');

  return (
    <div 
      className="relative w-full h-full overflow-hidden select-none font-sans text-xs flex flex-col justify-between"
      style={{
        background: `radial-gradient(ellipse at 70% 30%, ${distro.brandColor}35 0%, #0A0D14 75%, #05070A 100%)`,
      }}
    >
      {/* Background wallpaper abstract geometry/glow */}
      <div 
        className="absolute -right-16 -top-16 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: distro.brandColor }}
      />
      <div 
        className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: distro.accentColor || distro.brandColor }}
      />

      {/* Subtle watermark logo in background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
        <img 
          src={distro.logoUrl} 
          alt="" 
          className="w-64 h-64 object-contain filter grayscale"
          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
        />
      </div>

      {/* Top Panel (GNOME / Hyprland style) */}
      {!isCinnamon && !isKde && (
        <div className="relative z-10 w-full h-7 px-3 bg-black/60 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-[11px] text-white/90">
          <div className="flex items-center gap-2">
            <span className="font-semibold px-2 py-0.5 rounded bg-white/10 text-white text-[10px]">
              {isTiling ? '1: web  2: term  3: code' : 'Activities'}
            </span>
            <span className="text-white/60 hidden sm:inline">Terminal</span>
          </div>

          <div className="font-mono text-[11px] text-white/80">
            Wed Sep 30 &nbsp; 14:45
          </div>

          <div className="flex items-center gap-2.5 text-white/70">
            <Wifi size={12} />
            <Volume2 size={12} />
            <Battery size={12} />
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: distro.brandColor }}
            />
          </div>
        </div>
      )}

      {/* Left Dock (Ubuntu GNOME style) */}
      {distro.slug === 'ubuntu' && (
        <div className="absolute left-0 top-7 bottom-0 w-11 bg-black/70 backdrop-blur-lg border-r border-white/10 flex flex-col items-center py-3 gap-3 z-10">
          <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow">
            <Folder size={15} />
          </div>
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow">
            <Globe size={15} />
          </div>
          <div className="w-7 h-7 rounded-lg bg-[#2D3748] flex items-center justify-center text-emerald-400 shadow">
            <TerminalIcon size={15} />
          </div>
          <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center text-white shadow">
            <Settings size={15} />
          </div>
        </div>
      )}

      {/* Main Desktop Area with Open Simulated Terminal Window */}
      <div className={`relative z-10 flex-1 flex items-center justify-center p-3 sm:p-6 ${distro.slug === 'ubuntu' ? 'pl-14' : ''}`}>
        <div className="w-full max-w-lg bg-[#0C1019]/90 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl overflow-hidden text-xs">
          {/* Window Header */}
          <div className="px-3 py-1.5 bg-black/50 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="text-[10px] font-mono text-slate-400 ml-2">
                user@{distro.slug}: ~
              </span>
            </div>
            <div className="text-[9px] font-mono text-slate-500">
              {distro.specs.displayServer || 'Wayland'}
            </div>
          </div>

          {/* Window Terminal Body running fastfetch */}
          <div className="p-3.5 font-mono text-[11px] leading-relaxed text-slate-300 space-y-1">
            <div className="text-emerald-400 flex items-center gap-1.5">
              <span>$ fastfetch --logo</span>
              <span className="w-1.5 h-3 bg-emerald-400 animate-pulse inline-block" />
            </div>

            <div className="grid grid-cols-12 gap-3 pt-1">
              {/* Mini Distro Color Block / Logo */}
              <div className="col-span-3 sm:col-span-2 flex flex-col items-center justify-center py-1">
                <div 
                  className="w-10 h-10 rounded-lg p-1.5 flex items-center justify-center border border-white/10 shadow"
                  style={{ backgroundColor: `${distro.brandColor}25` }}
                >
                  <img 
                    src={distro.logoUrl} 
                    alt="" 
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                </div>
              </div>

              {/* Specs Output */}
              <div className="col-span-9 sm:col-span-10 space-y-0.5 text-[10px] sm:text-[11px]">
                <div>
                  <span className="font-bold text-white">{distro.name}</span>
                  <span className="text-slate-500"> ({distro.releaseModel})</span>
                </div>
                <div className="text-slate-500">--------------------------------</div>
                <div><span className="text-slate-400">OS:</span> {distro.name}</div>
                <div><span className="text-slate-400">Kernel:</span> {distro.specs.kernel}</div>
                <div><span className="text-slate-400">DE:</span> {distro.specs.desktopEnvironment}</div>
                <div><span className="text-slate-400">Package:</span> {distro.specs.packageManager}</div>
                <div><span className="text-slate-400">Memory:</span> 2.4 GiB / {distro.systemRequirements.min.ram}</div>
              </div>
            </div>

            {/* Terminal Palette Squares */}
            <div className="flex gap-1 pt-2">
              <span className="w-3 h-2 rounded-xs bg-black" />
              <span className="w-3 h-2 rounded-xs bg-red-500" />
              <span className="w-3 h-2 rounded-xs bg-green-500" />
              <span className="w-3 h-2 rounded-xs bg-yellow-500" />
              <span className="w-3 h-2 rounded-xs bg-blue-500" />
              <span className="w-3 h-2 rounded-xs bg-purple-500" />
              <span className="w-3 h-2 rounded-xs bg-cyan-500" />
              <span className="w-3 h-2 rounded-xs bg-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Taskbar (KDE / Cinnamon / Mint style) */}
      {(isCinnamon || isKde) && (
        <div className="relative z-10 w-full h-8 px-3 bg-black/80 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-2">
            <button 
              className="px-2.5 py-1 rounded font-bold text-xs flex items-center gap-1.5 shadow"
              style={{ backgroundColor: distro.brandColor }}
            >
              <img 
                src={distro.logoUrl} 
                alt="" 
                className="w-3.5 h-3.5 object-contain"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <span>Menu</span>
            </button>
            <div className="flex items-center gap-1 ml-1">
              <div className="px-2 py-0.5 bg-white/10 rounded text-[11px] flex items-center gap-1 text-slate-200">
                <TerminalIcon size={12} className="text-emerald-400" />
                <span>Bash</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-300 text-[11px]">
            <Wifi size={13} />
            <Volume2 size={13} />
            <Shield size={13} className="text-emerald-400" />
            <span className="font-mono text-white/90">14:45</span>
          </div>
        </div>
      )}
    </div>
  );
}
