import { toast } from "react-toastify"
import { FetchResponse, GetFetchResponse } from "../types/response"
import "react-toastify/dist/ReactToastify.css"

type Method = "POST" | "PUT" | "DELETE"

export async function setFetch (method: Method, api: string, body: any) {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }

  const res = await fetch(api, options)
  const result: FetchResponse = await res.json()

  if (result.status) {
    toast.success(result.msg, { position: "bottom-right" })
    return result.status
  }

  toast.error(result.msg, { position: "bottom-right" })
  return null
}

export async function getFetch <T>(api: string) {
  const res = await fetch(api)
  const result: GetFetchResponse<T> = await res.json()
 
  if (result.status) {
    toast.success(result.msg, { position: "bottom-right" })
    return result.data
  }

  toast.error(result.msg, { position: "bottom-right" })
  return null
}

