import { backendURL, LOCAL_STORAGE } from 'consts'
import { camelizeKeys, decamelizeKeys } from 'humps'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type ReturnStatement<T> = [Record<string, unknown> | null, T]

class Fetch {
  private token: string
  private useToken: boolean

  constructor(useToken = true) {
    const token = localStorage.getItem(LOCAL_STORAGE.TOKEN) ?? ''
    if (useToken && !token)
      console.warn(
        'Warning, trying to use token when there is none in storage.'
      )

    this.token = token
    this.useToken = useToken
  }

  private generateFetchParams(
    url: string,
    method: Method = 'GET',
    body?: Record<string, unknown>
  ) {
    const URI = `${backendURL}${url}`
    const options = {
      method,
      body: body ? JSON.stringify(decamelizeKeys(body)) : undefined,
      headers: {
        Authorization: this.useToken ? `Bearer ${this.token}` : undefined,
        'content-type': 'application/json',
      },
    }
    return [URI, options] as [string, Parameters<typeof window.fetch>[1]]
  }

  private async doRequest<T>(
    fetch: ReturnType<typeof window.fetch>
  ): Promise<ReturnStatement<T>> {
    try {
      const request = await fetch
      if (!request.ok) throw request
      const response = camelizeKeys(await request.json())
      if (process.env.NODE_ENV === 'development')
        console.log('response', response)
      return ([null, response] as unknown) as ReturnStatement<T>
    } catch (error) {
      console.warn('Fetching error:', error)
      return ([error, null] as unknown) as ReturnStatement<T>
    }
  }

  async get<T>(url: string): Promise<ReturnStatement<T>> {
    return this.doRequest(fetch(...this.generateFetchParams(url)))
  }

  async post<T>(
    url: string,
    body: Record<string, unknown>
  ): Promise<ReturnStatement<T>> {
    return this.doRequest(fetch(...this.generateFetchParams(url, 'POST', body)))
  }

  async put<T>(
    url: string,
    body: Record<string, unknown>
  ): Promise<ReturnStatement<T>> {
    return this.doRequest(fetch(...this.generateFetchParams(url, 'PUT', body)))
  }
}

export { Fetch }
