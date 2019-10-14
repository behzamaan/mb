import {NgModule} from '@angular/core';
import {ButtonModule, CheckboxModule, CodeHighlighterModule, InputTextModule, RadioButtonModule, TabViewModule} from 'primeng/primeng';



@NgModule({
  declarations: [],
  exports: [
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    TabViewModule,
    CodeHighlighterModule
  ],
  providers: [

  ]
})
export class AppPrimeModule { }
