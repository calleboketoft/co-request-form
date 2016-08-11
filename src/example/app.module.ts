import { NgModule } from '@angular/core'
import { BrowserModule  } from '@angular/platform-browser'
import { AppComponent } from './app.component'

import { Ng2RequestFormModule } from '../ng2-request-form.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, Ng2RequestFormModule],
  bootstrap: [AppComponent]
})
export class AppModule { }