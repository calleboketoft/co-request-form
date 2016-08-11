import { Component, ViewChild } from '@angular/core'
import { RequestFormComponent } from '../../'

@Component({
  selector: 'app',
  template: `
    <div class='container'>
      <h3>Angular 2 request-form</h3>
      <request-form
        [url]="'http://someurl'"
        [method]="'GET'"
        [body]="'{}'"
        [headers]="preconfiguredHeaders">
      </request-form>
      <br >
      <button class="btn btn-primary" (click)="getRequestValues()">
        Get request form values
      </button>
    </div>
  `
})
export class AppComponent {
  @ViewChild(RequestFormComponent) requestFormComponent: RequestFormComponent;

  public getRequestValues() {
    console.log(this.requestFormComponent.request())
  }

  public preconfiguredHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json;charset=UTF-8'
  }
}
