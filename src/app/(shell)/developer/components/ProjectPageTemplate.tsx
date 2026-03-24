"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { FocusGallery } from "@/components/shared/FocusGallery";
import { Card } from "@/components/ui/card";
import { useThemeContext } from "@/components/theme-context";
import { resolveTechIcon } from "@/data/images";
import type { Project, ProjectMedia, TechItem } from "../data";
import { ArchitectureMap } from "./ArchitectureMap";
import { ProjectView } from "./ProjectView";
import { projectPageTypography as type } from "./project-page-typography";

type ProjectPageTemplateProps = {
  project: Project;
  relatedProjects: Project[];
  media: ProjectMedia[];
};

export function ProjectPageTemplate({
  project,
  relatedProjects,
  media,
}: ProjectPageTemplateProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme } = useThemeContext();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setActiveIndex(0);
  }, [project.slug]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const hasMedia = media.length > 0;
  const orderedTechStack = orderTechStack(project.techStack);
  const featuredTechStack = orderedTechStack.slice(0, 4);
  const supportingTechStack = orderedTechStack.slice(featuredTechStack.length);
  const hasStructuredLayout = Boolean(
      project.overviewContent ||
      project.modulesContent ||
      project.middlewareContent ||
      project.playerFlowContent ||
      project.workflowContent ||
      project.logicStructureContent ||
      project.screenTypesContent ||
      project.devicesContent ||
      project.softwareFlowContent ||
      project.controllerTypesContent ||
      project.deviceFlowContent ||
      project.corePagesContent ||
      project.architectureNotes ||
      project.architectureNotesContent ||
      project.architecture ||
      project.responsibilitiesContent ||
      project.adminPanelContent ||
      project.customerFlowContent ||
      project.evolutionContent ||
      project.challengesContent ||
      project.reliabilityContent ||
      project.contributionContent ||
      project.stackDecisionContent ||
      project.impactContent ||
      project.architectureMap ||
      project.quickFacts?.length,
  );

  const nextImage = () => {
    if (!hasMedia) return;
    setActiveIndex((prev) => (prev + 1) % media.length);
  };

  const prevImage = () => {
    if (!hasMedia) return;
    setActiveIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  return (
    <div className="mx-auto w-full max-w-none space-y-6 px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
      <HeroCard
        project={project}
        orderedTechStack={orderedTechStack}
        isDark={isDark}
        isMounted={isMounted}
      />

      {hasMedia ? (
        <SectionCard>
          <MediaBlock
            layout={project.mediaSectionLayout}
            media={media}
            activeIndex={activeIndex}
            nextImage={nextImage}
            prevImage={prevImage}
            title={project.mediaSectionTitle}
            metrics={project.mediaSectionMetrics}
          />
        </SectionCard>
      ) : null}

      {hasStructuredLayout ? (
        <>
          {project.overviewContent ? (
            <PageSection id="overview" label="Overview">
              <MarkdownSectionCard title="Overview" content={project.overviewContent} />
            </PageSection>
          ) : null}

          {(project.architecture ?? project.architectureMap) || project.architectureNotes ? (
            <PageSection id="architecture" label="Architecture">
              <SectionCard className="space-y-6">
                {project.architecture ?? project.architectureMap ? (
                  <ArchitectureMap
                    architecture={(project.architecture ?? project.architectureMap)!}
                  />
                ) : null}
                {project.architectureNotes ? (
                  <div className="rounded-2xl border border-black/10 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5 sm:p-5">
                    <MarkdownBody content={project.architectureNotes} />
                  </div>
                ) : null}
              </SectionCard>
            </PageSection>
          ) : null}

          {project.customerFlowContent ? (
            <PageSection id="customer-flow" label="Customer Flow">
              <MarkdownSectionCard
                title="Customer Flow"
                content={project.customerFlowContent}
              />
            </PageSection>
          ) : null}

          {project.architectureNotesContent ? (
            <PageSection id="architecture-notes" label="Architecture Notes">
              <MarkdownSectionCard
                title="Architecture Notes"
                content={project.architectureNotesContent}
              />
            </PageSection>
          ) : null}

          {project.modulesContent ? (
            <PageSection id="core-modules" label="Core Modules">
              <MarkdownSectionCard
                title="Core Modules"
                content={project.modulesContent}
              />
            </PageSection>
          ) : null}

          {project.middlewareContent ? (
            <PageSection id="request-flow-middleware" label="Request Flow & Middleware">
              <MarkdownSectionCard
                title="Request Flow & Middleware"
                content={project.middlewareContent}
              />
            </PageSection>
          ) : null}

          {project.workflowContent ? (
            <PageSection
              id={toSectionId(project.workflowTitle ?? "Workflow")}
              label={project.workflowTitle ?? "Workflow"}
            >
              <MarkdownSectionCard
                title={project.workflowTitle ?? "Workflow"}
                content={project.workflowContent}
              />
            </PageSection>
          ) : null}

          {project.playerFlowContent ? (
            <PageSection id="player-registration-flow" label="Player Registration Flow">
              <MarkdownSectionCard
                title="Player Registration Flow"
                content={project.playerFlowContent}
              />
            </PageSection>
          ) : null}

          {project.logicStructureContent ? (
            <PageSection id="game-logic-structure" label="Game Logic Structure">
              <MarkdownSectionCard
                title="Game Logic Structure"
                content={project.logicStructureContent}
              />
            </PageSection>
          ) : null}

          {project.screenTypesContent ? (
            <PageSection id="screen-types" label="Screen Types">
              <MarkdownSectionCard
                title="Screen Types"
                content={project.screenTypesContent}
              />
            </PageSection>
          ) : null}

          {project.devicesContent ? (
            <PageSection id="common-room-devices" label="Common Room Devices">
              <MarkdownSectionCard
                title="Common Room Devices"
                content={project.devicesContent}
              />
            </PageSection>
          ) : null}

          {project.softwareFlowContent ? (
            <PageSection id="software-flow" label="Software Flow">
              <MarkdownSectionCard
                title="Software Flow"
                content={project.softwareFlowContent}
              />
            </PageSection>
          ) : null}

          {project.controllerTypesContent ? (
            <PageSection id="controller-types" label="Controller Types">
              <MarkdownSectionCard
                title="Controller Types"
                content={project.controllerTypesContent}
              />
            </PageSection>
          ) : null}

          {project.deviceFlowContent ? (
            <PageSection id="device-flow" label="Device Flow">
              <MarkdownSectionCard
                title="Device Flow"
                content={project.deviceFlowContent}
              />
            </PageSection>
          ) : null}

          {project.corePagesContent ? (
            <PageSection id="core-pages" label="Core Pages">
              <MarkdownSectionCard
                title="Core Pages"
                content={project.corePagesContent}
              />
            </PageSection>
          ) : null}

          {project.responsibilitiesContent ? (
            <PageSection id="core-responsibilities" label="Core Responsibilities">
              <MarkdownSectionCard
                title="Core Responsibilities"
                content={project.responsibilitiesContent}
              />
            </PageSection>
          ) : null}

          {project.adminPanelContent ? (
            <PageSection
              id="admin-panel-hardware-control"
              label="Admin Panel & Hardware Control"
            >
              <MarkdownSectionCard
                title="Admin Panel & Hardware Control"
                content={project.adminPanelContent}
              />
            </PageSection>
          ) : null}

          {project.evolutionContent ? (
            <PageSection
              id={
                project.evolutionTitle === "Evolution"
                  ? "evolution"
                  : "interface-evolution"
              }
              label={project.evolutionTitle ?? "Interface Evolution"}
            >
              <MarkdownSectionCard
                title={project.evolutionTitle ?? "Interface Evolution"}
                content={project.evolutionContent}
              />
            </PageSection>
          ) : null}

          {project.challengesContent ? (
            <PageSection id="challenges" label="Challenges">
              <MarkdownSectionCard
                title="Challenges"
                content={project.challengesContent}
              />
            </PageSection>
          ) : null}

          {project.reliabilityContent ? (
            <PageSection
              id="reliability-operations"
              label="Reliability & Operations"
            >
              <MarkdownSectionCard
                title="Reliability & Operations"
                content={project.reliabilityContent}
              />
            </PageSection>
          ) : null}

          {project.contributionContent ? (
            <PageSection id="my-contribution" label="My Contribution">
              <MarkdownSectionCard
                title="My Contribution"
                content={project.contributionContent}
              />
            </PageSection>
          ) : null}

          {project.stackDecisionContent ? (
            <PageSection id="why-this-stack" label="Why This Stack">
              <MarkdownSectionCard
                title="Why this stack"
                content={project.stackDecisionContent}
              />
            </PageSection>
          ) : null}

          {project.impactContent ? (
            <PageSection id="impact" label="Impact">
              <MarkdownSectionCard title="Impact" content={project.impactContent} />
            </PageSection>
          ) : null}
        </>
      ) : (
        <MarkdownSectionCard title="Project Details" content={project.content} />
      )}

      <PageSection id="tech-used" label="Tech Used">
        <TechUsedCard
          featuredTechStack={featuredTechStack}
          supportingTechStack={supportingTechStack}
          isDark={isDark}
          isMounted={isMounted}
        />
      </PageSection>

      {relatedProjects.length ? (
        <PageSection id="related-projects" label="Related Projects">
          <RelatedProjectsCard relatedProjects={relatedProjects} />
        </PageSection>
      ) : null}

      <FooterBackLink />
    </div>
  );
}

