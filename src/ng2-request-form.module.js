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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var ng2_request_form_component_1 = require('./ng2-request-form.component');
var Ng2RequestFormModule = (function () {
    function Ng2RequestFormModule() {
    }
    Ng2RequestFormModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule],
            declarations: [ng2_request_form_component_1.Ng2RequestFormComponent],
            exports: [ng2_request_form_component_1.Ng2RequestFormComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], Ng2RequestFormModule);
    return Ng2RequestFormModule;
}());
exports.Ng2RequestFormModule = Ng2RequestFormModule;
//# sourceMappingURL=ng2-request-form.module.js.map