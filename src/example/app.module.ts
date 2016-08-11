import { NgModule } from '@angular/core'
import { BrowserModule  } from '@angular/platform-browser'
import { AppComponent } from './app.component'

import { RequestFormModule } from '../request-form.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RequestFormModule],
  bootstrap: [AppComponent]
})
export class AppModule { }