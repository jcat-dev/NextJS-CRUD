export interface FetchResponse {
  msg: string
  status: string | null
}

export interface GetFetchResponse<T> extends FetchResponse {
  data: T
}