import {Component, ViewChild} from '@angular/core'
import {CoRequestFormComponent} from '../co-request-form.component'

@Component({
  selector: 'app',
  directives: [CoRequestFormComponent],
  template: `
    <div class='container'>
      <h3>co-request-form-cmp</h3>
      <co-request-form-cmp
        [url]="'http://someurl'"
        [method]="'GET'"
        [body]="'{}'"
        [headers]="preconfiguredHeaders">
      </co-request-form-cmp>
      <br >
      <button class="btn btn-primary" (click)="getRequestValues()">
        Get request form values
      </button>
    </div>
  `
})
export class AppCmp {
  @ViewChild(CoRequestFormComponent) coRequestFormComponent: CoRequestFormComponent;

  public getRequestValues () {
    console.log(this.coRequestFormComponent.request())
  }

  public preconfiguredHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json;charset=UTF-8'
  }
}
