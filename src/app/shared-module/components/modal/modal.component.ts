import {Component, EventEmitter, Input, OnInit, Output, AfterViewInit, ViewChildren} from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
    @Input() title: string;
    @Input() bodyText: string;
    @Input() cancelButtonText: string;
    @Input() acceptButtonText: string;
    @Input() params: any;
    @Output() acceptModalAction = new EventEmitter();
    @Output() declineModalAction = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    accept() {
        if (this.params) {
            this.acceptModalAction.emit(this.params);
        } else {
            this.acceptModalAction.emit(true);
        }
    }

    decline() {
        this.declineModalAction.emit(true);
    }
}
