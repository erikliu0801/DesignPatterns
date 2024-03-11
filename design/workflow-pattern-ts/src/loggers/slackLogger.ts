import { Logger, AlarmLog } from "../types/log";

const sendSlackMessage = (message: string) => {};

export class SlackLogger implements Logger {
  private constructor() {}
  private static instance: SlackLogger;
  static getInstance = () => {
    if (!SlackLogger.instance) {
      SlackLogger.instance = new SlackLogger();
    }
    return SlackLogger.instance;
  };

  record = (log: any) => {};
  info = (log: any) => {};
  alarm = (log: AlarmLog) => {
    sendSlackMessage(`Issue: ${log.issue}`);
  };
}
