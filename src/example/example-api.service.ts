// Simple example of an API service

import {Injectable} from '@angular/core'
import {Http, Request, Headers} from '@angular/http'

export interface Config {
  url: string
  method: string
  body: string,
  headers?: any[]
}

@Injectable()
export class ExampleApiService {
  constructor (
    private http: Http
  ) {}

  public request ({url, method, body, headers = []}: Config) {

    let headersObj = {}
    if (headers.length > 0) {
      headersObj = headers.reduce((mem, curr) => {
        mem[curr.key] = curr.value
        return mem
      }, {})
    }

    let headersMerged = new Headers(headersObj)
    return this.http.request(new Request({
      headers: headersMerged,
      method,
      url,
      body
    }))
  }
}
