import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { Ng2RequestFormComponent } from './ng2-request-form.component'

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [Ng2RequestFormComponent],
  exports: [Ng2RequestFormComponent]
})
export class Ng2RequestFormModule {}
