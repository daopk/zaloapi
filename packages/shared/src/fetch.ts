import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { HttpsProxyAgent } from 'https-proxy-agent'

const proxyMap = new Map<string, HttpsProxyAgent<string>>()

export async function fetch<T = any>(url: string, config: AxiosRequestConfig = {}) {
  // eslint-disable-next-line n/prefer-global/process
  const ZALOAPI_PROXY = process.env.ZALOAPI_PROXY
  let httpsAgent: HttpsProxyAgent<string> | undefined

  if (ZALOAPI_PROXY) {
    if (proxyMap.has(ZALOAPI_PROXY)) {
      httpsAgent = proxyMap.get(ZALOAPI_PROXY)
    }
    else {
      httpsAgent = new HttpsProxyAgent(ZALOAPI_PROXY)
      proxyMap.set(ZALOAPI_PROXY, httpsAgent)
    }
  }

  const { data } = await axios.request<T>({
    ...config,
    url,
    httpsAgent,
  })
  return data
}
