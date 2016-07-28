import {Component, ViewChild} from '@angular/core'
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
        [headers]="preconfiguredHeaders">
      </co-request-form-cmp>
      <button class="btn btn-primary" (click)="makeRequest()">
        Get request form values
      </button>
    </div>
  `
})
export class AppCmp {
  @ViewChild(CoRequestFormComponent) coRequestFormComponent: CoRequestFormComponent;

  constructor (private exampleApiService: ExampleApiService) {}

  public makeRequest () {
    console.log(this.coRequestFormComponent.request())
    // this.exampleApiService.request()
  }

  public preconfiguredHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json;charset=UTF-8'
  }
}
