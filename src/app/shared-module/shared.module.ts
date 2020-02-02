import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FilterByNamePipe } from './pipes/filter-by-name.pipe';

import { ModalComponent } from './components/modal/modal.component';

import { AppConstants } from './app.constants';

@NgModule({
    declarations: [
        FilterByNamePipe,
        ModalComponent
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
        FilterByNamePipe,
        ModalComponent
    ],
    providers: [
        AppConstants
    ]
})

export class SharedModule {
}
