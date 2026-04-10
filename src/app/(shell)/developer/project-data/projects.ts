import type { Project } from "./types";
import { frontendRuntimeProjects } from "./projects/frontend-runtime";
import { hardwareSystemsProjects } from "./projects/hardware-systems";
import { operationsClientProjects } from "./projects/operations-clients";
import { platformCoreProjects } from "./projects/platform-core";

export const developerProjects: Project[] = [
  ...frontendRuntimeProjects,
  ...hardwareSystemsProjects,
  ...operationsClientProjects,
  ...platformCoreProjects,
];
