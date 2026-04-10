import type { Project } from "../types";
import {
  gameEngineDotnetProject,
  kioskHostDotnetProject,
  kioskUiNextjsProject,
  scorecardNextjsProject,
} from "./items";

export const frontendRuntimeProjects: Project[] = [
  kioskUiNextjsProject,
  kioskHostDotnetProject,
  scorecardNextjsProject,
  gameEngineDotnetProject,
];
