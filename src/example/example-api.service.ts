// Simple example of an API service

import {Injectable} from '@angular/core'
import {Http, Request, Headers} from '@angular/http'

@Injectable()
export class ExampleApiService {
  constructor (
    private _http: Http
  ) {}

  // config object = {
  //   url: 'http://something',
  //   method: 'GET/PUT/POST/DELETE',
  //   body: '{"stringified": "body"}'
  // }
  public request ({url, method, body}) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    })
    return this._http.request(new Request({headers, method, url, body}))
  }
}
