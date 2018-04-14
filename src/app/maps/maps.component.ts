import {Component, OnInit} from '@angular/core';
import {ProfileService} from './profile.servce';
import {NotificationsService} from 'angular2-notifications';

declare const google: any;

interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable?: boolean;
}

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    public allCardsResults: any;
    public results: any;

    public display: boolean = false;
    public currentWidget: string = '';

    showDialog(widget) {
        this.display = true;
        this.currentWidget = widget;
    }

    country: any;
    filteredChainsSingle: any[];
    filteredCustomersSingle: any[];
    filteredGroupsSingle: any[];


    constructor(private profileService: ProfileService, private notificationsService: NotificationsService) {
        this.getDashboardData('all');
    }


    filterResult(query, results: any[]): any[] {
        const filtered: any[] = [];
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            if (result.desc.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(result.desc);
            }
        }
        return filtered;
    }

    filterChainSingle(event, type) {
        const query = event.query;
        if (query && query.length > 2) {
            this.profileService.getCustData(query, type).subscribe(data => {
                this.filteredChainsSingle = this.filterResult(query, data.results);
            });
        }
    }

    filterGroupSingle(event, type) {
        const query = event.query;
        if (query && query.length > 2) {
            this.profileService.getCustData(query, type).subscribe(data => {
                this.filteredGroupsSingle = this.filterResult(query, data.results);
            });
        }
    }

    filterCustomerSingle(event, type) {
        const query = event.query;
        if (query && query.length > 2) {
            this.profileService.getCustData(query, type).subscribe(data => {
                this.filteredCustomersSingle = this.filterResult(query, data.results);
            });
        }
    }


    ngOnInit() {

    }

    getDashboardData(card) {
        this.profileService.getDashboardData(card).subscribe(data => {
            this.allCardsResults = data;
            this.results = data;
        });
    }

}