function HeroCard({
  project,
  orderedTechStack,
  isDark,
  isMounted,
}: {
  project: Project;
  orderedTechStack: TechItem[];
  isDark: boolean;
  isMounted: boolean;
}) {
  return (
    <SectionCard className="space-y-5">
      <div>
        <Link
          href="/developer#projects"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 dark:border-white/10 dark:text-white dark:hover:border-white dark:focus-visible:ring-white/30"
        >
          ← Back to Projects
        </Link>
      </div>

      <div className="space-y-4">
        <h1 className={type.pageTitle}>{project.name}</h1>
        <p className={type.bodyText}>{project.shortDescription}</p>

        <div className="flex flex-wrap items-center gap-2">
          {project.company ? <MetaChip>{project.company}</MetaChip> : null}
          {project.role ? <MetaChip>{project.role}</MetaChip> : null}
          {project.period ? <MetaChip>{project.period}</MetaChip> : null}
        </div>

        {project.quickFacts?.length ? (
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {project.quickFacts.map((fact) => (
              <div
                key={typeof fact === "string" ? fact : fact.label}
                className="rounded-2xl border border-black/10 bg-black/5 px-4 py-3 dark:border-white/10 dark:bg-white/5"
              >
                {typeof fact === "string" ? (
                  <p className={type.bodyText}>{fact}</p>
                ) : (
                  <>
                    <p className={type.metaText}>{fact.label}</p>
                    <p className={type.bodyText}>{fact.value}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : null}

        {project.links?.length ? (
          <div className="flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center rounded-full border border-black/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:border-black dark:border-white/10 dark:text-white dark:hover:border-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}

        {orderedTechStack.length ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {orderedTechStack.map((item) => (
              <TechIconChip
                key={item.name}
                item={item}
                isDark={isDark}
                isMounted={isMounted}
              />
            ))}
          </div>
        ) : null}
      </div>
    </SectionCard>
  );
}

function MediaBlock({
  layout,
  media,
  activeIndex,
  nextImage,
  prevImage,
  title,
  metrics,
}: {
  layout?: Project["mediaSectionLayout"];
  media: ProjectMedia[];
  activeIndex: number;
  nextImage: () => void;
  prevImage: () => void;
  title?: string;
  metrics?: string[];
}) {
  if (layout === "coverflow") {
    return (
      <FocusGallery
        items={media}
        title={title ?? "Interface snapshots"}
        metrics={metrics}
      />
    );
  }

  return (
    <div className="space-y-4">
      <h2 className={type.sectionTitle}>{title ?? "Interface snapshots"}</h2>

      {metrics?.length ? (
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric}
              className="rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm font-medium text-black/80 dark:border-white/10 dark:bg-white/5 dark:text-white/80"
            >
              {metric}
            </div>
          ))}
        </div>
      ) : null}

      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-black/5 shadow-[0_10px_40px_-30px_rgba(0,0,0,0.35)] dark:border-white/10 dark:bg-white/[0.04]">
        <div className="relative h-[320px] max-h-[420px] sm:h-[380px] lg:h-[520px] xl:h-[600px]">
          <Image
            src={media[activeIndex].src}
            alt={media[activeIndex].alt}
            fill
            className="h-full w-full object-contain p-4"
          />
          <div className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs text-white/90">
            {activeIndex + 1} / {media.length}
          </div>
          {media.length > 1 ? (
            <>
              <button
                type="button"
                onClick={prevImage}
                aria-label="Previous image"
                className="absolute left-3 bottom-3 rounded-full border border-black/15 bg-black/45 px-3 py-2 text-xs text-white transition hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                ←
              </button>
              <button
                type="button"
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-3 bottom-3 rounded-full border border-black/15 bg-black/45 px-3 py-2 text-xs text-white transition hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                →
              </button>
            </>
          ) : null}
        </div>
      </div>

      <p className={type.sectionIntro}>
        {media[activeIndex].caption ?? media[activeIndex].alt}
      </p>
    </div>
  );
}

function MarkdownSectionCard({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <SectionCard className="space-y-4">
      <h2 className={type.sectionTitle}>{title}</h2>
      <MarkdownBody content={content} />
    </SectionCard>
  );
}

function PageSection({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-page-section="true"
      data-page-section-label={label}
      className="scroll-mt-24"
    >
      {children}
    </section>
  );
}

function TechUsedCard({
  featuredTechStack,
  supportingTechStack,
  isDark,
  isMounted,
}: {
  featuredTechStack: TechItem[];
  supportingTechStack: TechItem[];
  isDark: boolean;
  isMounted: boolean;
}) {
  return (
    <SectionCard className="space-y-5">
      <div className="space-y-1">
        <h2 className={type.sectionTitle}>Tech Used</h2>
        <p className={type.sectionIntro}>
          Core tools and technologies used in this project.
        </p>
      </div>

      {featuredTechStack.length ? (
        <div className="space-y-3">
          <p className="text-sm font-medium text-black/80 dark:text-white/80 sm:text-base">
            Core technologies
          </p>
          <div className="flex flex-wrap gap-3">
            {featuredTechStack.map((item) => (
              <TechTile
                key={`core-${item.name}`}
                item={item}
                variant="featured"
                isDark={isDark}
                isMounted={isMounted}
              />
            ))}
          </div>
        </div>
      ) : null}

      {supportingTechStack.length ? (
        <div className="space-y-3">
          <p className="text-sm font-medium text-black/80 dark:text-white/80 sm:text-base">
            Supporting technologies
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {supportingTechStack.map((item) => (
              <TechTile
                key={`support-${item.name}`}
                item={item}
                isDark={isDark}
                isMounted={isMounted}
              />
            ))}
          </div>
        </div>
      ) : null}
    </SectionCard>
  );
}

function RelatedProjectsCard({
  relatedProjects,
}: {
  relatedProjects: Project[];
}) {
  if (!relatedProjects.length) return null;

  return (
    <SectionCard className="space-y-5">
      <div className="space-y-1">
        <h2 className={type.sectionTitle}>Related Projects</h2>
        <p className={type.sectionIntro}>
          Adjacent systems and runtime pieces that connect directly to this project.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {relatedProjects.map((related) => (
          <ProjectView key={related.id} project={related} />
        ))}
      </div>
    </SectionCard>
  );
}

function FooterBackLink() {
  return (
    <div>
      <Link
        href="/developer#projects"
        className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 dark:border-white/10 dark:text-white dark:hover:border-white dark:focus-visible:ring-white/30"
      >
        Back to Projects
      </Link>
    </div>
  );
}


function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      variant="surface"
      className={`rounded-2xl border-black/10 bg-white/70 p-5 shadow-[0_10px_40px_-30px_rgba(0,0,0,0.35)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] sm:p-6 ${className}`}
    >
      {children}
    </Card>
  );
}

function MetaChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs text-black/60 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
      {children}
    </span>
  );
}

