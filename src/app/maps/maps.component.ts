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

    public tableJSON: Object = {
        'customers': [
            {
                'customer': '0000170173',
                'customer_name': 'ABC PHARMACY',
                'profile': '01',
                'profile_name': 'Profile ab'
            }
        ],
        'chains': [
            {
                'nat_chain': '252',
                'description': 'RITE AID DSD',
                'plant': '',
                'profile': '96',
                'profile_name': 'Rite Aid'
            },
            {
                'nat_chain': '815',
                'description': 'CVS HEALTH DSD',
                'plant': '',
                'profile': 'ZR',
                'profile_name': 'CVS'
            },
            {
                'nat_chain': '953',
                'description': 'MEIJER',
                'plant': '',
                'profile': '3B',
                'profile_name': 'Meijer'
            },
            {
                'nat_chain': '321',
                'description': 'WEGMAN',
                'plant': '8165',
                'profile': '01',
                'profile_name': 'Profile ab'
            }
        ],
        'groups': [
            {
                'nat_group': '0392',
                'nat_group_description': 'ALBERTSONS',
                'nat_subgroup': '000007',
                'nat_subgroup_description': 'ALBERTSONS-SAFEWAY',
                'nat_region': '',
                'nat_district': '',
                'plant': '',
                'profile': 'H)',
                'profile_name': 'Albertsons-Safeway'
            }
        ]
    }

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

    filterSingle(event, type) {
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

    getProfile(event, type) {
        const query = event.query;
        if (query && query.length > 2) {
            this.customerStr = query;
            this.profileService.getProfile(query, type).subscribe(data => {
                console.log(data);
            });
        }
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
