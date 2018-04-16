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
    public result_set: Object = {
        'connect': [],
        'connect_orders': {'cnt': 0},

        'edi': [],
        'edi_orders': {'cnt': 0},

        'ent': [],
        'ent_orders': {'cnt': 0},
        'ent_deliveries': {'cnt': 0},

        'sap': [],
        'sap_orders': {'cnt': 0},
        'sap_deliveries': {'cnt': 0},

        'acx': [],
        'acx_orders': {'cnt': 0},
        'acx_deliveries': {'cnt': 0},

        'dropship': [],
        // 'dropship_orders': {'cnt': 0},
        'dropship_deliveries': {'cnt': 0}

    };
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
            {field: 'SAP IDoc Num', header: 'SAP Sales Doc'},
            {field: 'DCNUMBER', header: 'DCNUMBER'},
            {field: 'SAP Delivery Number', header: 'SAP Delivery Number'},
        ];
    }

    getData(event, type, card) {
        // this.getDashboardData(card);

        this.results = this.result_set[card];

        console.log(this.results);
        this.animate = true;
        for (const key in this.focus) {
            if (key === type) {
                this.focus[key] = true;
            } else {
                this.focus[key] = false;
            }
        }
        this.currentTab = type;
        event.stopPropagation();
    }

    getOrderCnt() {

        this.result_set['connect'] = _.where(this.allCardsResults, {'Txn Type': 'GATPSMOQSO'});

        this.result_set['connect_orders'] = _.countBy(this.result_set['connect'], function (item) {
            return (item['Order ID'] != null) ? 'cnt' : 'cnt';
        });

        this.result_set['edi'] = _.where(this.allCardsResults, {'Txn Type': 'EDIPO'});
        this.result_set['edi_orders'] = _.countBy(this.result_set['edi'], function (item) {
            return (item['Order ID'] != null) ? 'cnt' : 'cnt';
        });

        this.result_set['ent'] = _.where(this.allCardsResults, {'Txn Type': 'GATPSMOBSO'});
        this.result_set['ent_orders'] = _.countBy(this.result_set['ent'], function (item) {
            return (item['Order ID'] != null) ? 'cnt' : 'cnt';
        });
        this.result_set['ent_deliveries'] = _.countBy(this.result_set['edi'], function (item) {
            return (item['Delivery Number'] != null) ? 'cnt' : 'cnt';
        });

        this.result_set['sap'] = _.where(this.allCardsResults, {'Txn Type': 'EDIPO'});
        this.result_set['sap_orders'] = _.countBy(this.result_set['sap'], function (item) {
            return (item['Order ID'] != null) ? 'cnt' : 'cnt';
        });
        this.result_set['sap_deliveries'] = _.countBy(this.result_set['sap'], function (item) {
            return (item['Delivery Number'] != null) ? 'cnt' : 'cnt';
        });

        this.result_set['acx'] = _.where(this.allCardsResults, {'Txn Type': 'EDIPO'});
        this.result_set['acx_deliveries'] = _.countBy(this.result_set['acx'], function (item) {
            return (item['Delivery Number'] != null) ? 'cnt' : 'cnt';
        });

        this.result_set['dropship'] = _.where(this.allCardsResults, {'Txn Type': 'EDIPO'});
        this.result_set['dropship_deliveries'] = _.countBy(this.result_set['dropship'], function (item) {
            return (item['Delivery Number'] != null) ? 'cnt' : 'cnt';
        });
    }


    getDashboardData(card) {
        this.dashboardService.getDashboardData(card).subscribe(data => {
            this.allCardsResults = data;
            this.allCardsResults.forEach(function (item, idx) {
                if (!item['SAP IDoc Num']) {
                    item['SAP IDoc Num'] = Math.floor(Math.random() * (4313897986 - 1313890000 + 1) + 1313890000);
                }
            });
            this.allCardsResults.forEach(function (item, idx) {
                if (!item['SAP Delivery Number']) {
                    item['SAP Delivery Number'] = Math.floor(Math.random() * (6700128015 - 1700128015 + 1) + 1700128015);
                }
            });

            this.allCardsResults.forEach(function (item, idx) {
                if (!item['DCNUMBER']) {
                    item['DCNUMBER'] = Math.floor(Math.random() * (8900 - 1000 + 1) + 1000);
                }
            });
            this.results = data;
            this.getOrderCnt();
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
        for (const key in this.focus) {
            this.focus[key] = false;
        }
        this.currentTab = 'Global';
    }
}