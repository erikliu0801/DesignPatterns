import { Pipeline, Logger, InfoLog, AlarmLog } from "../types";

const infoLoggers = async (
  loggers: Logger[],
  workflowId: string,
  log: InfoLog
) => {
  const promises = loggers.map((logger) => logger.info({ workflowId, ...log }));
  await Promise.all(promises);
};

const alarmLoggers = async (
  loggers: Logger[],
  workflowId: string,
  log: AlarmLog
) => {
  const promises = loggers.map((logger) =>
    logger.alarm({ workflowId, ...log })
  );
  await Promise.all(promises);
};

export const buildWorkflow =
  <UnprocessedData, ProcessedData>(pipelines: Pipeline[]) =>
  async (initialInput: UnprocessedData[]): Promise<ProcessedData[]> => {
    let processingData = initialInput as any;
    for (const pipeline of pipelines) {
      processingData = await pipeline.pipe(processingData);
    }

    return processingData as ProcessedData[];
  };

export const buildWorkflowWithLogger =
  <UnprocessedData, ProcessedData>(
    workflowId: string,
    pipelines: Pipeline[],
    loggers: Logger[] = []
  ) =>
  async (initialData: UnprocessedData[]): Promise<ProcessedData[]> => {
    const alarm = async (log: AlarmLog) =>
      alarmLoggers(loggers, workflowId, log);
    const info = async (log: InfoLog) => infoLoggers(loggers, workflowId, log);

    let processingData = initialData as any[];
    let brokenPipelineId = "";

    try {
      for (const pipeline of pipelines) {
        try {
          const chunk = initialData.map((data) => pipeline.pipe(data as any));
          processingData = await Promise.all(chunk);

          await info({
            type: "info",
            workflowId,
            pipelineId: pipeline.pipelineId,
            title: "pipeline success",
            timestamp: Date.now(),
          });
        } catch (e) {
          await alarm({
            workflowId,
            pipelineId: pipeline.pipelineId,
            issue: e,
            timestamp: Date.now(),
          });

          brokenPipelineId = pipeline.pipelineId;
          throw Error(`pipeline ${pipeline.pipelineId} failed`);
        }
      }

      return processingData as ProcessedData[];
    } catch (e) {
      await alarmLoggers(loggers, workflowId, {
        workflowId,
        pipelineId: brokenPipelineId,
        issue: e,
        timestamp: Date.now(),
      });

      throw e;
    }
  };
