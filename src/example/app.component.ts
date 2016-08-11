import { Component, ViewChild } from '@angular/core'
import { Ng2RequestFormComponent } from '../../ng2-request-form'

@Component({
  selector: 'app',
  template: `
    <div class='container'>
      <h3>ng2-request-form</h3>
      <ng2-request-form
        [url]="'http://someurl'"
        [method]="'GET'"
        [body]="'{}'"
        [headers]="preconfiguredHeaders">
      </ng2-request-form>
      <br >
      <button class="btn btn-primary" (click)="getRequestValues()">
        Get request form values
      </button>
    </div>
  `
})
export class AppComponent {
  @ViewChild(Ng2RequestFormComponent) ng2RequestFormComponent: Ng2RequestFormComponent;

  public getRequestValues() {
    console.log(this.ng2RequestFormComponent.request())
  }

  public preconfiguredHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json;charset=UTF-8'
  }
}
