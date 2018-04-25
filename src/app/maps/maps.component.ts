import {Component, OnInit} from '@angular/core';
import {ProfileService} from './profile.servce';
import {NotificationsService} from 'angular2-notifications';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';


@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

    public results: any;
    public customer: any;
    public chain: any;
    public group: any;

    public customerStr: any;

    public display: any = false;

    public filteredChainsSingle: any;
    public filteredCustomersSingle: any;
    public filteredGroupsSingle: any;
    public isDataAvailable: any = false
    public currentObj: object = {};

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
    };

    constructor(private profileService: ProfileService, private notificationsService: NotificationsService, private confirmationService: ConfirmationService) {
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
        /*this.cust_cols = [
            {field: 'customer', header: 'Customer'},
            {field: 'profile', header: 'Profile'}
        ];

        this.chain_cols = [
            {field: 'nat_chain', header: 'Chain'},
            {field: 'profile', header: 'Profile'}
        ];

        this.group_cols = [
            {field: 'nat_group', header: 'Group'},
            {field: 'nat_subgroup', header: 'Sub Group'},
            {field: 'nat_region', header: 'Region'},
            {field: 'nat_district', header: 'District'},
            {field: 'profile', header: 'Profile'}
        ];*/

    }

    OnEdit(e, type) {
        console.log('oedit ', e, type);
    }

    OnEditComplete(e, type) {
        /*if (e && e.data) {
            this.currentObj[type] = e.data;
        }*/
        console.log('oedit complete ', e, type);
    }

    OnEditCancel(e, type) {
        console.log('oedit cancel ', e, type);
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

    addNew(type) {
        //this.display = true;
        //this.currentWidget = widget;

        //BETTER WRITE CLEAN METHODS
        switch (type) {
            case 'customer':
                const cust_obj = {
                    'customer': '',
                    'customer_name': '',
                    'profile': '',
                    'profile_name': ''
                };
                const firstCust = this.tableJSON['customers'][0];
                if (firstCust && firstCust.customer.length > 1 || firstCust.profile.length > 1) {
                    this.tableJSON['customers'].unshift(cust_obj);
                    this.tableJSON['customers'] = [...this.tableJSON['customers']];
                } else {
                    this.notificationsService.error(
                        'Error',
                        'Should not allowed more than one empty row.',
                        {
                            timeOut: 1500,
                            pauseOnHover: true,
                            clickToClose: false,
                            maxLength: 0,
                            maxStack: 1
                        }
                    );
                }
                break;
            case 'chain':
                const chain_obj = {
                    'nat_chain': '',
                    'description': '',
                    'plant': '',
                    'profile': '',
                    'profile_name': ''
                };
                const firstChain = this.tableJSON['chains'][0];
                if (firstChain && firstChain.nat_chain.length > 1 || firstChain.profile.length > 1) {
                    this.tableJSON['chains'].unshift(chain_obj);
                    this.tableJSON['chains'] = [...this.tableJSON['chains']];
                } else {
                    this.notificationsService.error(
                        'Error',
                        'Should not allowed more than one empty row.',
                        {
                            timeOut: 1500,
                            pauseOnHover: true,
                            clickToClose: false,
                            maxLength: 0,
                            maxStack: 1
                        }
                    );
                }
                break;
            case 'group':
                const group_obj = {
                    'nat_group': '',
                    'nat_group_description': '',
                    'nat_subgroup': '',
                    'nat_subgroup_description': '',
                    'nat_region': '',
                    'nat_district': '',
                    'plant': '',
                    'profile': '',
                    'profile_name': ''
                };
                const firstGroup = this.tableJSON['groups'][0];
                if (firstGroup && firstGroup.nat_group.length > 1 || firstGroup.profile.length > 1) {
                    this.tableJSON['groups'].unshift(group_obj);
                    this.tableJSON['groups'] = [...this.tableJSON['groups']];
                } else {
                    this.notificationsService.error(
                        'Error',
                        'Should not allowed more than one empty row.',
                        {
                            timeOut: 1500,
                            pauseOnHover: true,
                            clickToClose: false,
                            maxLength: 0,
                            maxStack: 1
                        }
                    );
                }
                break;
            default:
        }


    }

    deleteSelectedRecs(type) {
        if (this.currentObj && this.currentObj[type]) {
            this.confirmationService.confirm({
                message: 'Are you sure that you want to perform this action?',
                accept: () => {
                    //Actual logic to perform a confirmation
                }
            });
        } else {
            this.notificationsService.info(
                ' Important Note ',
                'Should select at least one ' + type,
                {
                    timeOut: 1500,
                    pauseOnHover: true,
                    clickToClose: false,
                    maxLength: 0,
                    maxStack: 1
                }
            );
        }
    }

    onRowSelection(e, type) {
        if (this.currentObj[type]) {
            this.currentObj[type].push(e.data);
        } else {
            this.currentObj[type] = [];
        }

    }


    onRowUnselect(e, type) {

    }

    saveTable(type) {
        this.notificationsService.success(
            type,
             'Saved successfully.',
            {
                timeOut: 1500,
                pauseOnHover: true,
                clickToClose: false,
                maxLength: 0,
                maxStack: 1
            }
        );
    }

    recordSearch() {
        this.isDataAvailable = !this.isDataAvailable;
    }
}
