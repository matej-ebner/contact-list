import {Component, OnInit} from '@angular/core';

import {GeneralService} from '../../services/general.service';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
    showSpinner: boolean;

    constructor(private generalService: GeneralService) {
    }

    ngOnInit() {
        this.generalService.spinner.subscribe(
            (data) => {
                this.showSpinner = data;
            }
        );
    }
}
