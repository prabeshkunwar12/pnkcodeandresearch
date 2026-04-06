"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
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
  const mobileSectionSurface =
    "w-full max-w-none bg-[linear-gradient(180deg,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.18)_100%)] px-3 py-5 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.015)_100%)] sm:bg-none sm:px-0 sm:py-0 dark:sm:bg-none";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme } = useThemeContext();
  const isDark = resolvedTheme === "dark";
  const isAdminPortal = project.id === "admin-portal";

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
    <div className="mx-auto w-full max-w-none space-y-0 px-0 py-0 sm:space-y-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
      <div className={mobileSectionSurface}>
        <HeroCard
          project={project}
          isDark={isDark}
          isMounted={isMounted}
        />
      </div>

      {hasMedia ? (
        <div className={mobileSectionSurface}>
          <MediaBlock
            layout={project.mediaSectionLayout}
            media={media}
            activeIndex={activeIndex}
            nextImage={nextImage}
            prevImage={prevImage}
            metrics={project.mediaSectionMetrics}
          />
        </div>
      ) : null}

      {hasStructuredLayout ? (
        <>
          {project.overviewContent ? (
            <PageSection id="overview" label="Overview">
              {isAdminPortal ? (
                <AdminOverviewCard content={project.overviewContent} />
              ) : (
                <MarkdownSectionCard
                  sectionTitle="Overview"
                  content={project.overviewContent}
                />
              )}
            </PageSection>
          ) : null}

          {(project.architecture ?? project.architectureMap) || project.architectureNotes ? (
            <PageSection id="architecture" label="Architecture">
              <SectionCard className="space-y-6">
                {project.architecture ?? project.architectureMap ? (
                  <ArchitectureMap
                    architecture={(project.architecture ?? project.architectureMap)!}
                    showHeader={false}
                    mobileScrollableMapOnly={isAdminPortal}
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
                sectionTitle="Customer Flow"
                content={project.customerFlowContent}
              />
            </PageSection>
          ) : null}

          {project.architectureNotesContent ? (
            <PageSection id="architecture-notes" label="Architecture Notes">
              <MarkdownSectionCard
                sectionTitle="Architecture Notes"
                content={project.architectureNotesContent}
              />
            </PageSection>
          ) : null}

          {project.modulesContent ? (
            <PageSection id="core-modules" label="Core Modules">
              {isAdminPortal ? (
                <AdminPortalModulesSection content={project.modulesContent} />
              ) : (
                <MarkdownSectionCard
                  sectionTitle="Core Modules"
                  content={project.modulesContent}
                />
              )}
            </PageSection>
          ) : null}

          {project.middlewareContent ? (
            <PageSection id="request-flow-middleware" label="Request Flow & Middleware">
              <MarkdownSectionCard
                sectionTitle="Request Flow & Middleware"
                content={project.middlewareContent}
              />
            </PageSection>
          ) : null}

          {project.workflowContent ? (
            <PageSection
              id={toSectionId(project.workflowTitle ?? "Workflow")}
              label={project.workflowTitle ?? "Workflow"}
            >
              {isAdminPortal ? (
                <AdminPortalWorkflowSection
                  sectionTitle={project.workflowTitle ?? "Workflow"}
                  content={project.workflowContent}
                />
              ) : (
                <MarkdownSectionCard
                  sectionTitle={project.workflowTitle ?? "Workflow"}
                  content={project.workflowContent}
                />
              )}
            </PageSection>
          ) : null}

          {project.playerFlowContent ? (
            <PageSection id="player-registration-flow" label="Player Registration Flow">
              <MarkdownSectionCard
                sectionTitle="Player Registration Flow"
                content={project.playerFlowContent}
              />
            </PageSection>
          ) : null}

          {project.logicStructureContent ? (
            <PageSection id="game-logic-structure" label="Game Logic Structure">
              <MarkdownSectionCard
                sectionTitle="Game Logic Structure"
                content={project.logicStructureContent}
              />
            </PageSection>
          ) : null}

          {project.screenTypesContent ? (
            <PageSection id="screen-types" label="Screen Types">
              <MarkdownSectionCard
                sectionTitle="Screen Types"
                content={project.screenTypesContent}
              />
            </PageSection>
          ) : null}

          {project.devicesContent ? (
            <PageSection id="common-room-devices" label="Common Room Devices">
              <MarkdownSectionCard
                sectionTitle="Common Room Devices"
                content={project.devicesContent}
              />
            </PageSection>
          ) : null}

          {project.softwareFlowContent ? (
            <PageSection id="software-flow" label="Software Flow">
              <MarkdownSectionCard
                sectionTitle="Software Flow"
                content={project.softwareFlowContent}
              />
            </PageSection>
          ) : null}

          {project.controllerTypesContent ? (
            <PageSection id="controller-types" label="Controller Types">
              <MarkdownSectionCard
                sectionTitle="Controller Types"
                content={project.controllerTypesContent}
              />
            </PageSection>
          ) : null}

          {project.deviceFlowContent ? (
            <PageSection id="device-flow" label="Device Flow">
              <MarkdownSectionCard
                sectionTitle="Device Flow"
                content={project.deviceFlowContent}
              />
            </PageSection>
          ) : null}

          {project.corePagesContent ? (
            <PageSection id="core-pages" label="Core Pages">
              <MarkdownSectionCard
                sectionTitle="Core Pages"
                content={project.corePagesContent}
              />
            </PageSection>
          ) : null}

          {project.responsibilitiesContent ? (
            <PageSection id="core-responsibilities" label="Core Responsibilities">
              <MarkdownSectionCard
                sectionTitle="Core Responsibilities"
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
                sectionTitle="Admin Panel & Hardware Control"
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
              {isAdminPortal ? (
                <AdminPortalExpandableSection
                  sectionTitle={project.evolutionTitle ?? "Interface Evolution"}
                  content={project.evolutionContent}
                />
              ) : (
                <MarkdownSectionCard
                  sectionTitle={project.evolutionTitle ?? "Interface Evolution"}
                  content={project.evolutionContent}
                />
              )}
            </PageSection>
          ) : null}

          {project.challengesContent ? (
            <PageSection id="challenges" label="Challenges">
              {isAdminPortal ? (
                <AdminPortalExpandableSection
                  sectionTitle="Challenges"
                  content={project.challengesContent}
                />
              ) : (
                <MarkdownSectionCard
                  sectionTitle="Challenges"
                  content={project.challengesContent}
                />
              )}
            </PageSection>
          ) : null}

          {project.reliabilityContent ? (
            <PageSection
              id="reliability-operations"
              label="Reliability & Operations"
            >
              <MarkdownSectionCard
                sectionTitle="Reliability & Operations"
                content={project.reliabilityContent}
              />
            </PageSection>
          ) : null}

          {project.contributionContent ? (
            <PageSection id="my-contribution" label="My Contribution">
              {isAdminPortal ? (
                <Card
                  variant="surface"
                  className="rounded-none border-transparent bg-transparent p-0 shadow-none backdrop-blur-0 lg:rounded-2xl lg:border-black/10 lg:bg-white/75 lg:p-6 lg:shadow-[0_14px_48px_-32px_rgba(0,0,0,0.35)] lg:backdrop-blur-sm dark:lg:border-white/10 dark:lg:bg-white/[0.05]"
                >
                  <MarkdownBody
                    content={stripDuplicateLeadingHeading(
                      project.contributionContent,
                      "My Contribution",
                    )}
                  />
                </Card>
              ) : (
                <MarkdownSectionCard
                  sectionTitle="My Contribution"
                  content={project.contributionContent}
                />
              )}
            </PageSection>
          ) : null}

          {project.stackDecisionContent ? (
            <PageSection id="why-this-stack" label="Why This Stack">
              <MarkdownSectionCard
                sectionTitle="Why This Stack"
                content={project.stackDecisionContent}
              />
            </PageSection>
          ) : null}

          {project.impactContent ? (
            <PageSection id="impact" label="Impact">
              <MarkdownSectionCard
                sectionTitle="Impact"
                content={project.impactContent}
              />
            </PageSection>
          ) : null}
        </>
      ) : (
        <PageSection id="project-details" label="Project Details">
          <MarkdownSectionCard
            sectionTitle="Project Details"
            content={project.content}
          />
        </PageSection>
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
          <RelatedProjectsCard
            relatedProjects={relatedProjects}
            mobileHorizontal={isAdminPortal}
          />
        </PageSection>
      ) : null}

      <div className="px-3 py-5 sm:px-0 sm:py-0">
        <FooterBackLink />
      </div>
    </div>
  );
}

