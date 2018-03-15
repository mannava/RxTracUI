import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DashboardService} from './dashboard.service';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css',

    ]
})

export class DashboardComponent implements OnInit {
    public results: any;
    private loading: boolean = false;

    constructor(private dashboardService: DashboardService) {
        this.getDashboardData();
    }

    ngOnInit() {
    }

    getData(event, type) {
    }

    getDashboardData() {
        this.dashboardService.getDashboardData().subscribe(data => {
            this.results = data;
            console.log(this.results);
        });
    }
}