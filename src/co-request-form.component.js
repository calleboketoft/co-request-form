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
        this.method = 'GET';
        this.url = '';
        this.body = '{}';
        this.headers = [];
        this.request = new core_1.EventEmitter();
        // keep track of which headers are currently present
        this.headersArr = [];
        this.methodOptions = [
            'GET',
            'POST',
            'PUT',
            'DELETE'
        ];
    }
    // initialize only once, then the data in the component is considered local
    CoRequestFormComponent.prototype.ngOnInit = function () {
        var headersObj = this.headers.reduce(function (mem, curr) {
            mem['header-' + curr.key] = [curr.value];
            return mem;
        }, {});
        var formOptions = Object.assign({
            'url': [this.url],
            'method': [this.method],
            'body': [this.body]
        }, headersObj);
        this.requestForm = this.formBuilder.group(formOptions);
    };
    CoRequestFormComponent.prototype.addHeaderRow = function (newHeaderKey, newHeaderValue) {
        // TODO check if the specific header already exists, if it does,
        // just update its value instead of creating new
        newHeaderKey.value = '';
        newHeaderValue.value = '';
        var headerControlKey = 'header-' + newHeaderKey;
        var headerControl = new forms_1.FormControl(newHeaderValue);
        // Keep the headers arr up to date for the template rendering
        this.headers.push({
            key: newHeaderKey,
            value: newHeaderValue
        });
        this.requestForm.controls.addControl(headerControlKey, headerControl);
    };
    CoRequestFormComponent.prototype.removeHeaderRow = function (index) {
        this.headers.splice(index, 1);
    };
    CoRequestFormComponent.prototype.onSubmit = function () {
        var _this = this;
        var headers = Object.keys(this.requestForm.controls).reduce(function (mem, curr) {
            if (curr.startsWith('header-')) {
                mem.push({
                    key: curr,
                    value: _this.requestForm.controls[curr]
                });
            }
            return mem;
        }, []);
        this.request.emit({
            url: this.requestForm.controls.url.value,
            body: this.requestForm.controls.body.value,
            method: this.requestForm.controls.method.value,
            headers: headers
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
            template: "\n    <form [formGroup]=\"requestForm\">\n      <div class=\"row\">\n        <div class=\"col-sm-4\">\n          <fieldset class=\"form-group\">\n            <label>URL</label>\n            <input type=\"text\" class=\"form-control\" formControlName=\"url\">\n          </fieldset>\n        </div>\n        <div class=\"col-sm-4\">\n          <fieldset class=\"form-group\">\n            <label>Method</label>\n            <select class=\"form-control\" formControlName=\"method\" #method>\n              <option *ngFor=\"let option of methodOptions\"\n                [value]=\"option\">\n                {{option}}\n              </option>\n            </select>\n          </fieldset>\n        </div>\n        <div class=\"col-sm-4\">\n          <label>&nbsp;</label><br>\n          <button type=\"button\" class=\"btn btn-success\" (click)=\"onSubmit()\">\n            Submit\n          </button>\n        </div>\n      </div>\n\n      <div class=\"row\"\n        [hidden]=\"requestForm.controls.method.value !== 'POST' && requestForm.controls.method.value !== 'PUT'\">\n        <div class=\"col-sm-8\">\n          <fieldset class=\"form-group\">\n            <label>Body</label>\n            <textarea class=\"form-control\" formControlName=\"body\" rows=\"3\"></textarea>\n          </fieldset>\n        </div>\n        <div class=\"col-sm-4\">\n          <p></p>\n        </div>\n      </div>\n\n      <label>Headers</label>\n\n      <div class=\"row\">\n        <div class=\"col-sm-8\">\n          <div class=\"row\" style=\"margin-bottom: 5px;\"\n            *ngFor=\"let header of headers\">\n            <div class=\"col-xs-5\">\n              {{header.key}}\n            </div>\n            <div class=\"col-xs-5\">\n              <input type=\"text\" class=\"form-control\" [formControlName]=\"'header-'+header.key\">\n            </div>\n            <div class=\"col-xs-1\">\n              <p></p>\n            </div>\n            <div class=\"col-xs-1\">\n              <button type=\"button\" class=\"btn btn-danger\"\n                (click)=\"removeHeaderRow(header)\">\n                -\n              </button>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-sm-4\">\n          <p></p>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-sm-8\">\n          <div class=\"row\">\n            <div class=\"col-xs-5\">\n              <input type=\"text\" #newHeaderKey class=\"form-control\" placeholder=\"New header\">\n            </div>\n            <div class=\"col-xs-5\">\n              <input type=\"text\" #newHeaderValue class=\"form-control\" placeholder=\"New header value\">\n            </div>\n            <div class=\"col-xs-1\">\n              <button type=\"button\" class=\"btn btn-success\"\n                (click)=\"addHeaderRow(newHeaderKey, newHeaderValue);\">\n                +\n              </button>\n            </div>\n            <div class=\"col-xs-1\">\n              <p></p>\n            </div>\n          </div>\n          <div class=\"col-sm-4\">\n            <p></p>\n          </div>\n        </div>\n      </div>\n\n    </form>\n  "
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], CoRequestFormComponent);
    return CoRequestFormComponent;
}());
exports.CoRequestFormComponent = CoRequestFormComponent;
//# sourceMappingURL=co-request-form.component.js.map