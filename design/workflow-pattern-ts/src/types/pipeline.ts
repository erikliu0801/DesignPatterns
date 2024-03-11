import { Data } from "./database";
import { Logger } from "./log";
import { Processor } from "./processor";

export interface Pipeline<
  UnprocessedData extends Data = Data,
  ProcessedData extends Data = UnprocessedData
> {
  pipelineId: string;

  pipe: (data: UnprocessedData) => Promise<ProcessedData> | ProcessedData;
  pipeBatch: (
    data: UnprocessedData[]
  ) => Promise<ProcessedData[]> | ProcessedData[];

  // processors: Processor[];
  // /** pure function */
  // pipeline: (data: UnprocessedData) => Promise<ProcessedData> | ProcessedData;
  // pipelineWithLog: (
  //   data: UnprocessedData,
  //   loggers: Logger[]
  // ) => Promise<ProcessedData> | ProcessedData;
}
