import {Component, OnInit} from '@angular/core';
import {DashboardService} from './dashboard.service';
import {Dashboard} from './dashboard.interface';
import {NotificationsService} from 'angular2-notifications';
import * as _ from 'underscore';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    public results: any;
    public allCardsResults: any;
    public cols: any[];
    animate: Boolean = false;

    dashboard: Dashboard[];
    currentTab: String = 'Connect Orders';
    focus: Object = {
        'Connect Orders': true,
        'EDI': false,
        'ENT Integration': false,
        'SAP': false,
        'ACUMAX': false,
        'DropShip': false,
        'Global': false
    };

    constructor(private dashboardService: DashboardService, private notificationsService: NotificationsService) {
        this.getDashboardData('all');
    }

    ngOnInit() {
        this.cols = [
            {field: 'Txn Type', header: 'TRANSACTION TYPE'},
            {field: 'EI TimeStamp', header: 'TIMESTAMP'},
            {field: 'Txn Id', header: 'TRANSACTION ID'},
            {field: 'Order ID', header: 'ORDER ID'},
            {field: 'SAP Document Number', header: 'SAP'},
            {field: 'DCNUMBER', header: 'DCNUMBER'}
        ];
    }

    getData(event, type, card) {
        //this.getDashboardData(card);

        this.results = _.where(this.allCardsResults, {'Txn Type': card});
        console.log(this.results);
        this.animate = true;
        for (let key in this.focus) {
            if (key === type) {
                this.focus[key] = true;
            } else {
                this.focus[key] = false;
            }
        }
        this.currentTab = type;
        event.stopPropagation();
    }


    getDashboardData(card) {
        this.dashboardService.getDashboardData(card).subscribe(data => {
            this.allCardsResults = data;
            this.results = data;
        });
    }

    removeFocus() {
        this.results = this.allCardsResults;
        this.animate = false;
        this.notificationsService.info(
            'All cards are selected.',
            'Switched to Global.',
            {
                timeOut: 1500,
                pauseOnHover: true,
                clickToClose: false,
                maxLength: 0,
                maxStack: 1
            }
        );
        for (let key in this.focus) {
            this.focus[key] = false;
        }
        this.currentTab = 'Global';
    }
}

























