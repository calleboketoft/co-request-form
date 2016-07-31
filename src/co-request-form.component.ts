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
        *ngFor="let headerKey of headersArr">
        <div class="col-xs-4">
          <input type="text" disabled [value]="headerKey" class="form-control">
        </div>
        <div class="col-xs-4">
          <input type="text" class="form-control" [formControlName]="headerKey">
        </div>
        <div class="col-xs-4" style="text-align: right;">
          <button type="button" class="btn btn-outline-danger"
            style="width: 110px;"
            (click)="removeHeaderRow(headerKey)">
            - Remove
          </button>
        </div>
      </div>
    </form>

    <!-- Add new header TODO make into form-->
    <form [formGroup]="newHeaderForm">
      <div class="row">
        <div class="col-xs-4">
          <input type="text" class="form-control" placeholder="Header"
            formControlName="newHeaderKey">
        </div>
        <div class="col-xs-4">
          <label class="form-control-label text-muted">
            <em>Set value after adding</em>
          </label>
        </div>
        <div class="col-xs-4" style="text-align: right;">
          <button type="button" class="btn btn-outline-success"
            style="width: 110px;"
            (click)="addHeaderRow()">
            + Add
          </button>
        </div>
      </div>
    </form>
  `
})
export class CoRequestFormComponent implements OnInit {

  // Logics to handle externally updated values
  @Input() set method (value) {
    this.methodStr = value
    if (!this.ngOnInitDone) return
    this.requestForm.controls.method.updateValue(value)
  };
  @Input() set url (value) {
    this.urlStr = value
    if (!this.ngOnInitDone) return
    this.requestForm.controls.url.updateValue(value)
  };
  @Input() set body (value) {
    this.bodyStr = value
    if (!this.ngOnInitDone) return
    this.requestForm.controls.body.updateValue(value)
  };
  @Input() set headers (value) {
    this.headersObj = value
    if (!this.ngOnInitDone) return
    // When new headers come in, remove the old controls
    this.headersArr.forEach(headerKey => {
      this.requestForm.controls.headers.removeControl(headerKey)
    })

    // headersarr is used in the template to render list of header inputs
    this.headersArr = Object.keys(value)

    // Add all the new header controls
    Object.keys(value).forEach(headerKey => {
      var headerControl = new FormControl(value[headerKey])
      this.requestForm.controls.headers.addControl(headerKey, headerControl)
    })
  };

  public methodStr = 'GET';
  public urlStr = '';
  public bodyStr = '{}';
  public headersObj = {};

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

  public ngOnInitDone = false
  ngOnInit () {
    this.ngOnInitDone = true
    this.initializeForm()
  }

  public initializeForm () {

    // headersarr is used in the template to render list of header inputs
    this.headersArr = Object.keys(this.headersObj).map(headerKey => headerKey)
    let headersControlsObj = Object.keys(this.headersObj).reduce((mem, curr) => {
      mem[curr] = [this.headersObj[curr]]
      return mem
    }, {})
    this.requestForm = this.formBuilder.group({
      'url': [this.urlStr],
      'method': [this.methodStr],
      'body': [this.bodyStr],
      'headers': this.formBuilder.group(headersControlsObj)
    })

    this.newHeaderForm = this.formBuilder.group({
      'newHeaderKey': [''],
      'newHeaderValue': ['']
    })
  }

  public addHeaderRow () {
    let newHeaderKeyControl = this.newHeaderForm.controls.newHeaderKey
    let headerControlName = newHeaderKeyControl.value

    // If header already exists, return
    let headerControls = Object.keys(this.requestForm.controls.headers.controls)
    if (headerControls.indexOf(headerControlName) !== -1) {
      alert('Header already exists')
      return
    }

    // Keep the headers arr up to date for the template rendering
    this.headersArr.push(newHeaderKeyControl.value)

    this.requestForm.controls.headers.addControl(headerControlName, new FormControl(''))

    // clear input in form
    newHeaderKeyControl.updateValue('')
  }

  public removeHeaderRow (headerToRemove) {
    // Remove from form
    this.requestForm.controls.headers.removeControl(headerToRemove)
    // Remove from header array
    this.headersArr = this.headersArr.filter(headerKey => headerKey !== headerToRemove)
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
