import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
    public customer: any;
    public chain: any;
    public group: any;

    public filteredChainsISM: any;
    public filteredCustomersISM: any;
    public filteredGroupsISM: any;
    public filteredProfile: any;
    public isDataAvailable: any = false;
    public currentObj: object = {};

    public tableJSON: Object = {};

    constructor(private profileService: ProfileService, private notificationsService: NotificationsService, private confirmationService: ConfirmationService) {
    }

    filterResult(query, results: any): any {
        const filtered: any[] = [];
        for (let i = 0; i < results.length; i++) {
            filtered.push(results[i]);
        }
        return filtered;
    }

    filterProfile(event) {
        const comp = event.originalEvent.target;
        comp.style = 'border-color:none;color:none';
        const query = event.query;
        if (query && query.length > 0) {
            this.profileService.getProfile(query).subscribe(data => {
                if (data && data['responseCode'] === 500) {
                    comp.style = 'border-color:red;color:red';
                    this.notificationsService.error(
                        'Error',
                        'Does not match with any profile.',
                        {
                            timeOut: 2000,
                            pauseOnHover: true,
                            clickToClose: false,
                            maxLength: 0,
                            maxStack: 1
                        }
                    );
                    this.filteredCustomersISM = [];
                    this.filteredChainsISM = [];
                    this.filteredGroupsISM = [];

                } else {
                    const result = data['results'][0]['programs'];
                    this.filteredProfile = result;
                }
            });
        }
    }

    filterISM(event, type, level = 1, group = '', subgroup = '', region = '', district = '') {
        const comp = event.originalEvent.target;
        comp.style = 'border-color:none;color:none';
        const query = event.query;
        if (query && query.length > 2) {
            this.profileService.getCustData(query, type, level, group).subscribe(data => {
                if (data && data['responseCode'] === 500) {
                    comp.style = 'border-color:red;color:red';
                    this.notificationsService.error(
                        'Error',
                        'Does not match with any ' + type,
                        {
                            timeOut: 2000,
                            pauseOnHover: true,
                            clickToClose: false,
                            maxLength: 0,
                            maxStack: 1
                        }
                    );
                    this.filteredCustomersISM = [];
                    this.filteredChainsISM = [];
                    this.filteredGroupsISM = [];

                } else {
                    switch (type) {
                        case 'customer':
                            this.filteredCustomersISM = data['results'];
                            break;
                        case 'chain':
                            this.filteredChainsISM = data['results'];
                            break;
                        case 'group':
                            this.filteredGroupsISM = data['results'];
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
    }

    OnEdit(e, type) {
    }

    OnEditComplete(e, type) {
    }

    onFocusEnter(e, field) {
        //console.log('focusentry', e.target, field);
        const target = e.target || e.srcElement || e.currentTarget;
        target.value = field;
    }

    OnEditCancel(e, type) {
        //console.log('edit cancel ', e, type);
    }

    onSelectAC(acObj, childObj, attr, tableRow) {
        tableRow[attr] = acObj.desc;
        tableRow['description'] = acObj.label;
        tableRow[childObj] = acObj.desc + ' - ' + acObj.label;
        console.log(tableRow);
    }

    addNew(type) {
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
                            timeOut: 2000,
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
                            timeOut: 2000,
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
                            timeOut: 2000,
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
                    timeOut: 2000,
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
                timeOut: 2000,
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
                'Enter content to perform search',
                {
                    timeOut: 2000,
                    pauseOnHover: true,
                    clickToClose: false,
                    maxLength: 0,
                    maxStack: 1
                }
            );

        } else {
            let customer, chain, group;
            customer = (this.customer && this.customer['desc']) ? this.customer['desc'] : this.customer;


            chain = (this.chain && this.chain['desc']) ? this.chain['desc'] : this.chain;

            group = (this.group && this.group['desc']) ? this.group['desc'] : this.group;

            this.profileService.searchQuery(customer, chain, group).subscribe(data => {
                if (data && data['responseCode'] === 500) {
                    this.notificationsService.error(
                        'Server Error',
                        data['message'],
                        {
                            timeOut: 2000,
                            pauseOnHover: true,
                            clickToClose: false,
                            maxLength: 0,
                            maxStack: 1
                        }
                    );
                    this.filteredCustomersISM = [];
                    this.filteredChainsISM = [];
                    this.filteredGroupsISM = [];

                } else {
                    this.tableJSON = data['results'];
                    if (this.tableJSON) {
                        this.isDataAvailable = true;
                        if (this.tableJSON['customers'].length > 0) {
                            this.tableJSON['customers'].forEach(function (item) {
                                item['cust_desc'] = item.customer + ' - ' + item.desc;
                            });
                        }
                        if (this.tableJSON['chains'].length > 0) {
                            this.tableJSON['chains'].forEach(function (item) {
                                item['chain_desc'] = item.nat_chain + ' - ' + item.description;
                            });
                        }
                        if (this.tableJSON['groups'].length > 0) {
                            this.tableJSON['groups'].forEach(function (item) {
                                item['group_desc'] = item.nat_group + ' - ' + item.nat_group_description;
                                item['subgroup_desc'] = item.nat_subgroup + ' - ' + item.nat_subgroup_description;
                                item['region_desc'] = item.nat_region + ' - ' + item.nat_region_description;
                                item['district_desc'] = item.nat_district + ' - ' + item.nat_district_description;
                            });
                        }

                    } else {
                        this.notificationsService.error(
                            'Server Error',
                            'same',
                            {
                                timeOut: 2000,
                                pauseOnHover: true,
                                clickToClose: false,
                                maxLength: 0,
                                maxStack: 1
                            }
                        );
                        this.isDataAvailable = false;
                    }
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
