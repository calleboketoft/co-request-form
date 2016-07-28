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
        <div class="col-sm-8">
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
      </div>

      <div class="row"
        [hidden]="requestForm.controls.method.value !== 'POST' && requestForm.controls.method.value !== 'PUT'">
        <div class="col-sm-12">
          <fieldset class="form-group">
            <label>Body</label>
            <textarea class="form-control" formControlName="body" rows="3"></textarea>
          </fieldset>
        </div>
      </div>

      <label>Headers</label>

      <div class="row" style="margin-bottom: 5px;" formGroupName="headers"
        *ngFor="let header of headersArr">
        <div class="col-xs-4">
          <input type="text" disabled [value]="header.key" class="form-control">
        </div>
        <div class="col-xs-4">
          <input type="text" class="form-control" [formControlName]="header.key">
        </div>
        <div class="col-xs-2">
          <button type="button" class="btn btn-danger"
            (click)="removeHeaderRow(header)">
            Remove
          </button>
        </div>
      </div>
    </form>

    <!-- Add new header TODO make into form-->
    <form [formGroup]="newHeaderForm">
      <div class="row">
        <div class="col-xs-4">
          <input type="text" class="form-control" placeholder="New header"
            formControlName="newHeaderKey">
        </div>
        <div class="col-xs-4">
          <input type="text" class="form-control" placeholder="New header value"
            formControlName="newHeaderValue">
        </div>
        <div class="col-xs-2">
          <button type="button" class="btn btn-success"
            (click)="addHeaderRow()">
            Add
          </button>
        </div>
      </div>
    </form>
  `
})
export class CoRequestFormComponent implements OnInit {
  @Input() method = 'GET';
  @Input() url = '';
  @Input() body = '{}';
  @Input() headers = {};

  // keep track of which headers are currently present
  public headersArr = [];

  public methodOptions = [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ]
  public requestForm;
  public newHeaderForm;

  constructor (public formBuilder: FormBuilder) {}

  // initialize only once, then the data in the component is considered local
  ngOnInit () {
    // headersarr is used in the template to render list of header inputs
    this.headersArr = Object.keys(this.headers).map(headerKey => {
      return {
        key: headerKey,
        value: this.headers[headerKey]
      }
    })
    let headersControlsObj = Object.keys(this.headers).reduce((mem, curr) => {
      mem[curr] = [this.headers[curr]]
      return mem
    }, {})
    this.requestForm = this.formBuilder.group({
      'url': [this.url],
      'method': [this.method],
      'body': [this.body],
      'headers': this.formBuilder.group(headersControlsObj)
    })

    this.newHeaderForm = this.formBuilder.group({
      'newHeaderKey': [''],
      'newHeaderValue': ['']
    })
  }

  public addHeaderRow () {
    // TODO check if the specific header already exists, if it does,
    // just update its value instead of creating new
    let newHeaderKeyControl = this.newHeaderForm.controls.newHeaderKey
    let newHeaderValueControl = this.newHeaderForm.controls.newHeaderValue

    let headerControlKey = newHeaderKeyControl.value
    let headerControl = new FormControl(newHeaderValueControl.value)

    // Keep the headers arr up to date for the template rendering
    this.headersArr.push({
      key: newHeaderKeyControl.value,
      value: newHeaderValueControl.value
    })

    this.requestForm.controls.headers.addControl(headerControlKey, headerControl)

    // clear inputs in form
    newHeaderKeyControl.updateValue('')
    newHeaderValueControl.updateValue('')
  }

  public removeHeaderRow (headerToRemove) {
    // Remove from form
    this.requestForm.controls.headers.removeControl(headerToRemove.key)
    // Remove from header array
    this.headersArr = this.headersArr.filter(header => header.key !== headerToRemove.key)
  }

  public request () {
    // go through the headers and get their values
    let headers = Object.keys(this.requestForm.controls.headers.controls).reduce((mem, curr) => {
      mem[curr] = this.requestForm.controls.headers.controls[curr].value
      return mem
    }, {})
    return {
      url: this.requestForm.controls.url.value,
      body: this.requestForm.controls.body.value,
      method: this.requestForm.controls.method.value,
      headers: headers
    }
  }
}
