type SuccessResponse<T> = {
  error: 0;
  message: string;
  data: T;
}

type ErrorResponse = {
  error: number; // non-zero
  message: string;
  data?: unknown;
}

export type ZaloOAResponse<T = any> = SuccessResponse<T> | ErrorResponse;
