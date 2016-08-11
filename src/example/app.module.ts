import { NgModule } from '@angular/core'
import { BrowserModule  } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { ReactiveFormsModule } from '@angular/forms'

import { CoRequestFormComponent } from '../co-request-form.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
  providers: [CoRequestFormComponent]
})
export class AppModule { }