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
    public isDataAvailable: any = false;
    public currentObj: object = {};
    public cust_tbl: any;
    public chain_tbl: any;
    public grp_tbl: any;

    public tableJSON: Object = {};

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
                if (data && data['responseCode'] === 500) {
                    this.notificationsService.error(
                        'Error',
                        'No matching Records Found',
                        {
                            timeOut: 1500,
                            pauseOnHover: true,
                            clickToClose: false,
                            maxLength: 0,
                            maxStack: 1
                        }
                    );
                    this.filteredCustomersSingle = [];
                    this.filteredChainsSingle = [];
                    this.filteredGroupsSingle = [];

                } else {
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

    onEditInit(e, type) {
        console.log(this.cust_tbl, this.chain_tbl, this.grp_tbl);
        console.log('init ', e.data, type);
    }

    OnEdit(e, type) {
        console.log('edit ', e, type);
    }

    OnEditComplete(e, type) {
        /*if (e && e.data) {
            this.currentObj[type] = e.data;
        }*/
        console.log('edit complete ', e, type);
    }

    onFocus(e, x, col) {
        console.log('foucs ', e, x, col);
    }

    OnEditCancel(e, type) {
        console.log('edit cancel ', e, type);
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
        if (!this.customer && !this.chain && !this.group) {
            this.notificationsService.error(
                'Error',
                'No content perform search',
                {
                    timeOut: 1500,
                    pauseOnHover: true,
                    clickToClose: false,
                    maxLength: 0,
                    maxStack: 1
                }
            );

        } else {
            const cust = this.customer && this.customer.desc;
            const chain = this.chain && this.chain.desc;
            const group = this.group && this.group.desc;

            this.profileService.searchQuery(cust, chain, group).subscribe(data => {
                this.tableJSON = data['results'];
                if (this.tableJSON) {
                    this.isDataAvailable = true;

                } else {
                    this.notificationsService.error(
                        'Server Error',
                        'same',
                        {
                            timeOut: 1500,
                            pauseOnHover: true,
                            clickToClose: false,
                            maxLength: 0,
                            maxStack: 1
                        }
                    );
                    this.isDataAvailable = false;
                }
                /* if (data && data.status === 'failure') {

                 } else {
                     this.isDataAvailable = true;
                 }*/

            });
            //this.isDataAvailable = !this.isDataAvailable ;
        }
    }
}
