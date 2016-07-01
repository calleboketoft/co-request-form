import {Component, Input, Output, EventEmitter} from '@angular/core'
import {FormBuilder, REACTIVE_FORM_DIRECTIVES} from '@angular/forms'

@Component({
  selector: 'co-request-form-cmp',
  directives: [REACTIVE_FORM_DIRECTIVES],
  template: `
    <form [formGroup]='requestForm'>
      <div class='row'>
        <div class='col-sm-4'>
          <fieldset class='form-group'>
            <label>URL</label>
            <input type='text' class='form-control' formControlName='url'>
            <small class='text-muted'>URL</small>
          </fieldset>
        </div>
        <div class='col-sm-4'>
          <fieldset class='form-group'>
            <label>Method</label>
            <input type='text' class='form-control' formControlName='method'>
            <small class='text-muted'>GET/POST/PUT/DELETE</small>
          </fieldset>
        </div>
        <div class='col-sm-4'>
          <label>&nbsp;</label><br>
          <button type='button' class='btn btn-success' (click)='onSubmit()'>
            Submit
          </button>
        </div>
      </div>

      <div class='row'>
        <div class='col-sm-8'>
          <fieldset class='form-group'>
            <label>Body</label>
            <textarea class='form-control' formControlName='body' rows='3'></textarea>
            <small class='text-muted'>Body of POST or PUT requests</small>
          </fieldset>
        </div>
        <div class='col-sm-4'>
          <p></p>
        </div>
      </div>
    </form>
  `
})
export class CoRequestFormComponent {
  @Input() method;
  @Input() url;
  @Input() body;
  @Output() request = new EventEmitter();
  private requestForm;

  constructor (private formBuilder: FormBuilder) {
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

  private onSubmit () {
    this.request.emit({
      url: this.requestForm.controls.url.value,
      body: this.requestForm.controls.body.value,
      method: this.requestForm.controls.method.value
    })
  }
}
