import {bootstrap} from '@angular/platform-browser-dynamic'
import {AppCmp} from './app.component'
import {provideForms} from '@angular/forms'
bootstrap(AppCmp, [
  provideForms()
])