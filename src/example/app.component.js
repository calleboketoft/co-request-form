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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _1 = require("../../");
var AppComponent = (function () {
    function AppComponent() {
        this.preconfiguredHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json;charset=UTF-8'
        };
    }
    AppComponent.prototype.getRequestValues = function () {
        console.log(this.requestFormComponent.request());
    };
    return AppComponent;
}());
__decorate([
    core_1.ViewChild(_1.RequestFormComponent),
    __metadata("design:type", _1.RequestFormComponent)
], AppComponent.prototype, "requestFormComponent", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: 'app',
        template: "\n    <div class='container'>\n      <h3>Angular 2 request-form</h3>\n      <request-form\n        [url]=\"'http://someurl'\"\n        [method]=\"'GET'\"\n        [body]=\"'{}'\"\n        [headers]=\"preconfiguredHeaders\">\n      </request-form>\n      <br >\n      <button class=\"btn btn-primary\" (click)=\"getRequestValues()\">\n        Get request form values\n      </button>\n    </div>\n  "
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map