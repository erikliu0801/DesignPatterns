import { Data } from "./database";

export interface Checkpoint<T extends Data = Data> {
  checkpointId: string;

  check(data: T): boolean;
}
