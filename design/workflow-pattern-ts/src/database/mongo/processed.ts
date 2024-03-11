import { Dumper, Loader } from "../../types/database";
import { MongoProcessedCheckActiveData } from "../../types/mongo";

const uri = "mongodb://localhost:27017/UserPool";

export const MongoProcessedActiveLoader: Loader<MongoProcessedCheckActiveData> =
  {
    load: async (query: any) => {
      return {
        userId: "TEST_USER_ID",
        isDailyActive: false,
        isWeeklyActive: false,
        status: "new",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
    },
    loadMany: async (query: any) => {
      return [];
    },
  };

export const MongoProcessedActiveDumper: Dumper<MongoProcessedCheckActiveData> =
  {
    dump: async (data: MongoProcessedCheckActiveData) => {
      console.log("Dumped ProcessedActiveCollection", data);
    },
    dumpMany: async (data: MongoProcessedCheckActiveData[]) => {
      console.log("Dumped ProcessedActiveCollection", data);
    },
  };
