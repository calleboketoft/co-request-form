"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var CoRequestFormCmp = (function () {
    function CoRequestFormCmp(_formBuilder) {
        this._formBuilder = _formBuilder;
        this.request = new core_1.EventEmitter();
        this._requestForm = this._formBuilder.group({
            'url': [''],
            'method': ['GET'],
            'body': ['{}']
        });
    }
    Object.defineProperty(CoRequestFormCmp.prototype, "_url", {
        set: function (value) {
            this._updateFormControl('url', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoRequestFormCmp.prototype, "_bank", {
        set: function (value) {
            this._updateFormControl('bank', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoRequestFormCmp.prototype, "_method", {
        set: function (value) {
            this._updateFormControl('method', value);
        },
        enumerable: true,
        configurable: true
    });
    CoRequestFormCmp.prototype._updateFormControl = function (key, value) {
        if (value) {
            this._requestForm.controls[key].updateValue(value);
        }
    };
    CoRequestFormCmp.prototype._onSubmit = function () {
        this.request.emit({
            url: this._requestForm.controls.url.value,
            body: this._requestForm.controls.body.value,
            method: this._requestForm.controls.method.value
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CoRequestFormCmp.prototype, "request", void 0);
    CoRequestFormCmp = __decorate([
        core_1.Component({
            selector: 'co-request-form-cmp',
            template: "\n    <form [ngFormModel]='_requestForm' (ngSubmit)='_onSubmit()'>\n      <div class='row'>\n        <div class='col-sm-4'>\n          <fieldset class='form-group'>\n            <label>URL</label>\n            <input type='text' class='form-control' ngControl='url'>\n            <small class='text-muted'>URL</small>\n          </fieldset>\n        </div>\n        <div class='col-sm-4'>\n          <fieldset class='form-group'>\n            <label>Method</label>\n            <input type='text' class='form-control' ngControl='method'>\n            <small class='text-muted'>GET/POST/PUT/DELETE</small>\n          </fieldset>\n        </div>\n        <div class='col-sm-4'>\n          <label>&nbsp;</label><br>\n          <button type='submit' class='btn btn-success'>\n            Submit\n          </button>\n        </div>\n      </div>\n\n      <div class='row'>\n        <div class='col-sm-8'>\n          <fieldset class='form-group'>\n            <label>Body</label>\n            <textarea class='form-control' ngControl='body' rows='3'></textarea>\n            <small class='text-muted'>Body of POST or PUT requests</small>\n          </fieldset>\n        </div>\n        <div class='col-sm-4'>\n          <p></p>\n        </div>\n      </div>\n    </form>\n  ",
            inputs: [
                '_url: url',
                '_method: method',
                '_body: body'
            ]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder])
    ], CoRequestFormCmp);
    return CoRequestFormCmp;
}());
exports.CoRequestFormCmp = CoRequestFormCmp;
//# sourceMappingURL=co-request-form-cmp.js.map