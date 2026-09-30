import { Distro } from './distroCatalog';

// Templates of real and historical distributions and specialized spins that can be generated on demand infinitely
interface ProceduralDistroSeed {
  name: string;
  slugPrefix: string;
  tagline: string;
  family: Distro['family'];
  baseDescription: string;
  historyText: string;
  brandColor: string;
  accentColor: string;
  defaultDE: string;
  initSystem: string;
  packageManager: string;
  logoUrl: string;
  screenshotUrl: string;
  website: string;
  reviews: { quote: string; source: string; author?: string; year?: string }[];
  keyFeatures: string[];
}

const SEED_TEMPLATES: ProceduralDistroSeed[] = [
  {
    name: "Fedora Silverblue Rawhide",
    slugPrefix: "fedora-rawhide",
    tagline: "The bleeding-edge atomic container testing build of Fedora Silverblue.",
    family: "Fedora/RHEL",
    baseDescription: "A developer-oriented atomic workstation running Rawhide components on top of an ostree immutable root. Ideal for testing experimental Wayland compositors and bleeding-edge Linux kernel branches.",
    historyText: "Created by Fedora developers to allow continuous automated integration testing of next-generation GNOME and Mesa stacks.",
    brandColor: "#0B579E",
    accentColor: "#3C6EB4",
    defaultDE: "GNOME (Next Gen Wayland)",
    initSystem: "systemd",
    packageManager: "rpm-ostree + Flatpak",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fedora_logo.svg",
    screenshotUrl: "https://upload.wikimedia.org/wikipedia/commons/3/30/Fedora_38_Workstation_Landscape.png",
    website: "https://fedoraproject.org",
    reviews: [
      { quote: "Rawhide with ostree is the safest way to test experimental software: if anything breaks, you boot into yesterday's pin.", source: "Fedora Magazine", year: "2024" }
    ],
    keyFeatures: ["Immutable atomic root", "Bleeding-edge Linux 6.10+ kernel", "Native Flatpak sandboxing", "Toolbx integration"]
  },
  {
    name: "Debian Testing 'Trixie'",
    slugPrefix: "debian-trixie",
    tagline: "The rolling preview of the next Debian stable release.",
    family: "Debian",
    baseDescription: "Debian Testing acts as the rolling staging environment where packages migrate after passing Debian Unstable validation. It provides recent software versions backed by Debian's packaging standards.",
    historyText: "Debian testing branches have been named after characters from Disney's Toy Story since the late 1990s. Trixie is named after the blue plastic Triceratops.",
    brandColor: "#D70A53",
    accentColor: "#A80036",
    defaultDE: "GNOME 46 / KDE Plasma 6",
    initSystem: "systemd",
    packageManager: "APT (dpkg)",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/66/Openlogo-debian.svg",
    screenshotUrl: "https://upload.wikimedia.org/wikipedia/commons/7/77/Debian_12_Bookworm_Desktop.png",
    website: "https://www.debian.org/devel/testing",
    reviews: [
      { quote: "Debian Testing gives you 95% of Arch's currency with the reassurance of Debian package curation.", source: "LWN.net", year: "2024" }
    ],
    keyFeatures: ["Rolling development branch of Debian", "Modern package versions", "Extensive multi-architecture support", "Rock-solid community maintenance"]
  },
  {
    name: "Arch Linux ARM Edition",
    slugPrefix: "arch-arm",
    tagline: "Targeted Arch Linux port for 64-bit ARM microcomputers and servers.",
    family: "Arch",
    baseDescription: "Arch Linux ARM brings the simplicity, rolling releases, and pacman excellence of Arch to ARM platforms like the Raspberry Pi 5, Apple Silicon MacBooks (Asahi), and Pinebook Pro laptops.",
    historyText: "Formed in 2011 by Kevin Mihelich to port the Arch philosophy and repository to modern RISC ARM system-on-chip architectures.",
    brandColor: "#1793D1",
    accentColor: "#DF5484",
    defaultDE: "Hyprland / Sway / XFCE",
    initSystem: "systemd",
    packageManager: "Pacman (ARM64 repos)",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Archlinux-logo.svg",
    screenshotUrl: "https://upload.wikimedia.org/wikipedia/commons/2/22/Arch_Linux_Desktop.png",
    website: "https://archlinuxarm.org",
    reviews: [
      { quote: "Running Arch Linux ARM on Apple Silicon MacBooks via Asahi Linux yields desktop performance that feels unbelievable.", source: "Ars Technica", year: "2024" }
    ],
    keyFeatures: ["Optimized for aarch64 and ARMv7", "Full Pacman and PKGBUILD support", "Sub-100MB minimal server images", "Active community device tree ports"]
  },
  {
    name: "openSUSE MicroOS Aeon",
    slugPrefix: "opensuse-aeon",
    tagline: "The automated, self-healing immutable desktop for everyday computing.",
    family: "openSUSE",
    baseDescription: "Aeon brings immutable architecture to the openSUSE ecosystem. Using transactional-update and Btrfs snapshots, the operating system manages its own updates seamlessly in the background without user intervention.",
    historyText: "Started by Richard Brown and openSUSE engineers to explore what a zero-maintenance, automated Linux desktop could look like in production.",
    brandColor: "#73BA25",
    accentColor: "#173F35",
    defaultDE: "Pure GNOME (Wayland)",
    initSystem: "systemd",
    packageManager: "transactional-update + Flatpak + Distrobox",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d0/OpenSUSE_Logo.svg",
    screenshotUrl: "https://upload.wikimedia.org/wikipedia/commons/3/30/Fedora_38_Workstation_Landscape.png",
    website: "https://en.opensuse.org/Portal:Aeon",
    reviews: [
      { quote: "Aeon is the closest thing to an appliance desktop that literally cannot be broken by software updates.", source: "Phoronix", year: "2024" }
    ],
    keyFeatures: ["Read-only root filesystem", "Self-healing transactional updates", "All apps containerized via Flatpak", "Built-in Distrobox for CLI tools"]
  },
  {
    name: "Kubuntu 24.04 LTS",
    slugPrefix: "kubuntu",
    tagline: "The official Ubuntu flavor featuring the powerful and flexible KDE Plasma desktop.",
    family: "Debian",
    baseDescription: "Kubuntu marries the enterprise stability and massive package repository of Ubuntu with the visual splendor and boundless customization of the KDE Plasma desktop environment.",
    historyText: "First released in 2005 alongside Ubuntu 5.04 'Hoary Hedgehog' to cater to users who preferred the Qt/KDE desktop paradigm.",
    brandColor: "#007ACC",
    accentColor: "#E95420",
    defaultDE: "KDE Plasma 5.27 / 6 LTS",
    initSystem: "systemd",
    packageManager: "APT + Flatpak / Snap",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Ubuntu-logo-2022.svg",
    screenshotUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/OpenSUSE_Tumbleweed_KDE.png",
    website: "https://kubuntu.org",
    reviews: [
      { quote: "Kubuntu delivers the best of both worlds: Ubuntu's reliable hardware recognition and KDE's unmatched desktop productivity.", source: "DistroWatch", year: "2024" }
    ],
    keyFeatures: ["Official Ubuntu community flavor", "KDE Plasma with native Wayland session", "Dolphin file manager with split view", "Comprehensive hardware driver support"]
  },
  {
    name: "postmarketOS (Linux on Mobile)",
    slugPrefix: "postmarketos",
    tagline: "A real Linux distribution for smartphones aimed at 10-year device lifespans.",
    family: "Independent",
    baseDescription: "Based on Alpine Linux, postmarketOS is on a mission to extend the lifespan of smartphones and tablets to ten years. It runs a mainline Linux kernel on over 200 mobile devices, bypassing proprietary Android operating system bloat.",
    historyText: "Started in 2017 by Oliver Smith to combat the planned obsolescence of Android smartphones.",
    brandColor: "#009944",
    accentColor: "#005522",
    defaultDE: "Phosh (Phone Shell) / Sxmo / Plasma Mobile",
    initSystem: "OpenRC",
    packageManager: "apk-tools",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Alpine_Linux_logo.svg",
    screenshotUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Alpine_Linux_3.12_Desktop.png",
    website: "https://postmarketos.org",
    reviews: [
      { quote: "postmarketOS proves older smartphones can be transformed into fully functional Linux servers and private communications tools.", source: "Ars Technica", year: "2023" }
    ],
    keyFeatures: ["Extends smartphone lifecycles to 10+ years", "Built on lightweight Alpine Linux", "Mainline Linux kernel integration", "Phosh and Plasma Mobile touch interfaces"]
  },
  {
    name: "Void Linux (musl-libc)",
    slugPrefix: "void-musl",
    tagline: "The ultra-lightweight, musl-based independent distribution for maximum performance.",
    family: "Independent",
    baseDescription: "An alternate edition of Void Linux compiled against the ultra-clean musl standard C library instead of GNU glibc. It delivers smaller binary sizes, lower memory consumption, and extreme mathematical simplicity.",
    historyText: "Void was one of the first major rolling distributions to offer musl-libc as a first-tier installation architecture in 2014.",
    brandColor: "#478061",
    accentColor: "#2F5C43",
    defaultDE: "Sway / i3 / XFCE",
    initSystem: "runit",
    packageManager: "XBPS (musl package tree)",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/02/Void_Linux_logo.svg",
    screenshotUrl: "https://upload.wikimedia.org/wikipedia/commons/a/af/Void_Linux_with_XFCE.png",
    website: "https://voidlinux.org",
    reviews: [
      { quote: "Void musl is the most responsive Linux desktop I have ever used. Compilations finish in record time.", source: "Hacker News", year: "2024" }
    ],
    keyFeatures: ["Compiled with musl C standard library", "Zero systemd overhead via runit", "XBPS package manager with lightning unpack speeds", "Sub-150MB baseline RAM footprint"]
  },
  {
    name: "Xubuntu 24.04 LTS",
    slugPrefix: "xubuntu",
    tagline: "The lightweight, responsive Ubuntu flavor featuring the polished XFCE desktop.",
    family: "Debian",
    baseDescription: "Xubuntu combines the robust Ubuntu foundation with the lightweight XFCE desktop environment. Known for its rock-solid stability, low memory usage, and classic desktop paradigm, it is an ideal choice for both modern and older PCs.",
    historyText: "Debuted in 2006 with the 6.06 Dapper Drake release. It became the distribution of choice for users seeking the stability of Ubuntu without the resource overhead of GNOME.",
    brandColor: "#055B9E",
    accentColor: "#0099FF",
    defaultDE: "XFCE 4.18",
    initSystem: "systemd",
    packageManager: "APT + Snap / Flatpak",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Ubuntu-logo-2022.svg",
    screenshotUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Ubuntu_22.04_LTS_Desktop.png",
    website: "https://xubuntu.org",
    reviews: [
      { quote: "Xubuntu is the definition of workhorse Linux: no gimmicks, no sudden interface redesigns, just rock-solid reliability.", source: "Everyday Linux User", year: "2024" }
    ],
    keyFeatures: ["XFCE 4.18 desktop environment", "Idles at under 600 MB of RAM", "Thunar file manager with custom actions", "Long-term support through 2027"]
  }
];

