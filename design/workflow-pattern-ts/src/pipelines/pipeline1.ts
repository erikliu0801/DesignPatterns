import { Pipeline } from "../types/pipeline";
import { MongoRawData, MongoProcessedCheckActiveData } from "../types/mongo";

// processors
import {
  processToInstagramUserProcessedActive,
  processCheckDailyActive,
  processCheckWeeklyActive,
} from "./processors/processor1";

// utils
import { pipe } from "remeda";

type Pipeline1Data = MongoRawData | MongoProcessedCheckActiveData;

export class Pipeline1
  implements Pipeline<MongoRawData, MongoProcessedCheckActiveData>
{
  pipelineId: string = "pipeline-1";

  pipe: (data: MongoRawData) => MongoProcessedCheckActiveData = (
    data: MongoRawData
  ) => {
    const processingData: Pipeline1Data = data;
    const processedData = pipe(
      processingData,
      processToInstagramUserProcessedActive,
      processCheckDailyActive,
      processCheckWeeklyActive
    );

    return processedData as MongoProcessedCheckActiveData;
  };

  pipeBatch: (data: MongoRawData[]) => MongoProcessedCheckActiveData[] = (
    data: MongoRawData[]
  ) => data.map(this.pipe);
}
