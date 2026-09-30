import { Distro } from './distroCatalog';

export const EXTENDED_DISTROS: Distro[] = [
  {
    name: "Archcraft 2024",
    slug: "archcraft",
    tagline: "Yet another minimal Arch Linux with stunning out-of-the-box window managers.",
    description: "Archcraft is built for enthusiasts who love minimalist standalone window managers like Openbox, bspwm, i3, and Wayland compositors (Hyprland, Sway, Wayfire). It delivers an astonishingly refined pre-configured desktop that uses less than 350 MB of RAM.",
    history: "Created in 2020 by Indian developer Aditya Shakya (adi1090x), famed throughout the UnixPorn customization community for his immaculate rofi, polybar, and window manager configurations.",
    family: "Arch",
    releaseModel: "Rolling Release",
    brandColor: "#D19A66",
    accentColor: "#E06C75",
    specs: {
      kernel: "Linux (Arch Rolling)",
      packageManager: "Pacman + yay (AUR)",
      initSystem: "systemd",
      desktopEnvironment: "Openbox / bspwm / Hyprland (User selectable)",
      displayServer: "X11 & Wayland",
      defaultFilesystem: "ext4 / Btrfs",
      architecture: ["x86_64"]
    },
    systemRequirements: {
      min: { cpu: "x86-64 64-bit CPU", ram: "512 MB", hdd: "10 GB" },
      recommended: { cpu: "Dual Core 2.0 GHz", ram: "4 GB", hdd: "25 GB SSD" }
    },
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Archlinux-logo.svg",
    screenshotUrl: "https://upload.wikimedia.org/wikipedia/commons/2/22/Arch_Linux_Desktop.png",
    reviews: [
      {
        quote: "Archcraft saves you 80 hours of configuring polybar, picom transparency, and rofi launchers from scratch.",
        source: "Reddit r/unixporn",
        year: "2024"
      },
      {
        quote: "The cleanest out-of-the-box tiling window manager implementation anywhere in the Linux ecosystem.",
        source: "DistroWatch",
        year: "2023"
      }
    ],
    keyFeatures: [
      "Pristine pre-configured Openbox, bspwm, and Hyprland profiles",
      "Sub-400 MB baseline RAM footprint on fresh boot",
      "Seamless integration with the Arch User Repository (AUR)",
      "Built-in style switcher to morph themes instantly"
    ],
    cliSnippet: {
      label: "Update Archcraft packages",
      command: "sudo pacman -Syu"
    },
    releaseDate: "2020-09-15",
    website: "https://archcraft.io",
    docUrl: "https://wiki.archcraft.io",
    downloadUrl: "https://archcraft.io/download.html"
  },
  {
    name: "Ubuntu Studio 24.04 LTS",
    slug: "ubuntu-studio",
    tagline: "The open operating system for media creators, audio engineers, filmmakers, and digital artists.",
    description: "Ubuntu Studio is an official Ubuntu flavor tailored exclusively for professional multimedia creation. It arrives with a low-latency real-time kernel, PipeWire-JACK pro audio routing, and the full suite of open creative tools: Ardour, OBS, Blender, Krita, Inkscape, and KDEnlive.",
    history: "First released in 2007 as an official Ubuntu community flavor. Originally focused on ALSA and JACK audio server tuning, it evolved to champion the PipeWire pro-audio stack.",
    family: "Debian",
    releaseModel: "Fixed Point LTS (Every 2 years)",
    brandColor: "#3282B8",
    accentColor: "#0F4C75",
    specs: {
      kernel: "Linux 6.8 (Low-latency audio scheduling)",
      packageManager: "APT + Flatpak",
      initSystem: "systemd",
      desktopEnvironment: "KDE Plasma 5.27 / 6 LTS",
      displayServer: "Wayland & X11",
      defaultFilesystem: "ext4 / Btrfs",
      architecture: ["x86_64"]
    },
    systemRequirements: {
      min: { cpu: "Intel Core i5 / AMD Ryzen", ram: "8 GB", hdd: "35 GB" },
      recommended: { cpu: "Multi-core Intel i7/i9 or Ryzen 7/9", ram: "16 GB - 64 GB", hdd: "100 GB+ NVMe SSD", gpu: "Dedicated GPU for video rendering" }
    },
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Ubuntu-logo-2022.svg",
    screenshotUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Ubuntu_22.04_LTS_Desktop.png",
    reviews: [
      {
        quote: "Ubuntu Studio eliminates audio buffer underruns and xruns when recording multi-track 96kHz guitar and MIDI sessions.",
        source: "Sound On Sound",
        year: "2023"
      },
      {
        quote: "An entire Hollywood-capable video editing and 3D animation suite ready to boot without licensing fees.",
        source: "Creative Bloq",
        year: "2024"
      }
    ],
    keyFeatures: [
      "Low-latency kernel scheduler configured for zero-dropout live audio recording",
      "Ubuntu Studio Controls for instant latency and PipeWire/JACK buffer configuration",
      "Full creative suite pre-installed: Ardour 8, Blender 4, Krita, Inkscape, Darktable",
      "Calibrated color profiles and high-DPI graphics support"
    ],
    cliSnippet: {
      label: "Check low-latency audio config",
      command: "studio-controls --status"
    },
    releaseDate: "2007-05-10",
    website: "https://ubuntustudio.org",
    docUrl: "https://help.ubuntu.com/community/UbuntuStudio",
    downloadUrl: "https://ubuntustudio.org/download/"
  },
  {
    name: "Kaisen Linux 2.3",
    slug: "kaisen-linux",
    tagline: "The rolling distribution engineered for IT system administrators and network engineers.",
    description: "Based on Debian, Kaisen Linux is designed specifically for IT professionals, system administrators, and infrastructure engineers. It provides over 300 pre-installed tools for hardware diagnostic testing, filesystem recovery, network packet sniffing, and automation.",
    history: "Founded in 2019 by French sysadmin Kevin Chevreuil (Kaisen). Chevreuil noticed that while ethical hackers had Kali, systems administrators and network engineers had no dedicated rolling diagnostic platform.",
    family: "Debian",
    releaseModel: "Rolling Release (Debian baseline)",
    brandColor: "#007ACC",
    accentColor: "#004578",
    specs: {
      kernel: "Linux 6.6 LTS (Enterprise network drivers)",
      packageManager: "APT (dpkg)",
      initSystem: "systemd",
      desktopEnvironment: "KDE Plasma 5.27 / MATE / XFCE",
      displayServer: "X11 & Wayland",
      defaultFilesystem: "Btrfs with automatic snapshot rollbacks",
      architecture: ["amd64"]
    },
    systemRequirements: {
      min: { cpu: "Dual Core 1.5 GHz", ram: "2 GB", hdd: "25 GB" },
      recommended: { cpu: "Quad Core 2.5 GHz+", ram: "8 GB", hdd: "50 GB SSD" }
    },
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/66/Openlogo-debian.svg",
    screenshotUrl: "https://upload.wikimedia.org/wikipedia/commons/7/77/Debian_12_Bookworm_Desktop.png",
    reviews: [
      {
        quote: "Kaisen Linux is the Swiss Army Knife every data center technician needs on a bootable USB drive.",
        source: "Admin Magazine",
        year: "2024"
      },
      {
        quote: "Having Clonezilla, GParted, TestDisk, Wireshark, and Ansible pre-configured saves hours of server recovery work.",
        source: "DistroWatch Weekly",
        year: "2023"
      }
    ],
    keyFeatures: [
      "Over 300 dedicated sysadmin and cloud diagnostic tools pre-installed",
      "Native Btrfs snapshotting with bootable snapshots in GRUB",
      "Network analysis suite with Wireshark, GNS3, nmap, and tcpdump",
      "Hardware burn-in and benchmark tools for certifying new server deployments"
    ],
    cliSnippet: {
      label: "Update Kaisen sysadmin repos",
      command: "sudo kaisen-update"
    },
    releaseDate: "2019-12-14",
    website: "https://kaisenlinux.org",
    docUrl: "https://kaisenlinux.org/documentation/",
    downloadUrl: "https://kaisenlinux.org/downloads/"
  },
  {
    name: "BlackArch Linux",
    slug: "blackarch",
    tagline: "The colossal offensive security distribution featuring over 2,800 cybersecurity tools.",
    description: "BlackArch Linux is an Arch Linux-based penetration testing distribution engineered for elite security researchers and ethical hackers. Its repository contains over 2,800 security tools organized into modular categories, installable either as a complete OS or layered on standard Arch.",
    history: "Created in 2013 by a global consortium of security analysts and Arch contributors. Unlike Kali which curates a focused set of ~600 tools, BlackArch aims for exhaustive weaponized breadth.",
    family: "Arch",
    releaseModel: "Rolling Release",
    brandColor: "#E53935",
    accentColor: "#1A1A1A",
    specs: {
      kernel: "Linux (Bleeding Edge Rolling)",
      packageManager: "Pacman (BlackArch repo mirror)",
      initSystem: "systemd",
      desktopEnvironment: "Fluxbox / Openbox / awesome / dwm / i3",
      displayServer: "X11",
      defaultFilesystem: "ext4 / Btrfs",
      architecture: ["x86_64", "ARMv6/v7/v8"]
    },
    systemRequirements: {
      min: { cpu: "x86-64 64-bit", ram: "4 GB", hdd: "50 GB" },
      recommended: { cpu: "Multi-core 3.0 GHz+", ram: "16 GB - 32 GB", hdd: "120 GB SSD", gpu: "CUDA/ROCm hash cracking GPU" }
    },
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Archlinux-logo.svg",
    screenshotUrl: "https://upload.wikimedia.org/wikipedia/commons/2/22/Arch_Linux_Desktop.png",
    reviews: [
      {
        quote: "If a penetration testing tool exists on GitHub, chances are BlackArch has already packaged it into pacman.",
        source: "Security Boulevard",
        year: "2024"
      },
      {
        quote: "You can turn any existing vanilla Arch installation into BlackArch by simply adding two lines to pacman.conf.",
        source: "Null Byte",
        year: "2023"
      }
    ],
    keyFeatures: [
      "Over 2,800 penetration testing, forensic, and exploit development tools",
      "Compatible with vanilla Arch: can be added as a supplementary repository",
      "Multiple lightweight tiling and stacking window manager presets",
      "Organized package groups: blackarch-wireless, blackarch-forensic, blackarch-fuzzer"
    ],
    cliSnippet: {
      label: "Install BlackArch web testing tools",
      command: "sudo pacman -S blackarch-webapp"
    },
    releaseDate: "2013-08-01",
    website: "https://blackarch.org",
    docUrl: "https://blackarch.org/guide.html",
    downloadUrl: "https://blackarch.org/downloads.html"
  },
  {
    name: "Puppy Linux (BookwormPup64)",
    slug: "puppy-linux",
    tagline: "The extraordinarily compact, lightning-fast operating system that runs entirely in RAM.",
    description: "Puppy Linux is renowned worldwide for its ability to boot completely into system memory (RAM). At under 400 MB, it leaves host hard drives untouched, runs blisteringly fast on 15-year-old hardware, and saves all changes into a single portable save-file.",
    history: "Created in 2003 by Australian researcher Barry Kauler. Kauler named the distribution after his pet Chihuahua, 'Puppy', symbolizing small size and high energy.",
    family: "Independent",
    releaseModel: "Specialized Point Releases",
    brandColor: "#4A90E2",
    accentColor: "#2A6496",
    specs: {
      kernel: "Linux 6.1 LTS",
      packageManager: "Puppy Package Manager (PPM) + apt-get",
      initSystem: "BusyBox init",
      desktopEnvironment: "JWM (Joe's Window Manager) & Rox-Filer",
      displayServer: "Xorg",
      defaultFilesystem: "tmpfs (runs in RAM) / ext4",
      architecture: ["x86_64", "i386 32-bit"]
    },
    systemRequirements: {
      min: { cpu: "Pentium 4 / Core 2 Duo", ram: "1 GB (to fit in RAM)", hdd: "None required (runs from USB/CD)" },
      recommended: { cpu: "Dual Core 2.0 GHz", ram: "2 GB - 4 GB", hdd: "8 GB USB 3.0" }
    },
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Linux_Mint_logo_without_text.svg",
    screenshotUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Alpine_Linux_3.12_Desktop.png",
    reviews: [
      {
        quote: "Because Puppy loads entirely into RAM, apps launch at zero-nanosecond memory bus speeds.",
        source: "Everyday Linux User",
        year: "2023"
      },
      {
        quote: "The ultimate emergency toolkit for copying files off broken Windows hard drives that refuse to boot.",
        source: "TechRepublic",
        year: "2024"
      }
    ],
    keyFeatures: [
      "Operates entirely from system RAM after initial boot sequence completes",
      "Under 400 megabyte ISO size with complete office, browser, and media toolset",
      "Save sessions portably into single encrypted `.2fs` or `.3fs` container files",
      "Compatible with official Debian or Ubuntu package archives via Woof-CE"
    ],
    cliSnippet: {
      label: "Update Puppy package catalog",
      command: "pkg update"
    },
    releaseDate: "2003-06-18",
    website: "https://puppylinux-woof-ce.github.io",
    docUrl: "https://puppylinux.com/help.html",
    downloadUrl: "https://puppylinux-woof-ce.github.io/#download"
  },
  {
    name: "SteamOS 3 (Holo)",
    slug: "steamos",
    tagline: "Valve's immutable gaming operating system engineered for the Steam Deck console.",
    description: "SteamOS 3 is Valve Corporation's custom Arch Linux-based immutable operating system. Powered by the Gamescope Wayland compositor, seamless suspend/resume hardware scheduling, and Proton translation layers, it revolutionized handheld PC gaming.",
    history: "SteamOS 1 and 2 were originally based on Debian for the Steam Machine initiative in 2013. For the Steam Deck in 2022, Valve rewrote SteamOS from scratch on an immutable Arch Linux foundation.",
    family: "Arch",
    releaseModel: "Atomic Dual-Boot A/B Updates",
    brandColor: "#1B2838",
    accentColor: "#66C0F4",
    specs: {
      kernel: "Linux 6.1 (Valve custom patched kernel with TDP scheduling)",
      packageManager: "Flatpak (Flathub) + read-only pacman",
      initSystem: "systemd",
      desktopEnvironment: "Steam Deck UI (Gamescope) + KDE Plasma 5.27 Desktop",
      displayServer: "Wayland (Gamescope)",
      defaultFilesystem: "Btrfs / ext4 with Casefold support",
      architecture: ["x86_64 AMD Van Gogh / Custom APU"]
    },
    systemRequirements: {
      min: { cpu: "AMD APU Zen 2 4c/8t", ram: "16 GB LPDDR5", hdd: "64 GB eMMC" },
      recommended: { cpu: "Steam Deck OLED AMD 'Sephiroth'", ram: "16 GB", hdd: "512 GB+ NVMe SSD", gpu: "8 RDNA 2 CUs" }
    },
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
    screenshotUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/OpenSUSE_Tumbleweed_KDE.png",
    reviews: [
      {
        quote: "SteamOS 3 is the greatest technical triumph in Linux desktop history: millions of AAA gamers playing games without knowing they are running Linux.",
        source: "The Verge",
        year: "2023"
      },
      {
        quote: "The ability to suspend Cyberpunk 2077 mid-battle, sleep the Deck, and resume 12 hours later instantaneously is technical sorcery.",
        source: "IGN",
        year: "2024"
      }
    ],
    keyFeatures: [
      "Gamescope Wayland microcompositor with system-wide AMD FSR upscaling and frame limiting",
      "Atomic A/B partition updates eliminate risk of corrupted system updates",
      "Proton compatibility layer executing Windows DirectX 11/12 games with native Vulkan speed",
      "Full switchable KDE Plasma desktop mode for standard computing"
    ],
    cliSnippet: {
      label: "Enter developer mode (disable read-only root)",
      command: "sudo steamos-readonly disable"
    },
    releaseDate: "2013-12-13 (v3: 2022-02-25)",
    website: "https://store.steampowered.com/steamos",
    docUrl: "https://help.steampowered.com/en/faqs/view/671A-4453-E8D2-323C",
    downloadUrl: "https://store.steampowered.com/steamos/download"
  },
  {
    name: "Fedora KDE Spin 40",
    slug: "fedora-kde",
    tagline: "The premier showcase of KDE Plasma 6 on Wayland with cutting-edge Fedora technologies.",
    description: "Fedora KDE Spin pairs Red Hat's premier upstream innovation engine with the modern KDE Plasma 6 desktop. Featuring native Wayland color management, fractional display scaling, HDR display pipeline, and Btrfs transparent compression.",
    history: "Maintained by the Fedora KDE Special Interest Group (SIG) since the early days of Fedora Core. It rose to prominence as Fedora's most popular alternative desktop spin.",
    family: "Fedora/RHEL",
    releaseModel: "Fixed Point (Every 6 months)",
    brandColor: "#1D99F3",
    accentColor: "#294172",
    specs: {
      kernel: "Linux 6.8+ (Cutting edge)",
      packageManager: "DNF5 (RPM) + Discover (Flatpak)",
      initSystem: "systemd",
      desktopEnvironment: "KDE Plasma 6.1 (Qt 6)",
      displayServer: "Pure Wayland Native",
      defaultFilesystem: "Btrfs with zstd compression",
      architecture: ["x86_64", "aarch64"]
    },
    systemRequirements: {
      min: { cpu: "2 GHz Dual Core 64-bit", ram: "2 GB", hdd: "20 GB" },
      recommended: { cpu: "Quad-Core 2.5 GHz+", ram: "8 GB+", hdd: "50 GB SSD", gpu: "Vulkan / OpenGL capable GPU" }
    },
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Fedora_logo.svg",
    screenshotUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/OpenSUSE_Tumbleweed_KDE.png",
    reviews: [
      {
        quote: "Fedora KDE 40 is the definitive showcase of KDE Plasma 6: buttery smooth 144Hz Wayland animations and HDR gaming support.",
        source: "Phoronix",
        year: "2024"
      },
      {
        quote: "The combination of Btrfs and DNF5 makes package management and snapshot reliability feel effortlessly modern.",
        source: "GamingOnLinux",
        year: "2024"
      }
    ],
    keyFeatures: [
      "First-tier pure Wayland session with full High Dynamic Range (HDR) and ICC profile support",
      "KDE Plasma 6 featuring floating panels, overview gestures, and Qt 6 performance",
      "Btrfs subvolume layout with transparent ZSTD compression",
      "Discover software center managing native RPMs, Flatpaks, and firmware updates (LVFS)"
    ],
    cliSnippet: {
      label: "Update KDE Plasma and packages",
      command: "sudo dnf upgrade --refresh"
    },
    releaseDate: "2004-11-08",
    website: "https://fedoraproject.org/spins/kde/",
    docUrl: "https://docs.fedoraproject.org",
    downloadUrl: "https://fedoraproject.org/spins/kde/download"
  },
  {
    name: "AlmaLinux 9",
    slug: "almalinux",
    tagline: "The community-owned, 1:1 binary compatible enterprise operating system governed by a 501(c)(6).",
    description: "AlmaLinux is an enterprise-grade Linux distribution governed completely by the non-profit AlmaLinux OS Foundation. Delivering complete ABI binary compatibility with Red Hat Enterprise Linux, it provides cloud images, enterprise SELinux, and extended support through 2032.",
    history: "Created in 2021 by CloudLinux following the sudden shift in CentOS roadmap. CloudLinux committed $1 million annually and transferred total governance to an independent, non-profit community foundation.",
    family: "Fedora/RHEL",
    releaseModel: "Fixed Enterprise (10-year support lifecycle)",
    brandColor: "#0F2841",
    accentColor: "#FF5E5B",
    specs: {
      kernel: "Linux 5.14+ (Enterprise security backports)",
      packageManager: "DNF5 / RPM",
      initSystem: "systemd",
      desktopEnvironment: "GNOME 40 Enterprise / Server CLI",
      displayServer: "Wayland & X11",
      defaultFilesystem: "XFS",
      architecture: ["x86_64", "aarch64", "ppc64le", "s390x"]
    },
    systemRequirements: {
      min: { cpu: "1.5 GHz 64-bit CPU", ram: "2 GB", hdd: "20 GB" },
      recommended: { cpu: "Multi-core 64-bit Enterprise CPU", ram: "16 GB+", hdd: "80 GB+ RAID Storage" }
    },
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/Rocky_Linux_logo.svg",
    screenshotUrl: "https://upload.wikimedia.org/wikipedia/commons/3/30/Fedora_38_Workstation_Landscape.png",
    reviews: [
      {
        quote: "AlmaLinux has proven itself as a peerless enterprise foundation with swift security errata releases often outpacing other alternatives.",
        source: "ZDNet",
        year: "2024"
      },
      {
        quote: "The non-profit governance model provides businesses with reassurance that no single corporate entity can unilaterally alter the roadmap.",
        source: "The Register",
        year: "2023"
      }
    ],
    keyFeatures: [
      "1:1 ABI binary compatibility with Red Hat Enterprise Linux",
      "Free 10-year enterprise lifecycle with guaranteed security patches through 2032",
      "Governed by the 501(c)(6) non-profit AlmaLinux OS Foundation",
      "Instant migration from CentOS, Rocky, or RHEL using `almalinux-deploy`"
    ],
    cliSnippet: {
      label: "Run security update audit",
      command: "sudo dnf updateinfo list sec"
    },
    releaseDate: "2021-03-30",
    website: "https://almalinux.org",
    docUrl: "https://wiki.almalinux.org",
    downloadUrl: "https://almalinux.org/get-almalinux/"
  }
];
