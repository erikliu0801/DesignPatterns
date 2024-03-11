// utils
import { scheduleJob, workflowTestWrapper } from "./utils/common";
import { SlackLogger } from "./loggers";
import { Workflow1 } from "./workflows";

// workflows
const workflow1 = new Workflow1();

// loggers
const slackLogger = SlackLogger.getInstance();

/** run workflows */
async function main() {
  // for test
  const testWorkflows = [workflow1];
  const loggers = [slackLogger];
  scheduleJob(
    "0 0 0 * * *", // every day at 00:00:00
    async () => {
      testWorkflows.forEach(async (workflow) => {
        await workflowTestWrapper(workflow, loggers);
      });
    }
  );

  // set schedule job
  scheduleJob(
    "0 0 8 * * 1", // every Monday at 8:00:00 AM
    async () => {
      await workflow1.runBatch(workflow1.batchCount);
    }
  );
}

main();
