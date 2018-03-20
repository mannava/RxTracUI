import {Component, OnInit} from '@angular/core';
import {DashboardService} from './dashboard.service';
import {Dashboard} from './dashboard.interface';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    public results: any;
    public cols: any[];
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
        this.getDashboardData();
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

    getData(event, type) {
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

    getDashboardData() {
        this.dashboardService.getDashboardData().subscribe(data => {
            this.results = data;
            console.log(this.results);
        });
    }

    removeFocus() {
        this.notificationsService.success(
            'All cards are selected.',
            'Switched to Global.',
            {
                timeOut: 3000,
                showProgressBar: true,
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

























