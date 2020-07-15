import {NgModule} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS} from './material-persian-date-adapter';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule, MatRippleModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatCheckboxModule,} from '@angular/material/checkbox';
import {  MatBottomSheetModule,} from '@angular/material/bottom-sheet';
import {  MatBadgeModule,} from '@angular/material/badge';
import {  MatMenuModule} from '@angular/material/menu';
import {  MatListModule} from '@angular/material/list';
import {  MatInputModule} from '@angular/material/input';
import {  MatIconModule} from '@angular/material/icon';
import {  MatGridListModule} from '@angular/material/grid-list';
import {  MatExpansionModule} from '@angular/material/expansion';
import {  MatDividerModule} from '@angular/material/divider';
import {  MatDatepickerModule} from '@angular/material/datepicker';
import {  MatButtonToggleModule} from '@angular/material/button-toggle';
import {  MatButtonModule} from '@angular/material/button';
import {  MatPaginatorModule,} from '@angular/material/paginator';
import {  MatProgressBarModule,} from '@angular/material/progress-bar';
import {  MatProgressSpinnerModule,} from '@angular/material/progress-spinner';
import {  MatTreeModule} from '@angular/material/tree';
import {  MatTooltipModule} from '@angular/material/tooltip';
import {  MatToolbarModule} from '@angular/material/toolbar';
import {  MatTabsModule} from '@angular/material/tabs';
import {  MatTableModule} from '@angular/material/table';
import {  MatSnackBarModule} from '@angular/material/snack-bar';
import {  MatSlideToggleModule} from '@angular/material/slide-toggle';
import {  MatSidenavModule} from '@angular/material/sidenav';
import {  MatCardModule} from '@angular/material/card';
import {  MatStepperModule} from '@angular/material/stepper';
import {  MatSortModule} from '@angular/material/sort';
import {  MatSliderModule} from '@angular/material/slider';
import {  MatSelectModule} from '@angular/material/select';
import {  MatRadioModule} from '@angular/material/radio';
@NgModule({
  declarations: [],
  exports: [
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    CdkTableModule,
    CdkTreeModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatFormFieldModule,
    A11yModule,
    CdkStepperModule,
    PortalModule,
    ScrollingModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
  ]
})
export class AppMaterialModule { }
