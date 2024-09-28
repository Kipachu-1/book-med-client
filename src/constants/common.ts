import { TRole } from "@/types";

export const ROLES: {
  [key in TRole]: string;
} = {
  patient: "patient",
  doctor: "doctor",
  admin: "admin",
} as const;
