import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { RequestFormComponent } from './request-form.component'

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [RequestFormComponent],
  exports: [RequestFormComponent]
})
export class RequestFormModule {}
