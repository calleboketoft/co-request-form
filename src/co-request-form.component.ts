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

      <div class="row" formGroupName="headers">
        <div class="col-sm-8">
          <div class="row" style="margin-bottom: 5px;"
            *ngFor="let header of headers">
            <div class="col-xs-5">
              {{header.key}}
            </div>
            <div class="col-xs-5">
              <input type="text" class="form-control" [formControlName]="header.key">
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
    </form>

    <!-- Add new header TODO make into form-->
    <form [formGroup]="newHeaderForm">
      <div class="row">
        <div class="col-sm-8">
          <div class="row">
            <div class="col-xs-5">
              <input type="text" class="form-control" placeholder="New header"
                formControlName="newHeaderKey">
            </div>
            <div class="col-xs-5">
              <input type="text" class="form-control" placeholder="New header value"
                formControlName="newHeaderValue">
            </div>
            <div class="col-xs-1">
              <button type="button" class="btn btn-success"
                (click)="addHeaderRow()">
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
  public newHeaderForm;

  constructor (public formBuilder: FormBuilder) {}

  // initialize only once, then the data in the component is considered local
  ngOnInit () {
    let headersObj = this.headers.reduce((mem, curr) => {
      mem[curr.key] = [curr.value]
      return mem
    }, {})
    this.requestForm = this.formBuilder.group({
      'url': [this.url],
      'method': [this.method],
      'body': [this.body],
      'headers': this.formBuilder.group(headersObj)
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
    this.headers.push({
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
    this.headers = this.headers.filter(header => header.key !== headerToRemove.key)
  }

  private onSubmit () {
    // go through the headers and get their values
    let headers = Object.keys(this.requestForm.controls.headers.controls).reduce((mem, curr) => {
      mem.push({
        key: curr,
        value: this.requestForm.controls.headers.controls[curr].value
      })
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
