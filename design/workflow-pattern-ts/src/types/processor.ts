import { Data } from "./database";

export interface Processor<
  UnprocessedData extends Data = Data,
  ProcessedData = UnprocessedData
> {
  processorId: string;
  process: Process<UnprocessedData, ProcessedData>;
}

export interface Process<
  UnprocessedData extends Data = Data,
  ProcessedData = UnprocessedData
> {
  (data: UnprocessedData): ProcessedData;
}
