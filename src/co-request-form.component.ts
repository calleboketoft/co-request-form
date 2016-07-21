import {Component, Input, Output, EventEmitter} from '@angular/core'
import {FormBuilder, REACTIVE_FORM_DIRECTIVES} from '@angular/forms'

@Component({
  selector: 'co-request-form-cmp',
  directives: [REACTIVE_FORM_DIRECTIVES],
  template: `
    <form [formGroup]="requestForm">
      <div class="row">
        <div class="col-sm-4">
          <fieldset class="form-group">
            <label>URL</label>
            <input type="text" class="form-control" formControlName="url">
          </fieldset>
        </div>
        <div class="col-sm-4">
          <fieldset class="form-group">
            <label>Method</label>
            <select class="form-control" formControlName="method" #method>
              <option *ngFor="let option of methodOptions"
                [value]="option">
                {{option}}
              </option>
            </select>
          </fieldset>
        </div>
        <div class="col-sm-4">
          <label>&nbsp;</label><br>
          <button type="button" class="btn btn-success" (click)="onSubmit()">
            Submit
          </button>
        </div>
      </div>

      <div class="row"
        [hidden]="requestForm.controls.method.value !== 'POST' && requestForm.controls.method.value !== 'PUT'">
        <div class="col-sm-8">
          <fieldset class="form-group">
            <label>Body</label>
            <textarea class="form-control" formControlName="body" rows="3"></textarea>
          </fieldset>
        </div>
        <div class="col-sm-4">
          <p></p>
        </div>
      </div>

      <label>Headers</label>

      <div class="row">
        <div class="col-sm-8">
          <div class="row" *ngFor="let header of headers; let i = index;" style="margin-bottom: 5px;">
            <div class="col-xs-5">
              <input type="text" class="form-control"
                [ngModelOptions]="{standalone: true}" [(ngModel)]="header.key">
            </div>
            <div class="col-xs-5">
              <input type="text" class="form-control"
                [ngModelOptions]="{standalone: true}" [(ngModel)]="header.value">
            </div>
            <div class="col-xs-1">
              <p></p>
            </div>
            <div class="col-xs-1">
              <button type="button" class="btn btn-danger"
                (click)="removeHeaderRow(i)">
                -
              </button>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <p></p>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-8">
          <div class="row">
            <div class="col-xs-5">
              <input type="text" #newHeaderKey class="form-control" placeholder="New header">
            </div>
            <div class="col-xs-5">
              <input type="text" #newHeaderValue class="form-control" placeholder="New header value">
            </div>
            <div class="col-xs-1">
              <button type="button" class="btn btn-success"
                (click)="addHeaderRow(newHeaderKey, newHeaderValue);">
                +
              </button>
            </div>
            <div class="col-xs-1">
              <p></p>
            </div>
          </div>
          <div class="col-sm-4">
            <p></p>
          </div>
        </div>
      </div>

    </form>
  `
})
export class CoRequestFormComponent {
  @Input() method;
  @Input() url;
  @Input() body;
  @Input() headers = [];
  @Output() request = new EventEmitter();

  public methodOptions = [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ]
  public requestForm;

  constructor (public formBuilder: FormBuilder) {
    this.requestForm = this.formBuilder.group({
      'url': [''],
      'method': ['GET'],
      'body': ['{}']
    })
  }

  // not very graceful, but does the job
  ngOnChanges (changes) {
    if (changes.url && changes.url.currentValue) {
      this.requestForm.controls['url'].updateValue(changes.url.currentValue)
    }
    if (changes.method && changes.method.currentValue) {
      this.requestForm.controls['method'].updateValue(changes.method.currentValue)
    }
    if (changes.body && changes.body.currentValue) {
      this.requestForm.controls['body'].updateValue(changes.body.currentValue)
    }
  }

  public addHeaderRow (key, value) {
    this.headers.push({
      key: key.value,
      value: value.value
    })
    key.value = ''
    value.value = ''
  }

  public removeHeaderRow (index) {
    this.headers.splice(index, 1)
  }

  private onSubmit () {
    this.request.emit({
      url: this.requestForm.controls.url.value,
      body: this.requestForm.controls.body.value,
      method: this.requestForm.controls.method.value,
      headers: this.headers
    })
  }
}
