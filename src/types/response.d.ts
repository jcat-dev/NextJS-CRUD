export interface FetchResponse {
  msg: string
  status: string
}

export interface GetFetchResponse<T> extends FetchResponse {
  data: T
}