import { Data } from "../database";

export type ProcessedCheckActiveStatus =
  | "new"
  | "existed"
  | "submitted"
  | "skipped";

export type ProcessedCheckActiveData = {
  userId: string;
  isWeeklyActive: boolean;
  isDailyActive: boolean;
  status: ProcessedCheckActiveStatus;
} & Data;
