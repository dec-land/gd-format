export type BackendError<T = unknown> = {
    error: string;
    message: string;
    detail: T;
  };