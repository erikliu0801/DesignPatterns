import { Checkpoint } from "../types/checkpoint";
import { Workflow } from "../types/workflow";
import { MongoRawData, MongoProcessedCheckActiveData } from "../types/mongo";
// data
import { MongoRawLoader, MongoProcessedActiveDumper } from "../database/mongo";
// process
import { Pipeline1 } from "../pipelines/pipeline1";

const pipeline1 = new Pipeline1();

type WorkflowData = MongoRawData | MongoProcessedCheckActiveData;

const checkpoint1: Checkpoint = {
  checkpointId: "checkpoint-1",
  check: (data: WorkflowData) => {
    return true;
  },
};

export class Workflow1 implements Workflow {
  workflowId: string = "workflow-1";
  cronExpression: string = "0 0 * * 2";
  batchCount: number = 160_000;

  run = async () => {
    const data = await MongoRawLoader.load({});
    const processingData = data;

    // pipeline 1
    const processedData = pipeline1.pipe(processingData);

    // checkpoint 1
    if (checkpoint1.check(processingData)) {
      // insert to firestore

      MongoProcessedActiveDumper.dump({
        ...processedData,
        status: "submitted",
      });
    } else {
      MongoProcessedActiveDumper.dump({
        ...processedData,
        status: "skipped",
      });
    }
  };

  runBatch = async (count: number) => {
    const data = await MongoRawLoader.loadMany({});
    const processingData = data;

    // pipeline 1
    const processedData = pipeline1.pipeBatch(processingData);

    // checkpoint 1
    const validData = processedData.filter(checkpoint1.check);
    const invalidData = processedData.filter(
      (data) => !checkpoint1.check(data)
    );

    // insert to firestore
    MongoProcessedActiveDumper.dumpMany(
      validData.map((data) => ({ ...data, status: "submitted" }))
    );
    MongoProcessedActiveDumper.dumpMany(
      invalidData.map((data) => ({ ...data, status: "skipped" }))
    );
  };
}
