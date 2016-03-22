import {Component} from 'angular2/core'
import {CoRequestFormCmp} from '../co-request-form-cmp'
import {ExampleApiService} from './example-api-service'
import {HTTP_PROVIDERS} from 'angular2/http'

@Component({
  selector: 'app',
  directives: [CoRequestFormCmp],
  providers: [
    HTTP_PROVIDERS,
    ExampleApiService
  ],
  template: `
    <div class='container'>
      <h3>co-request-form-cmp</h3>
      <co-request-form-cmp
        (request)='_makeRequest($event)'>
      </co-request-form-cmp>
    </div>
  `
})
export class AppCmp {
  constructor (
    private _exampleApiService: ExampleApiService
  ) {}

  private _makeRequest (config) {
    this._exampleApiService.request(config)
  }
}
