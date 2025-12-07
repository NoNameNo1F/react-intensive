import type { Metadata } from "./metadata";

export type ResponseModel<T> = {
  result: T;
  metadata: Metadata;
};
