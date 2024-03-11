import { Logger, AlarmLog } from "../types/log";

const sendMongoRecord = (message: string) => {};
const sendMongoLog = (message: string) => {};

export class MongoLogger implements Logger {
  record = (log: any) => {
    sendMongoRecord(`Record: ${log}`);
  };
  info = (log: any) => {
    sendMongoLog(`Info: ${log}`);
  };

  alarm = (log: any) => {};
}
