import { MongoRawData, MongoProcessedCheckActiveData } from "../../types/mongo";
import { Process } from "../../types/processor";

export const processToInstagramUserProcessedActive: Process<
  MongoRawData,
  MongoProcessedCheckActiveData
> = (data: any) =>
  ({
    userId: data.userId || "",
    isDailyActive: false,
    isWeeklyActive: false,
  } as MongoProcessedCheckActiveData);

export const processCheckDailyActive: Process<
  MongoProcessedCheckActiveData,
  MongoProcessedCheckActiveData
> = (data: MongoProcessedCheckActiveData): MongoProcessedCheckActiveData => {
  const isDailyActive = true;

  return {
    ...data,
    isDailyActive,
  };
};

export const processCheckWeeklyActive: Process<
  MongoProcessedCheckActiveData,
  MongoProcessedCheckActiveData
> = (data: MongoProcessedCheckActiveData): MongoProcessedCheckActiveData => {
  const isWeeklyActive = true;

  return {
    ...data,
    isWeeklyActive,
  };
};