function MarkdownBody({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h3: ({ ...props }) => <h3 className={type.markdownHeading} {...props} />,
        h4: ({ ...props }) => (
          <h4 className={type.markdownSubheading} {...props} />
        ),
        p: ({ ...props }) => (
          <p className={type.markdownParagraph} {...props} />
        ),
        li: ({ ...props }) => (
          <li className={type.markdownListItem} {...props} />
        ),
        ul: ({ ...props }) => (
          <ul
            className="mt-3 list-disc space-y-2 pl-5 sm:pl-6"
            {...props}
          />
        ),
        ol: ({ ...props }) => (
          <ol
            className="mt-3 list-decimal space-y-2 pl-5 sm:pl-6"
            {...props}
          />
        ),
        hr: () => (
          <div className="my-6 border-t border-black/10 dark:border-white/10" />
        ),
        strong: ({ ...props }) => (
          <strong className={type.bodyStrong} {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

type TechIconChipProps = {
  item: TechItem;
  isDark: boolean;
  isMounted: boolean;
};

function TechIconChip({ item, isDark, isMounted }: TechIconChipProps) {
  const resolved = resolveTechItemIcon(item);
  const fallback = item.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  const iconSrc =
    isMounted && isDark
      ? resolved.darkIconSrc ?? resolved.lightIconSrc ?? resolved.iconSrc
      : isMounted
        ? resolved.lightIconSrc ?? resolved.iconSrc
        : resolved.iconSrc;

  return (
    <span
      title={item.name}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5"
    >
      {iconSrc ? (
        <Image
          src={iconSrc}
          alt={item.name}
          width={18}
          height={18}
          className="h-5 w-5 object-contain"
        />
      ) : (
        <span className="text-[10px] font-semibold text-black/60 dark:text-white/60">
          {fallback}
        </span>
      )}
    </span>
  );
}

type TechTileProps = {
  item: TechItem;
  variant?: "compact" | "featured";
  isDark: boolean;
  isMounted: boolean;
};

function TechTile({
  item,
  variant = "compact",
  isDark,
  isMounted,
}: TechTileProps) {
  const resolved = resolveTechItemIcon(item);
  const isFeatured = variant === "featured";
  const fallback = item.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  const iconSrc =
    isMounted && isDark
      ? resolved.darkIconSrc ?? resolved.lightIconSrc ?? resolved.iconSrc
      : isMounted
        ? resolved.lightIconSrc ?? resolved.iconSrc
        : resolved.iconSrc;

  const layoutClasses = isFeatured
    ? "min-h-[84px] px-4 py-3"
    : "min-h-[76px] px-3 py-2";
  const iconWrapperClasses = isFeatured ? "h-10 w-10" : "h-9 w-9";

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-black/10 bg-black/5 ${layoutClasses} text-sm font-medium text-black dark:border-white/10 dark:bg-white/5 dark:text-white sm:text-[15px]`}
    >
      {iconSrc ? (
        <span
          className={`${iconWrapperClasses} inline-flex items-center justify-center rounded-xl border border-black/10 bg-white/70 dark:border-white/10 dark:bg-white/5`}
        >
          <Image
            src={iconSrc}
            alt={item.name}
            width={isFeatured ? 22 : 20}
            height={isFeatured ? 22 : 20}
            className="h-full w-full object-contain p-1"
          />
        </span>
      ) : (
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 bg-[color:var(--chip)] text-[11px] font-semibold text-black/60 dark:border-white/10 dark:text-white/60">
          {fallback}
        </span>
      )}
      <span className="text-center leading-snug text-black/80 dark:text-white/80">
        {item.name}
      </span>
    </div>
  );
}

function resolveTechItemIcon(item: TechItem) {
  if (item.iconSrc || item.lightIconSrc || item.darkIconSrc || item.iconSrcDark) {
    return {
      iconSrc: item.iconSrc,
      iconSrcDark: item.darkIconSrc ?? item.iconSrcDark,
      lightIconSrc: item.lightIconSrc ?? item.iconSrc,
      darkIconSrc: item.darkIconSrc ?? item.iconSrcDark,
    };
  }

  return resolveTechIcon(item.name);
}

function toSectionId(label: string) {
  return label.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function orderTechStack(items: TechItem[]) {
  const withIcons: TechItem[] = [];
  const withoutIcons: TechItem[] = [];

  items.forEach((item) => {
    const resolved = resolveTechItemIcon(item);
    if (
      resolved.iconSrc ||
      resolved.iconSrcDark ||
      resolved.lightIconSrc ||
      resolved.darkIconSrc
    ) {
      withIcons.push(item);
    } else {
      withoutIcons.push(item);
    }
  });

  return [...withIcons, ...withoutIcons];
}
