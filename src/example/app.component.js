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
var co_request_form_component_1 = require('../co-request-form.component');
var AppComponent = (function () {
    function AppComponent() {
        this.preconfiguredHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json;charset=UTF-8'
        };
    }
    AppComponent.prototype.getRequestValues = function () {
        console.log(this.coRequestFormComponent.request());
    };
    __decorate([
        core_1.ViewChild(co_request_form_component_1.CoRequestFormComponent), 
        __metadata('design:type', co_request_form_component_1.CoRequestFormComponent)
    ], AppComponent.prototype, "coRequestFormComponent", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <div class='container'>\n      <h3>co-request-form-cmp</h3>\n      <co-request-form-cmp\n        [url]=\"'http://someurl'\"\n        [method]=\"'GET'\"\n        [body]=\"'{}'\"\n        [headers]=\"preconfiguredHeaders\">\n      </co-request-form-cmp>\n      <br >\n      <button class=\"btn btn-primary\" (click)=\"getRequestValues()\">\n        Get request form values\n      </button>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map