export type LogType = "info" | "verbose" | "error" | "debug" | "warn" | "alarm";

export type RecordLog = {
  workflowId?: string;
  metric?: { [key: string]: number };
};

export type InfoLog = {
  workflowId?: string;
  pipelineId?: string;
  processorId?: string;
  type: LogType;
  title: string;
  description?: string;
  timestamp: number;
};

export type AlarmLog = {
  workflowId?: string;
  pipelineId?: string;
  processorId?: string;
  issue: any;
  timestamp: number;
};

export interface Logger {
  record: (log: RecordLog) => void;
  info: (log: InfoLog) => void;
  alarm: (log: AlarmLog) => void;
}
