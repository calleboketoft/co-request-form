// Simple example of an API service

import {Injectable} from '@angular/core'
import {Http, Request, Headers} from '@angular/http'

export interface Config {
  url: string
  method: string
  body: string
}

@Injectable()
export class ExampleApiService {
  constructor (
    private http: Http
  ) {}

  public request ({url, method, body}: Config) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    })
    return this.http.request(new Request({headers, method, url, body}))
  }
}
