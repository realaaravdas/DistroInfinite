export interface DistroSpecs {
  kernel: string;
  packageManager: string;
  initSystem: string;
  desktopEnvironment: string;
  displayServer?: string;
  defaultFilesystem?: string;
  architecture?: string[];
}

export interface SystemRequirements {
  min: {
    cpu: string;
    ram: string;
    hdd: string;
    gpu?: string;
  };
  recommended: {
    cpu: string;
    ram: string;
    hdd: string;
    gpu?: string;
  };
}

export interface ReviewItem {
  quote: string;
  source: string;
  author?: string;
  year?: string;
}

export interface Distro {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  history: string;
  family: 'Debian' | 'Arch' | 'Fedora/RHEL' | 'openSUSE' | 'Gentoo' | 'Independent' | 'Slackware';
  releaseModel: string;
  brandColor: string;
  accentColor: string;
  specs: DistroSpecs;
  systemRequirements: SystemRequirements;
  logoUrl: string;
  screenshotUrl: string;
  wallpaperUrl?: string;
  fastfetchAscii?: string[];
  reviews: ReviewItem[];
  keyFeatures: string[];
  cliSnippet: {
    label: string;
    command: string;
  };
  releaseDate: string;
  website: string;
  docUrl?: string;
  downloadUrl?: string;
}
