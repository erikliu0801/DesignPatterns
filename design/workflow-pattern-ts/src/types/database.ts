export type Data = {
  // _id: string;
  updatedAt: number;
  createdAt: number;

  recordMetrics?: { [key: string]: number };
};

export interface Loader<InitData extends Data = Data> {
  load: (query: any) => Promise<InitData>;
  loadMany: (query: any) => Promise<InitData[]>;
}

export interface Dumper<ValidatedData extends Data = Data> {
  dump: (data: ValidatedData) => Promise<void>;
  dumpMany: (data: ValidatedData[]) => Promise<void>;
}
