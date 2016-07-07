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
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var CoRequestFormComponent = (function () {
    function CoRequestFormComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.headers = [];
        this.request = new core_1.EventEmitter();
        this.requestForm = this.formBuilder.group({
            'url': [''],
            'method': ['GET'],
            'body': ['{}']
        });
    }
    // not very graceful, but does the job
    CoRequestFormComponent.prototype.ngOnChanges = function (changes) {
        if (changes.url && changes.url.currentValue) {
            this.requestForm.controls['url'].updateValue(changes.url.currentValue);
        }
        if (changes.method && changes.method.currentValue) {
            this.requestForm.controls['method'].updateValue(changes.method.currentValue);
        }
        if (changes.body && changes.body.currentValue) {
            this.requestForm.controls['body'].updateValue(changes.body.currentValue);
        }
    };
    CoRequestFormComponent.prototype.addHeaderRow = function (key, value) {
        this.headers.push({
            key: key.value,
            value: value.value
        });
        key.value = '';
        value.value = '';
    };
    CoRequestFormComponent.prototype.removeHeaderRow = function (index) {
        this.headers.splice(index, 1);
    };
    CoRequestFormComponent.prototype.onSubmit = function () {
        this.request.emit({
            url: this.requestForm.controls.url.value,
            body: this.requestForm.controls.body.value,
            method: this.requestForm.controls.method.value,
            headers: this.headers
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CoRequestFormComponent.prototype, "method", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CoRequestFormComponent.prototype, "url", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CoRequestFormComponent.prototype, "body", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CoRequestFormComponent.prototype, "headers", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CoRequestFormComponent.prototype, "request", void 0);
    CoRequestFormComponent = __decorate([
        core_1.Component({
            selector: 'co-request-form-cmp',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES],
            template: "\n    <form [formGroup]=\"requestForm\">\n      <div class=\"row\">\n        <div class=\"col-sm-4\">\n          <fieldset class=\"form-group\">\n            <label>URL</label>\n            <input type=\"text\" class=\"form-control\" formControlName=\"url\">\n            <small class=\"text-muted\">URL</small>\n          </fieldset>\n        </div>\n        <div class=\"col-sm-4\">\n          <fieldset class=\"form-group\">\n            <label>Method</label>\n            <input type=\"text\" class=\"form-control\" formControlName=\"method\">\n            <small class=\"text-muted\">GET/POST/PUT/DELETE</small>\n          </fieldset>\n        </div>\n        <div class=\"col-sm-4\">\n          <label>&nbsp;</label><br>\n          <button type=\"button\" class=\"btn btn-success\" (click)=\"onSubmit()\">\n            Submit\n          </button>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-sm-8\">\n          <fieldset class=\"form-group\">\n            <label>Body</label>\n            <textarea class=\"form-control\" formControlName=\"body\" rows=\"3\"></textarea>\n            <small class=\"text-muted\">Body of POST or PUT requests</small>\n          </fieldset>\n        </div>\n        <div class=\"col-sm-4\">\n          <p></p>\n        </div>\n      </div>\n\n      <label>Headers</label>\n\n      <div class=\"row\">\n        <div class=\"col-sm-8\">\n          <div class=\"row\" *ngFor=\"let header of headers; let i = index;\" style=\"margin-bottom: 5px;\">\n            <div class=\"col-xs-5\">\n              <input type=\"text\" class=\"form-control\" [value]=\"header.key\">\n            </div>\n            <div class=\"col-xs-5\">\n              <input type=\"text\" class=\"form-control\" [value]=\"header.value\">\n            </div>\n            <div class=\"col-xs-1\">\n              <p></p>\n            </div>\n            <div class=\"col-xs-1\">\n              <button type=\"button\" class=\"btn btn-danger\"\n                (click)=\"removeHeaderRow(i)\">\n                -\n              </button>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-sm-4\">\n          <p></p>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-sm-8\">\n          <div class=\"row\">\n            <div class=\"col-xs-5\">\n              <input type=\"text\" #newHeaderKey class=\"form-control\" placeholder=\"New header\">\n            </div>\n            <div class=\"col-xs-5\">\n              <input type=\"text\" #newHeaderValue class=\"form-control\" placeholder=\"New header value\">\n            </div>\n            <div class=\"col-xs-1\">\n              <button type=\"button\" class=\"btn btn-success\"\n                (click)=\"addHeaderRow(newHeaderKey, newHeaderValue);\">\n                +\n              </button>\n            </div>\n            <div class=\"col-xs-1\">\n              <p></p>\n            </div>\n          </div>\n          <div class=\"col-sm-4\">\n            <p></p>\n          </div>\n        </div>\n      </div>\n\n    </form>\n  "
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], CoRequestFormComponent);
    return CoRequestFormComponent;
}());
exports.CoRequestFormComponent = CoRequestFormComponent;
//# sourceMappingURL=co-request-form.component.js.map