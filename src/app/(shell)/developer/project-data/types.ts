export type ProjectLink = { label: string; href: string };

export type ProjectFact = { label: string; value: string };

export type ProjectMedia = {
  src: string;
  alt: string;
  caption?: string;
  objectPosition?: string;
};

export type ProjectArchitectureNode = {
  id: string;
  label: string;
  row?: number;
};

export type ProjectArchitectureEdge = {
  from: string;
  to: string;
  label?: string;
  bidirectional?: boolean;
  labelOffsetX?: number;
  labelOffsetY?: number;
};

export type ProjectArchitectureMap = {
  title?: string;
  description?: string;
  badges?: string[];
  nodes: ProjectArchitectureNode[];
  edges: ProjectArchitectureEdge[];
};

export type TechItem = {
  name: string;
  iconSrc?: string;
  lightIconSrc?: string;
  darkIconSrc?: string;
  iconSrcDark?: string;
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  content: string;
  featured?: boolean;
  techStack: TechItem[];
  company?: string;
  period?: string;
  role?: string;
  mediaKeys?: string[];
  media?: ProjectMedia[];
  cardBackgroundImage?: ProjectMedia;
  mediaSectionTitle?: string;
  mediaSectionMetrics?: string[];
  mediaSectionLayout?: "carousel" | "gallery" | "coverflow";
  links?: ProjectLink[];
  tags?: string[];
  typeTags?: string[];
  techTags?: string[];
  relatedProjectIds?: string[];
  architecture?: ProjectArchitectureMap;
  quickFacts?: ProjectFact[];
  overviewContent?: string;
  modulesContent?: string;
  middlewareContent?: string;
  architectureNotes?: string;
  architectureNotesContent?: string;
  customerFlowContent?: string;
  playerFlowContent?: string;
  workflowContent?: string;
  workflowTitle?: string;
  logicStructureContent?: string;
  screenTypesContent?: string;
  devicesContent?: string;
  softwareFlowContent?: string;
  controllerTypesContent?: string;
  deviceFlowContent?: string;
  corePagesContent?: string;
  responsibilitiesContent?: string;
  adminPanelContent?: string;
  evolutionContent?: string;
  evolutionTitle?: string;
  challengesContent?: string;
  reliabilityContent?: string;
  contributionContent?: string;
  stackDecisionContent?: string;
  impactContent?: string;
  architectureMap?: ProjectArchitectureMap;
};