function HeroCard({
  project,
  isDark,
  isMounted,
}: {
  project: Project;
  isDark: boolean;
  isMounted: boolean;
}) {
  const groupedStack = getGroupedHeroStack(project.id);

  return (
    <SectionCard className="space-y-5 lg:space-y-0 lg:py-7">
      <div className="space-y-5 lg:hidden">
        <div className="space-y-4">
          <h1 className={type.pageTitle}>{project.name}</h1>
          <p className={type.bodyText}>{project.shortDescription}</p>
        </div>

        {groupedStack.length ? (
          <GroupedTechStackOverviewMobile
            groups={groupedStack}
            isDark={isDark}
            isMounted={isMounted}
          />
        ) : null}
      </div>

      <div className="hidden lg:grid lg:grid-cols-[minmax(0,1.15fr)_1px_minmax(320px,0.85fr)] lg:items-start lg:gap-8 xl:gap-10">
        <div className="space-y-4">
          <h1 className={type.pageTitle}>{project.name}</h1>
          <p className={type.bodyText}>{project.shortDescription}</p>
        </div>

        <div className="h-full min-h-[220px] bg-black/10 dark:bg-white/10" />

        {groupedStack.length ? (
          <GroupedTechStackOverviewDesktop groups={groupedStack} />
        ) : (
          <div />
        )}
      </div>
    </SectionCard>
  );
}

