import { backendURL, LOCAL_STORAGE } from 'consts'
import { camelizeKeys, decamelizeKeys } from 'humps'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type ReturnStatement<T> = [Record<string, unknown> | null, T]

type URLObject =
  | string
  | {
      path: string
      params: Record<string, string>
    }

class Fetch {
  private token: string
  private useToken: boolean
  private isTest: boolean

  constructor(isTest: boolean, useToken: boolean) {
    const token = localStorage.getItem(LOCAL_STORAGE.TOKEN) ?? ''
    if (useToken && !token)
      console.warn(
        'Warning, trying to use token when there is none in storage.'
      )

    this.token = token
    this.useToken = useToken
    this.isTest = isTest
  }

  private generateFetchParams(
    url: URLObject,
    method: Method = 'GET',
    body?: object
  ) {
    const URL: string = typeof url === 'string' ? url : url.path

    const params: string = `${this.composeQueryParams({
      ...(typeof url !== 'string' ? url.params : {}),
      ...(this.isTest ? { test: '1' } : {}),
    })}`

    const URI = `${backendURL}${URL}${params}`
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
      const contentType = request.headers.get('content-type')
      const response = contentType?.includes('application/json')
        ? await request.json()
        : await request.text()
      const data = response && camelizeKeys(response)
      if (process.env.NODE_ENV === 'development') console.log('response', data)
      return ([null, data] as unknown) as ReturnStatement<T>
    } catch (error) {
      console.warn('Fetching error:', error)
      return ([error, null] as unknown) as ReturnStatement<T>
    }
  }

  private composeQueryParams(params: Record<string, string>): string {
    const query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&')
    return query && '?' + query
  }

  async get<T>(url: URLObject): Promise<ReturnStatement<T>> {
    return this.doRequest(fetch(...this.generateFetchParams(url)))
  }

  async post<Payload extends object, Response>(
    url: URLObject,
    body: Payload
  ): Promise<ReturnStatement<Response>> {
    return this.doRequest(fetch(...this.generateFetchParams(url, 'POST', body)))
  }

  async put<Payload extends object, Response = undefined>(
    url: URLObject,
    body: Payload
  ): Promise<ReturnStatement<Response>> {
    return this.doRequest(fetch(...this.generateFetchParams(url, 'PUT', body)))
  }

  async delete<T = void>(url: URLObject): Promise<ReturnStatement<T>> {
    return this.doRequest(fetch(...this.generateFetchParams(url, 'DELETE')))
  }
}

export { Fetch }
