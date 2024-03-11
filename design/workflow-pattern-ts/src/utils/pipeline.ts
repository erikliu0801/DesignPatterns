import { Process, Logger } from "../types";
import { AlarmLog, InfoLog } from "../types/log";

const infoLoggers = async (
  loggers: Logger[],
  pipelineId: string,
  log: InfoLog
) => {
  const promises = loggers.map((logger) => logger.info({ pipelineId, ...log }));
  await Promise.all(promises);
};

const alarmLoggers = async (
  loggers: Logger[],
  pipelineId: string,
  log: AlarmLog
) => {
  const promises = loggers.map((logger) =>
    logger.alarm({ pipelineId, ...log })
  );
  await Promise.all(promises);
};

export const buildPipeline =
  <UnprocessedData, ProcessedData>(processes: Process[]) =>
  async (initialInput: UnprocessedData): Promise<ProcessedData> => {
    let processingData = initialInput as any;
    for (const processor of processes) {
      processingData = await processor(processingData);
    }

    return processingData as ProcessedData;
  };

export const buildPipelineWithLogger =
  <UnprocessedData, ProcessedData>(
    pipelineId: string,
    processes: Process[],
    loggers: Logger[] = []
  ) =>
  async (initialInput: UnprocessedData): Promise<ProcessedData> => {
    const info = async (log: InfoLog) => infoLoggers(loggers, pipelineId, log);

    let processingData = initialInput as any;
    let brokenProcessorId = "";

    try {
      for (const processor of processes) {
        try {
          processingData = await processor(processingData);
          await info({
            type: "verbose",
            pipelineId,
            processorId: processor.name,
            title: "processor success",
            timestamp: Date.now(),
          });
        } catch (e) {
          await info({
            type: "error",
            pipelineId,
            processorId: processor.name,
            title: "processor error",
            description: (e as Error).message,
            timestamp: Date.now(),
          });

          brokenProcessorId = processor.name;
          throw Error(`processor ${processor.name} failed`);
        }
      }

      return processingData as ProcessedData;
    } catch (e) {
      await alarmLoggers(loggers, pipelineId, {
        pipelineId,
        processorId: brokenProcessorId,
        issue: e,
        timestamp: Date.now(),
      });

      throw e;
    }
  };
