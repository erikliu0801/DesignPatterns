import { Dumper, Loader } from "../../types/database";
import { MongoRawData } from "../../types/mongo";

const uri = "mongodb://localhost:27017/UserPool";

export const MongoRawLoader: Loader<MongoRawData> = {
  load: async (query: any) => {
    return {
      userId: "TEST_IG_ID",
      updatedAt: Date.now(),
      createdAt: Date.now(),
    };
  },
  loadMany: async (query: any) => {
    return [];
  },
};

export const MongoRawDumper: Dumper<MongoRawData> = {
  dump: async (data: MongoRawData) => {
    console.log("Dumped UserPool", data);
  },
  dumpMany: async (data: MongoRawData[]) => {
    console.log("Dumped UserPool", data);
  },
};
