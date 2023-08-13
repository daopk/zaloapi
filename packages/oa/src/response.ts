export interface ZaloOAResponse<T = any> {
  error: number
  message: string
  data: T
}