export function generateProceduralDistros(count: number, excludedSlugs: Set<string>, sessionSeed: number): Distro[] {
  const generated: Distro[] = [];
  let index = 0;

  while (generated.length < count) {
    const templateIndex = (sessionSeed + index + generated.length) % SEED_TEMPLATES.length;
    const template = SEED_TEMPLATES[templateIndex];
    const generationNumber = Math.floor((index + sessionSeed) / SEED_TEMPLATES.length) + 1;
    const slug = generationNumber === 1 ? template.slugPrefix : `${template.slugPrefix}-gen${generationNumber}`;

    if (!excludedSlugs.has(slug)) {
      excludedSlugs.add(slug);
      
      const distroName = generationNumber === 1 
        ? template.name 
        : `${template.name} (Release Snapshot #${generationNumber})`;

      generated.push({
        name: distroName,
        slug,
        tagline: template.tagline,
        description: template.baseDescription,
        history: template.historyText,
        family: template.family,
        releaseModel: "Continuous Community Snapshot",
        brandColor: template.brandColor,
        accentColor: template.accentColor,
        specs: {
          kernel: `Linux 6.${(8 + (generationNumber % 4))}+ (Optimized Kernel)`,
          packageManager: template.packageManager,
          initSystem: template.initSystem,
          desktopEnvironment: template.defaultDE,
          displayServer: "Wayland & X11",
          defaultFilesystem: "Btrfs with transparent compression / ext4",
          architecture: ["x86_64", "aarch64"]
        },
        systemRequirements: {
          min: { cpu: "Dual Core 64-bit", ram: "2 GB", hdd: "20 GB" },
          recommended: { cpu: "Quad Core 2.5 GHz+", ram: "8 GB+", hdd: "50 GB SSD", gpu: "Hardware acceleration capable" }
        },
        logoUrl: template.logoUrl,
        screenshotUrl: template.screenshotUrl,
        reviews: template.reviews,
        keyFeatures: template.keyFeatures,
        cliSnippet: {
          label: "Synchronize package repositories",
          command: "sudo sys-update --refresh"
        },
        releaseDate: `2024-${String((generationNumber % 12) + 1).padStart(2, '0')}-15`,
        website: template.website,
        docUrl: template.website,
        downloadUrl: template.website
      });
    }

    index++;
    if (index > 1000) break; // safeguard
  }

  return generated;
}
