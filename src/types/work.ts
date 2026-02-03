export interface Work {
  key: string;
  title: string;

  description?: string | {
    value: string;
  };

  subjects?: string[];

  covers?: number[];
}
