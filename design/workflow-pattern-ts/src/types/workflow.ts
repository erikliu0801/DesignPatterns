import { Dumper, Loader } from "./database";
import { Pipeline } from "./pipeline";
import { Checkpoint } from "./checkpoint";
import { Logger } from "./log";

export interface Workflow {
  workflowId: string;
  cronExpression: string;
  batchCount: number;

  run: () => Promise<void>;
  runBatch: (count: number) => Promise<void>;

  // flow: (Pipeline | Checkpoint)[];
  // /** pure function */
  // workflow(loader: Loader, dumper: Dumper, maxCount: number): Promise<void>;

  // /** function with logging  */
  // workflowWithLog(
  //   loader: Loader,
  //   dumper: Dumper,
  //   maxCount: number,
  //   loggers: Logger[]
  // ): Promise<void>;
}
