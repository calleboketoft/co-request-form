import {bootstrap} from '@angular/platform-browser-dynamic'
import {AppCmp} from './app.component'
import {provideForms, disableDeprecatedForms} from '@angular/forms'
bootstrap(AppCmp, [
  disableDeprecatedForms(),
  provideForms()
])