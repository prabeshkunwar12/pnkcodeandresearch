export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type WorkCard = {
  title: string;
  desc: string;
};

export type SystemsCard = WorkCard & {
  mainImage: string;
  images: GalleryImage[];
};

export type RoomImage = {
  src: string;
  index: number;
};

export type GameRoom = {
  key: string;
  name: string;
  coverImage: string;
  completedImages: RoomImage[];
  constructionImages: RoomImage[];
};

export type ArchitectureNode = {
  id: string;
  title: string;
  subtitle: string;
  details: string[];
  desktopClassName: string;
  dominant?: boolean;
  href?: string;
};

export type ArchitectureEdge = {
  from: string;
  to: string;
  label: string;
  direction?: "uni" | "bi";
  variant?: "solid" | "dashed";
};

export type ImpactItem = {
  key: string;
  title: string;
  description: string;
};

export type CapabilityBlock = {
  title: string;
  description: string;
  heading?: string;
  bullets: string[];
  projects: Array<{
    label: string;
    href: string;
  }>;
};
