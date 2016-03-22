import {Component, Output, EventEmitter} from 'angular2/core'
import {FormBuilder} from 'angular2/common'

@Component({
  selector: 'co-request-form-cmp',
  template: `
    <form [ngFormModel]='_requestForm' (ngSubmit)='_onSubmit()'>
      <div class='row'>
        <div class='col-sm-4'>
          <fieldset class='form-group'>
            <label>URL</label>
            <input type='text' class='form-control' ngControl='url'>
            <small class='text-muted'>URL</small>
          </fieldset>
        </div>
        <div class='col-sm-4'>
          <fieldset class='form-group'>
            <label>Method</label>
            <input type='text' class='form-control' ngControl='method'>
            <small class='text-muted'>GET/POST/PUT/DELETE</small>
          </fieldset>
        </div>
        <div class='col-sm-4'>
          <label>&nbsp;</label><br>
          <button type='submit' class='btn btn-success'>
            Submit
          </button>
        </div>
      </div>

      <div class='row'>
        <div class='col-sm-8'>
          <fieldset class='form-group'>
            <label>Body</label>
            <textarea class='form-control' ngControl='body' rows='3'></textarea>
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
export class CoRequestFormCmp {
  @Output() request = new EventEmitter();
  private _requestForm;

  constructor (
    private _formBuilder: FormBuilder
  ) {
    this._requestForm = _formBuilder.group({
      'url': [''],
      'method': ['GET'],
      'body': ['{}']
    })
  }

  private _onSubmit () {
    this.request.emit({
      url: this._requestForm.controls.url.value,
      body: this._requestForm.controls.body.value,
      method: this._requestForm.controls.method.value
    })
  }
}
