const schedule = require("node-schedule");

export const scheduleJob = (time: string, job: () => void) => {
  schedule.scheduleJob(time, job);
};

export const workflowTestWrapper = async (
  workflow: Workflow,
  loggers: Logger[]
) => {
  let success = true;
  try {
    await workflow.run();
  } catch (e) {
    success = false;
    loggers.forEach((logger) => {
      logger.alarm({
        workflowId: workflow.workflowId,
        issue: e,
        timestamp: Date.now(),
      });
    });
  } finally {
    console.log(
      `${workflow.workflowId} test ${success ? "succeed" : "failed"}`
    );
  }
};