function GroupedTechStackOverviewMobile({
  groups,
  isDark,
  isMounted,
}: {
  groups: HeroStackGroup[];
  isDark: boolean;
  isMounted: boolean;
}) {
  return (
    <div className="space-y-4 pt-1">
      <div className="space-y-1">
        <h2 className={type.sectionTitle}>Tech Stack Overview</h2>
        <p className={type.sectionIntro}>
          Grouped by the primary systems, languages, and infrastructure used in
          this build.
        </p>
      </div>

      <div className="-mx-3 overflow-x-auto px-3 pb-1 sm:mx-0 sm:overflow-visible sm:px-0">
        <div className="flex w-max gap-3 pr-3">
          {groups.map((group) => (
            <HeroStackGroupCard
              key={group.label}
              group={group}
              isDark={isDark}
              isMounted={isMounted}
              mobile
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function GroupedTechStackOverviewDesktop({
  groups,
}: {
  groups: HeroStackGroup[];
}) {
  return (
    <div className="space-y-4 self-stretch">
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 dark:text-white/45">
          Tech Stack Overview
        </p>
        <p className="text-sm leading-6 text-black/68 dark:text-white/68">
          Grouped by the systems, languages, and supporting layers used in this
          project.
        </p>
      </div>

      <dl className="space-y-3.5">
        {groups.map((group) => (
          <div
            key={group.label}
            className="grid grid-cols-[128px_minmax(0,1fr)] gap-4 border-b border-black/8 pb-3 last:border-b-0 last:pb-0 dark:border-white/8"
          >
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-black/52 dark:text-white/52">
              {group.label}
            </dt>
            <dd className="space-y-1">
              <div className="text-sm font-medium leading-6 text-black dark:text-white">
                {group.label === "Supporting Systems" ? (
                  <SupportingSystemsInline items={group.items} />
                ) : (
                  group.items.join(", ")
                )}
              </div>
              {group.usage ? (
                <p className="text-sm leading-6 text-black/68 dark:text-white/68">
                  {group.usage}
                </p>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function MediaBlock({
  layout,
  media,
  activeIndex,
  nextImage,
  prevImage,
  metrics,
}: {
  layout?: Project["mediaSectionLayout"];
  media: ProjectMedia[];
  activeIndex: number;
  nextImage: () => void;
  prevImage: () => void;
  metrics?: string[];
}) {
  if (layout === "coverflow") {
    return <FocusGallery items={media} metrics={metrics} />;
  }

  return (
    <div className="space-y-4">
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

      <div className="-mx-3 overflow-x-auto px-3 pb-1 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-3 pr-3 sm:grid sm:w-auto sm:grid-cols-1 sm:pr-0">
          <div className="w-[86vw] max-w-[640px] overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.04] sm:w-auto">
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
            <div className="px-4 py-3 sm:px-5 sm:py-4">
              <p className={type.sectionIntro}>
                {media[activeIndex].caption ?? media[activeIndex].alt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarkdownSectionCard({
  sectionTitle,
  content,
}: {
  sectionTitle?: string;
  content: string;
}) {
  const normalizedContent = stripDuplicateLeadingHeading(content, sectionTitle);

  return (
    <SectionCard className="space-y-4">
      <MarkdownBody content={normalizedContent} />
    </SectionCard>
  );
}

type MarkdownSubsection = {
  title: string;
  body: string;
};

function AdminOverviewCard({ content }: { content: string }) {
  const normalizedContent = stripDuplicateLeadingHeading(content, "Overview");

  return (
    <Card
      variant="surface"
      className="w-full rounded-none border-transparent bg-transparent p-0 shadow-none backdrop-blur-0 lg:rounded-2xl lg:border-black/10 lg:bg-white/75 lg:p-6 lg:shadow-[0_14px_48px_-32px_rgba(0,0,0,0.35)] lg:backdrop-blur-sm dark:lg:border-white/10 dark:lg:bg-white/[0.05]"
    >
      <MarkdownBody content={normalizedContent} />
    </Card>
  );
}

function AdminPortalModulesSection({ content }: { content: string }) {
  const { intro, items } = useMemo(
    () => parseMarkdownSubsections(content, "Core Modules"),
    [content],
  );

  return (
    <div className="space-y-4">
      {intro ? (
        <div className="lg:hidden">
          <MarkdownBody content={intro} />
        </div>
      ) : null}

      <div className="-mx-3 overflow-x-auto px-3 pb-1 lg:mx-0 lg:overflow-visible lg:px-0">
        <div className="flex w-max gap-4 pr-3 lg:grid lg:w-full lg:grid-cols-2 lg:pr-0 xl:grid-cols-3">
          {items.map((item) => (
            <Card
              key={item.title}
              variant="surface"
              className="w-[84vw] max-w-[360px] shrink-0 rounded-2xl border-black/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.72)_100%)] p-5 shadow-[0_12px_36px_-28px_rgba(0,0,0,0.28)] dark:border-white/10 dark:bg-[linear-gradient(160deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.03)_100%)] sm:w-[420px] lg:w-auto lg:max-w-none lg:border-black/10 lg:bg-white/75 lg:p-6 lg:shadow-[0_14px_48px_-32px_rgba(0,0,0,0.35)] lg:backdrop-blur-sm dark:lg:border-white/10 dark:lg:bg-white/[0.05]"
            >
              <div className="space-y-3">
                <h3 className={type.markdownHeading}>{item.title}</h3>
                <MarkdownBody content={item.body} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminPortalWorkflowSection({
  sectionTitle,
  content,
}: {
  sectionTitle: string;
  content: string;
}) {
  const { intro, items } = useMemo(
    () => parseMarkdownSubsections(content, sectionTitle),
    [content, sectionTitle],
  );

  return (
    <div className="space-y-4">
      {intro ? (
        <div>
          <MarkdownBody content={intro} />
        </div>
      ) : null}

      <div className="-mx-3 overflow-x-auto px-3 pb-1 lg:mx-0 lg:px-0">
        <div className="flex w-max gap-4 pr-3 lg:pr-0">
          {items.map((item, index) => (
            <Card
              key={item.title}
              variant="surface"
              className="w-[84vw] max-w-[340px] shrink-0 rounded-2xl border-black/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.72)_100%)] p-5 shadow-[0_12px_36px_-28px_rgba(0,0,0,0.28)] dark:border-white/10 dark:bg-[linear-gradient(160deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.03)_100%)] sm:w-[360px] lg:w-[calc((100vw-11rem)/3)] lg:max-w-[360px] lg:border-black/10 lg:bg-white/75 lg:p-6 lg:shadow-[0_14px_48px_-32px_rgba(0,0,0,0.35)] lg:backdrop-blur-sm dark:lg:border-white/10 dark:lg:bg-white/[0.05]"
            >
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/45 dark:text-white/45">
                  Step {index + 1}
                </p>
                <h3 className={type.markdownHeading}>{item.title}</h3>
                <MarkdownBody content={item.body} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminPortalExpandableSection({
  sectionTitle,
  content,
}: {
  sectionTitle: string;
  content: string;
}) {
  const { intro, items } = useMemo(
    () => parseMarkdownSubsections(content, sectionTitle),
    [content, sectionTitle],
  );
  const [activeDesktopItem, setActiveDesktopItem] = useState<string | null>(items[0]?.title ?? null);
  const [activeMobileItem, setActiveMobileItem] = useState<string | null>(null);

  const activeMobile = items.find((item) => item.title === activeMobileItem) ?? null;

  useEffect(() => {
    setActiveDesktopItem(items[0]?.title ?? null);
  }, [content]);

  useEffect(() => {
    if (!activeMobileItem) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [activeMobileItem]);

  return (
    <div className="space-y-4">
      {intro ? (
        <div>
          <MarkdownBody content={intro} />
        </div>
      ) : null}

      <div className="space-y-3 md:hidden">
        {items.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveMobileItem(item.title)}
            className="w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-4 text-left dark:border-white/10 dark:bg-white/[0.05]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-black dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-black/70 dark:text-white/72">
                  {getMarkdownSummary(item.body)}
                </p>
              </div>
              <span className="pt-1 text-lg text-black/45 dark:text-white/45" aria-hidden="true">
                →
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-[28px] border border-black/10 bg-white/75 shadow-[0_14px_48px_-32px_rgba(0,0,0,0.35)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.05] md:block">
        {items.map((item, index) => {
          const isActive = activeDesktopItem === item.title;
          return (
            <div
              key={item.title}
              className={index !== items.length - 1 ? "border-b border-black/10 dark:border-white/10" : ""}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => setActiveDesktopItem(isActive ? null : item.title)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveDesktopItem(isActive ? null : item.title);
                  }
                }}
                className={`grid w-full cursor-pointer gap-4 px-5 py-4 text-left transition hover:bg-black/[0.025] dark:hover:bg-white/[0.03] lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:px-6 ${
                  isActive ? "bg-black/[0.03] dark:bg-white/[0.04]" : ""
                }`}
              >
                <div className="space-y-2">
                  <h3 className="text-[1.02rem] font-semibold text-black dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-6 text-black/70 dark:text-white/72">
                    {getMarkdownSummary(item.body)}
                  </p>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isActive ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {isActive ? (
                    <div className="space-y-4 pt-1 lg:pl-4">
                      <MarkdownBody content={item.body} />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activeMobile
        ? createPortal(
            <div className="fixed inset-0 z-[90] md:hidden" role="dialog" aria-modal="true">
              <button
                type="button"
                className="absolute inset-0 bg-black/55"
                aria-label="Close details dialog"
                onClick={() => setActiveMobileItem(null)}
              />
              <div className="fixed inset-0 z-[91] flex items-center justify-center p-4">
                <div className="max-h-[85vh] w-full max-w-lg overflow-hidden rounded-[28px] border border-black/10 bg-[color:var(--surface)] shadow-2xl dark:border-white/10">
                  <div className="flex items-start justify-between gap-4 border-b border-black/10 px-5 py-4 dark:border-white/10">
                    <h3 className="text-xl font-semibold text-black dark:text-white">
                      {activeMobile.title}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveMobileItem(null)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[color:var(--surface-strong)] text-lg text-black dark:border-white/10 dark:text-white"
                      aria-label="Close details dialog"
                    >
                      ×
                    </button>
                  </div>
                  <div className="max-h-[calc(85vh-88px)] overflow-y-auto px-5 py-5">
                    <MarkdownBody content={activeMobile.body} />
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
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
      className="w-full max-w-none scroll-mt-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.18)_100%)] px-3 py-5 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.015)_100%)] sm:bg-none sm:px-0 sm:py-0 dark:sm:bg-none lg:border-t lg:border-black/8 lg:pt-10 dark:lg:border-white/8"
    >
      <div className="space-y-4 lg:space-y-5">
        <h2 className={type.sectionTitle}>{label}</h2>
        {children}
      </div>
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
      <p className={type.sectionIntro}>
        Core tools and technologies used in this project.
      </p>

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
  mobileHorizontal = false,
}: {
  relatedProjects: Project[];
  mobileHorizontal?: boolean;
}) {
  if (!relatedProjects.length) return null;

  return (
    <SectionCard className="space-y-5">
      <p className={type.sectionIntro}>
        Adjacent systems and runtime pieces that connect directly to this project.
      </p>

      <div
        className={
          mobileHorizontal
            ? "-mx-3 overflow-x-auto px-3 pb-1 sm:mx-0 sm:px-0"
            : ""
        }
      >
        <div
          className={
            mobileHorizontal
              ? "flex w-max gap-4 pr-3 sm:grid sm:w-full sm:grid-cols-2 sm:pr-0"
              : "grid gap-4 md:grid-cols-2"
          }
        >
          {relatedProjects.map((related) => (
            <div
              key={related.id}
              className={mobileHorizontal ? "w-[84vw] max-w-[360px] shrink-0 sm:w-auto sm:max-w-none" : ""}
            >
              <ProjectView project={related} />
            </div>
          ))}
        </div>
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
      className={`rounded-none border-transparent bg-transparent p-0 shadow-none backdrop-blur-0 sm:rounded-2xl sm:border-black/10 sm:bg-white/70 sm:p-6 sm:shadow-[0_10px_40px_-30px_rgba(0,0,0,0.35)] sm:backdrop-blur-sm dark:sm:border-white/10 dark:sm:bg-white/[0.04] lg:rounded-none lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-0 dark:lg:border-transparent dark:lg:bg-transparent ${className}`}
    >
      {children}
    </Card>
  );
}

function stripDuplicateLeadingHeading(content: string, sectionTitle?: string) {
  if (!sectionTitle) return content;

  const lines = content.replace(/\r\n/g, "\n").split("\n");
  let index = 0;

  while (index < lines.length && !lines[index].trim()) index += 1;
  const firstLine = lines[index]?.trim() ?? "";

  if (!firstLine.startsWith("### ")) return content;

  const heading = normalizeSectionLabel(firstLine.replace(/^###\s+/, ""));
  const outer = normalizeSectionLabel(sectionTitle);

  if (heading !== outer && canonicalSectionLabel(heading) !== canonicalSectionLabel(outer)) {
    return content;
  }

  index += 1;
  while (index < lines.length && !lines[index].trim()) index += 1;
  return lines.slice(index).join("\n");
}

function parseMarkdownSubsections(
  content: string,
  sectionTitle?: string,
): { intro: string; items: MarkdownSubsection[] } {
  const normalizedContent = stripDuplicateLeadingHeading(content, sectionTitle).trim();
  const lines = normalizedContent.replace(/\r\n/g, "\n").split("\n");
  const items: MarkdownSubsection[] = [];
  const introLines: string[] = [];
  let currentTitle: string | null = null;
  let currentLines: string[] = [];

  const pushCurrent = () => {
    if (!currentTitle) return;
    items.push({ title: currentTitle, body: cleanSubsectionBody(currentLines.join("\n")) });
    currentTitle = null;
    currentLines = [];
  };

  for (const line of lines) {
    const match = line.match(/^####\s+(.+)$/);
    if (match) {
      pushCurrent();
      currentTitle = match[1].trim();
      continue;
    }

    if (currentTitle) {
      currentLines.push(line);
    } else {
      introLines.push(line);
    }
  }

  pushCurrent();

  return {
    intro: introLines.join("\n").trim(),
    items,
  };
}

function normalizeSectionLabel(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function canonicalSectionLabel(value: string) {
  return value.replace(/\binterface\b/g, "").replace(/\s+/g, " ").trim();
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

function getMarkdownSummary(content: string) {
  const cleaned = content
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("-") && !line.startsWith("1."))
    .join(" ")
    .replace(/[*_`#>-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned.length > 150 ? `${cleaned.slice(0, 147).trimEnd()}...` : cleaned;
}

function cleanSubsectionBody(content: string) {
  return content
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((line) => !line.trim().match(/^---+$/))
    .join("\n")
    .trim();
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

type HeroStackGroup = {
  label:
    | "Frameworks"
    | "Libraries"
    | "Languages"
    | "Infrastructure"
    | "Hardware"
    | "Supporting Systems";
  items: string[];
  usage?: string;
  ambientIcon?: string;
};

function HeroStackGroupCard({
  group,
  isDark,
  isMounted,
  mobile = false,
}: {
  group: HeroStackGroup;
  isDark: boolean;
  isMounted: boolean;
  mobile?: boolean;
}) {
  const resolved = resolveTechIcon(group.ambientIcon ?? group.items[0] ?? "");
  const fallback = group.label
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
    <div
      className={`relative shrink-0 overflow-hidden rounded-2xl border border-black/10 px-4 py-4 dark:border-white/10 ${
        mobile
          ? "w-[220px] bg-black/[0.035] text-center dark:bg-white/[0.035]"
          : "w-[220px] bg-black/5 dark:bg-white/5"
      }`}
    >
      {!mobile ? (
        <div className="pointer-events-none absolute inset-0 z-0">
          {iconSrc ? (
            <Image
              src={iconSrc}
              alt={group.label}
              fill
              sizes="220px"
              className="scale-[1.45] object-contain object-right opacity-[0.12] blur-[0.3px] dark:opacity-[0.1]"
            />
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.72)_52%,rgba(255,255,255,0.6)_100%)] dark:bg-[linear-gradient(120deg,rgba(8,14,28,0.92)_0%,rgba(8,14,28,0.82)_52%,rgba(8,14,28,0.74)_100%)]" />
        </div>
      ) : null}

      <div className={`relative z-10 space-y-2 ${mobile ? "items-center" : ""}`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50 dark:text-white/50 sm:text-xs">
          {group.label}
        </p>
        <p className="text-sm font-semibold leading-6 text-black dark:text-white sm:text-[15px]">
          {group.items.join(", ")}
        </p>
        {!mobile && group.usage ? (
          <p className="hidden text-sm leading-6 text-black/70 dark:text-white/70 sm:block">
            {group.usage}
          </p>
        ) : null}
        {!iconSrc && !mobile ? (
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-black/10 bg-white/70 text-[10px] font-semibold text-black/60 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
            {fallback}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function SupportingSystemsInline({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item, index) => {
        const href = supportingSystemHrefMap[item];
        return (
          <span key={item}>
            {index > 0 ? ", " : ""}
            {href ? (
              <Link
                href={href}
                className="underline decoration-black/20 underline-offset-4 transition hover:decoration-black/50 dark:decoration-white/20 dark:hover:decoration-white/50"
              >
                {item}
              </Link>
            ) : (
              item
            )}
          </span>
        );
      })}
    </>
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

const heroStackGroupsByProjectId: Partial<Record<Project["id"], HeroStackGroup[]>> = {
  "admin-portal": [
    {
      label: "Frameworks",
      items: ["Next.js"],
      ambientIcon: "Next.js",
    },
    {
      label: "Libraries",
      items: ["React", "Tailwind", "shadcn/ui", "Radix UI", "Chart.js"],
      ambientIcon: "React",
    },
    {
      label: "Languages",
      items: ["TypeScript", "JavaScript"],
      ambientIcon: "TypeScript",
    },
    {
      label: "Supporting Systems",
      items: ["Backend"],
      usage: "Connects to backend services for administration, analytics, and room operations.",
      ambientIcon: "Node.js",
    },
  ],
  "kiosk-host-dotnet": [
    {
      label: "Frameworks",
      items: [".NET 8", "WinForms"],
      ambientIcon: ".NET",
    },
    {
      label: "Libraries",
      items: ["WebView2", "System.IO.Ports", "log4net"],
      ambientIcon: "Visual Studio",
    },
    {
      label: "Languages",
      items: ["C#", "PowerShell"],
      ambientIcon: "C#",
    },
    {
      label: "Infrastructure",
      items: ["Sockets"],
      usage: "Coordinates runtime state and data exchange across the room stack.",
      ambientIcon: "Node.js",
    },
    {
      label: "Supporting Systems",
      items: ["Kiosk UI", "Backend", "Room Devices", "Controllers"],
      usage: "Orchestrates the surrounding AeroSports applications and device endpoints.",
      ambientIcon: ".NET",
    },
  ],
  "game-engine-dotnet": [
    {
      label: "Frameworks",
      items: [".NET Framework 4.7.2"],
      ambientIcon: ".NET",
    },
    {
      label: "Libraries",
      items: ["NAudio", "log4net", "System.Net.Http"],
      ambientIcon: ".NET",
    },
    {
      label: "Languages",
      items: ["C#"],
      ambientIcon: "C#",
    },
    {
      label: "Hardware",
      items: ["Game light sensors", "Controllers"],
      usage: "Connects game logic to room-level sensors, targets, and control devices.",
      ambientIcon: "Arduino",
    },
    {
      label: "Supporting Systems",
      items: ["Kiosk Host", "Game Controllers & Sensor Network"],
      ambientIcon: ".NET",
    },
  ],
  "backend-api-express": [
    {
      label: "Frameworks",
      items: ["Express.js"],
      ambientIcon: "Express",
    },
    {
      label: "Libraries",
      items: ["Sequelize", "bcrypt", "cors", "ws", "tplink-smarthome-api"],
      ambientIcon: "Node.js",
    },
    {
      label: "Languages",
      items: ["JavaScript"],
      ambientIcon: "JavaScript",
    },
    {
      label: "Infrastructure",
      items: ["MSSQL"],
      usage: "Acts as the structured data layer and API backbone for connected applications.",
      ambientIcon: "Microsoft SQL Server",
    },
    {
      label: "Supporting Systems",
      items: ["Admin Portal"],
      ambientIcon: "Next.js",
    },
  ],
  "game-controllers-sensor-network": [
    {
      label: "Frameworks",
      items: ["Arduino"],
      ambientIcon: "Arduino",
    },
    {
      label: "Languages",
      items: ["C++"],
      ambientIcon: "C++",
    },
    {
      label: "Infrastructure",
      items: ["HTTP Socket", "COM Socket", "Ethernet"],
      ambientIcon: "Node.js",
    },
    {
      label: "Hardware",
      items: ["ESP chips", "USR-N510", "USR-N540", "Game sensors", "Targets"],
      usage: "Handles sensor input, controller traffic, and target-level room communication.",
      ambientIcon: "Arduino",
    },
  ],
  "kiosk-ui-nextjs": [
    {
      label: "Frameworks",
      items: ["Next.js"],
      ambientIcon: "Next.js",
    },
    {
      label: "Libraries",
      items: ["React"],
      ambientIcon: "React",
    },
    {
      label: "Languages",
      items: ["JavaScript", "CSS"],
      ambientIcon: "JavaScript",
    },
    {
      label: "Supporting Systems",
      items: ["Backend", "Kiosk Host"],
      usage: "Provides the room-facing UI layer on top of the host and backend systems.",
      ambientIcon: "Next.js",
    },
  ],
  "pos-wpf": [
    {
      label: "Frameworks",
      items: [".NET 9", "WPF"],
      ambientIcon: ".NET",
    },
    {
      label: "Languages",
      items: ["C#", "XAML"],
      ambientIcon: "C#",
    },
    {
      label: "Hardware",
      items: ["Handscanner"],
      ambientIcon: "Arduino",
    },
    {
      label: "Supporting Systems",
      items: ["Backend"],
      ambientIcon: "Node.js",
    },
  ],
  "scorecard-nextjs": [
    {
      label: "Frameworks",
      items: ["Next.js"],
      ambientIcon: "Next.js",
    },
    {
      label: "Libraries",
      items: ["React"],
      ambientIcon: "React",
    },
    {
      label: "Languages",
      items: ["JavaScript", "CSS"],
      ambientIcon: "JavaScript",
    },
    {
      label: "Supporting Systems",
      items: ["Backend", "Kiosk Host"],
      ambientIcon: "Next.js",
    },
  ],
  "registration-tablet": [
    {
      label: "Frameworks",
      items: [".NET 9 Android", "MAUI", "Next.js"],
      ambientIcon: "MAUI",
    },
    {
      label: "Libraries",
      items: ["MAUI", "React", "WebView"],
      ambientIcon: "React",
    },
    {
      label: "Languages",
      items: ["C#", "JavaScript", "CSS"],
      ambientIcon: "C#",
    },
    {
      label: "Hardware",
      items: ["Android tablet", "NFC"],
      ambientIcon: "Android",
    },
    {
      label: "Supporting Systems",
      items: ["Backend"],
      ambientIcon: "Node.js",
    },
  ],
  "room-devices-access-control": [
    {
      label: "Frameworks",
      items: [".NET 8 Shared Library", "Arduino"],
      ambientIcon: ".NET",
    },
    {
      label: "Languages",
      items: ["C++", "C#", "PowerShell"],
      ambientIcon: "C#",
    },
    {
      label: "Hardware",
      items: [
        "2 monitors with HDMI splitter",
        "Sound system",
        "Handscanner",
        "Restart button",
        "NO/NC doorlock",
        "SRD chip",
      ],
      usage: "Provides room-level power, display, access, and peripheral device control.",
      ambientIcon: "Arduino",
    },
  ],
  "axe-wrapper-maui": [
    {
      label: "Frameworks",
      items: [".NET 9 Android"],
      ambientIcon: ".NET",
    },
    {
      label: "Libraries",
      items: ["MAUI"],
      ambientIcon: "MAUI",
    },
    {
      label: "Languages",
      items: ["C#"],
      ambientIcon: "C#",
    },
    {
      label: "Hardware",
      items: ["Android tablet with NFC", "Axe setup"],
      ambientIcon: "Android",
    },
    {
      label: "Supporting Systems",
      items: ["Axe throwing setup", "Remote access app", "Backend"],
      ambientIcon: "Node.js",
    },
  ],
};

const supportingSystemHrefMap: Record<string, string> = {
  Backend: "/developer/projects/backend-api-express",
  "Kiosk Host": "/developer/projects/kiosk-host-dotnet",
  "Kiosk UI": "/developer/projects/kiosk-ui-nextjs",
  "Admin Portal": "/developer/projects/admin-portal",
  "Room Devices": "/developer/projects/room-devices-access-control",
  Controllers: "/developer/projects/game-controllers-sensor-network",
  "Game Controllers & Sensor Network": "/developer/projects/game-controllers-sensor-network",
};

function getGroupedHeroStack(projectId: Project["id"]) {
  return heroStackGroupsByProjectId[projectId] ?? [];
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
