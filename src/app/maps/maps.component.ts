import {Component, OnInit} from '@angular/core';
import {ProfileService} from './profile.servce';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    public allCardsResults: any;
    public results: any;
    public customer: any;
    public chain: any;
    public group: any;

    public customerStr: any;
    public chainStr: any;

    public display: any = false;
    public currentWidget: any = '';

    public filteredChainsSingle: any;
    public filteredCustomersSingle: any;
    public filteredGroupsSingle: any;
    public isDataAvailable: any = false;

    constructor(private profileService: ProfileService, private notificationsService: NotificationsService) {
        this.getDashboardData('all');
    }


    filterResult(query, results: any): any {
        const filtered: any[] = [];
        if (results.results) {
            results = results.results;
            for (let i = 0; i < results.length; i++) {
                const obj = results[i];
                filtered.push(obj);
            }
            return filtered;
        }
    }

    filterCustomerSingle(event, type) {
        const query = event.query;
        if (query && query.length > 2) {
            this.customerStr = query;
            this.profileService.getCustData(query, type).subscribe(data => {
                switch (type) {
                    case 'customer':
                        this.filteredCustomersSingle = this.filterResult(query, data);
                        break;
                    case 'chain':
                        this.filteredChainsSingle = this.filterResult(query, data);
                        break;
                    case 'group':
                        this.filteredGroupsSingle = this.filterResult(query, data);
                        break;
                    default:
                }
            });
        }
    }



    ngOnInit() {

    }

    showDialog(widget) {
        this.display = true;
        this.currentWidget = widget;
    }

    getDashboardData(card) {
        this.profileService.getDashboardData(card).subscribe(data => {
            this.allCardsResults = data;
            this.results = data;
        });
    }

    recordSearch() {
        this.isDataAvailable = !this.isDataAvailable;
    }
}
