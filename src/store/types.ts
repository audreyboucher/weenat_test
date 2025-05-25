import type { Day } from "../types/dates";

export interface Event {
  id: string;
  name: string;
  day: Day;
};

export interface Error {
  message: string;
  timestamp: number;
};
