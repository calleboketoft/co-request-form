import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core'
import {
  FormBuilder,
  REACTIVE_FORM_DIRECTIVES,
  FormControl
} from '@angular/forms'

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
          <div class="row" style="margin-bottom: 5px;"
            *ngFor="let header of headers">
            <div class="col-xs-5">
              {{header.key}}
            </div>
            <div class="col-xs-5">
              <input type="text" class="form-control" [formControlName]="'header-'+header.key">
            </div>
            <div class="col-xs-1">
              <p></p>
            </div>
            <div class="col-xs-1">
              <button type="button" class="btn btn-danger"
                (click)="removeHeaderRow(header)">
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
export class CoRequestFormComponent implements OnInit {
  @Input() method = 'GET';
  @Input() url = '';
  @Input() body = '{}';
  @Input() headers = [];
  @Output() request = new EventEmitter();

  // keep track of which headers are currently present
  public headersArr = [];

  public methodOptions = [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ]
  public requestForm;

  constructor (public formBuilder: FormBuilder) {}

  // initialize only once, then the data in the component is considered local
  ngOnInit () {
    let headersObj = this.headers.reduce((mem, curr) => {
      mem['header-' + curr.key] = [curr.value]
      return mem
    }, {})
    let formOptions = Object.assign({
      'url': [this.url],
      'method': [this.method],
      'body': [this.body]
    }, headersObj)
    this.requestForm = this.formBuilder.group(formOptions)
  }

  public addHeaderRow (newHeaderKey, newHeaderValue) {
    // TODO check if the specific header already exists, if it does,
    // just update its value instead of creating new
    newHeaderKey.value = ''
    newHeaderValue.value = ''

    let headerControlKey = 'header-' + newHeaderKey
    let headerControl = new FormControl(newHeaderValue)

    // Keep the headers arr up to date for the template rendering
    this.headers.push({
      key: newHeaderKey,
      value: newHeaderValue
    })

    this.requestForm.controls.addControl(headerControlKey, headerControl)
  }

  public removeHeaderRow (index) {
    this.headers.splice(index, 1)
  }

  private onSubmit () {
    let headers = Object.keys(this.requestForm.controls).reduce((mem, curr) => {
      if (curr.startsWith('header-')) {
        mem.push({
          key: curr,
          value: this.requestForm.controls[curr]
        })
      }
      return mem
    }, [])
    this.request.emit({
      url: this.requestForm.controls.url.value,
      body: this.requestForm.controls.body.value,
      method: this.requestForm.controls.method.value,
      headers: headers
    })
  }
}
