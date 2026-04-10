import type { Project } from "../types";
import {
  gameControllersSensorNetworkProject,
  roomDevicesAccessControlProject,
} from "./items";

export const hardwareSystemsProjects: Project[] = [
  roomDevicesAccessControlProject,
  gameControllersSensorNetworkProject,
];
