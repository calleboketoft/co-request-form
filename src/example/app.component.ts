import {Component} from '@angular/core'
import {CoRequestFormComponent} from '../co-request-form.component'
import {ExampleApiService} from './example-api.service'
import {HTTP_PROVIDERS} from '@angular/http'

@Component({
  selector: 'app',
  directives: [CoRequestFormComponent],
  providers: [
    HTTP_PROVIDERS,
    ExampleApiService
  ],
  template: `
    <div class='container'>
      <h3>co-request-form-cmp</h3>
      <co-request-form-cmp
        [url]="'http://someurl'"
        [method]="'GET'"
        [body]="'{}'"
        [headers]="preconfiguredHeaders"
        (request)="makeRequest($event)">
      </co-request-form-cmp>
    </div>
  `
})
export class AppCmp {
  constructor (private exampleApiService: ExampleApiService) {}

  public makeRequest (config) {
    console.log(config)
    this.exampleApiService.request(config)
  }

  public preconfiguredHeaders = [
    {
      key: 'Content-Type',
      value: 'application/json'
    },
    {
      key: 'Accept',
      value: 'application/json;charset=UTF-8'
    }
  ]
}
