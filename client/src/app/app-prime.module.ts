import {NgModule} from '@angular/core';
import {ButtonModule, CheckboxModule, CodeHighlighterModule, InputTextModule, RadioButtonModule, TabViewModule} from 'primeng/primeng';
import {ListboxModule} from 'primeng/listbox';



@NgModule({
  declarations: [],
  exports: [
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    TabViewModule,
    CodeHighlighterModule,
    ListboxModule
  ],
  providers: [

  ]
})
export class AppPrimeModule { }
