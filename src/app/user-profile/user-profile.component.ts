import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../dashboard/dashboard.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    public results: any;
    public cols: any[];

    constructor(private dashboardService: DashboardService) {
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

    getDashboardData(card) {
        this.dashboardService.getDashboardData(card).subscribe(data => {
            this.results = data;
            console.log(this.results);
        });
    }



}
