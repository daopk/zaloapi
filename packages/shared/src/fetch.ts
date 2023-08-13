import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { HttpsProxyAgent } from 'https-proxy-agent'

const proxyMap = new Map<string, HttpsProxyAgent<string>>()

export async function fetch<T = any>(url: string, config: AxiosRequestConfig = {}) {
  // eslint-disable-next-line n/prefer-global/process
  const HTTPS_PROXY = process.env.HTTPS_PROXY
  let httpsAgent: HttpsProxyAgent<string> | undefined

  if (HTTPS_PROXY) {
    if (proxyMap.has(HTTPS_PROXY)) {
      httpsAgent = proxyMap.get(HTTPS_PROXY)
    }
    else {
      httpsAgent = new HttpsProxyAgent(HTTPS_PROXY)
      proxyMap.set(HTTPS_PROXY, httpsAgent)
    }
  }

  const { data } = await axios.request<T>({
    ...config,
    url,
    httpsAgent,
  })
  return data
}
