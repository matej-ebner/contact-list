import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FilterByNamePipe } from './pipes/filter-by-name.pipe';

import { AppConstants } from './app.constants';

@NgModule({
    declarations: [
        FilterByNamePipe
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FilterByNamePipe
    ],
    providers: [
        AppConstants
    ]
})

export class SharedModule {
}
