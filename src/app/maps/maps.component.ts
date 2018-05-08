import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ProfileService} from './profile.servce';
import {NotificationsService} from 'angular2-notifications';
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css'],
    providers: [ConfirmationService],
    encapsulation: ViewEncapsulation.None
})
export class MapsComponent implements OnInit {
    @ViewChild('dt', {read: ElementRef}) dt: ElementRef;
    public customer: any;
    public chain: any;
    public group: any;

    public filteredChainsISM: any;
    public filteredCustomersISM: any;
    public filteredGroupsISM: any;
    public filteredProfile: any;
    public isDataAvailable: any = false;

    public isEditable_prime: Boolean = false;
    public tableJSON: Object = {};
    public customer_tag = 'customer';
    public chain_tag = 'chain';
    public group_tag = 'group';
    public customers_tag = 'customers';
    public chains_tag = 'chains';
    public groups_tag = 'groups';
    public selectedItems: any = {};

    constructor(private profileService: ProfileService, private notificationsService: NotificationsService, private confirmationService: ConfirmationService) {
    }

    filterProfile(event) {
        const comp = event.originalEvent.target;
        comp.style = 'border-color:none;color:none';
        const query = event.query;
        if (query && query.length > 0) {
            this.profileService.getProfile(query).subscribe(data => {
                if (data && data['responseCode'] === 500) {
                    comp.style = 'border-color:red;color:red';
                    this.showNotification('Error', 'Does not match with any profile.');
                    this.filteredCustomersISM = [];
                    this.filteredChainsISM = [];
                    this.filteredGroupsISM = [];

                } else {
                    this.filteredProfile = data['results'];
                    this.filteredProfile.forEach(function (item) {
                        item['profile_desc'] = item.profile + ' - ' + item.description;
                    });
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
                    this.showNotification('Error', 'Does not match with any ' + type);
                    this.filteredCustomersISM = [];
                    this.filteredChainsISM = [];
                    this.filteredGroupsISM = [];

                } else {
                    switch (type) {
                        case this.customer_tag:
                            this.filteredCustomersISM = data['results'];
                            break;
                        case this.chain_tag:
                            this.filteredChainsISM = data['results'];
                            break;
                        case this.group_tag:
                            this.filteredGroupsISM = data['results'];
                            break;
                        default:
                    }
                }
            });
        }
    }


    ngOnInit() {
    }

    onFocusEnter(e, field) {
        if (!field || field === '[object, Object]') {
            field = '';
        }
        const target = e.target || e.srcElement || e.currentTarget;
        target.value = field;
    }

    onSelectAC(acObj, childObj, attr, tableRow, tag = this.groups_tag) {
        const cnt = 0;
        this.tableJSON[tag].forEach(function (item) {
            if (item[attr] === acObj['desc']) {
                cnt++;
            }
        });

        if (cnt === 0) {
            tableRow[attr] = acObj.desc;
            tableRow['description'] = acObj.label;
            tableRow[childObj] = acObj.desc + ' - ' + acObj.label;
            this.dt.nativeElement.click();
        } else {
            this.showNotification('Duplicate row', tableRow[attr] + ' already selected.');
            tableRow[attr] = '';
            tableRow['description'] = '';
            tableRow[childObj] = '';
            this.dt.nativeElement.click();
        }

    }

    onSelectProfile(acObj, childObj, attr, tableRow) {
        tableRow[attr] = acObj.profile;
        tableRow['description'] = acObj.description;
        tableRow[childObj] = acObj.profile + ' - ' + acObj.description;
        this.dt.nativeElement.click();
    }

    addNew(type) {
        switch (type) {
            case this.customer_tag:
                const cust_obj = {
                    'customer': '',
                    'customer_name': '',
                    'profile': '',
                    'profile_name': '',
                    'cust_desc': '',
                    'editable_prime': true

                };
                const firstCust = this.tableJSON[this.customers_tag][0];
                if (!firstCust) {
                    this.tableJSON[this.customers_tag].unshift(cust_obj);
                    this.tableJSON[this.customers_tag] = [...this.tableJSON[this.customers_tag]];
                } else {
                    if (firstCust.nat_customer.length > 1) {
                        this.tableJSON[this.customers_tag].unshift(cust_obj);
                        this.tableJSON[this.customers_tag] = [...this.tableJSON[this.customers_tag]];
                    } else {
                        this.showNotification('Error at ' + type + ' table addition', 'More than one blank row is not allowed.');
                    }
                }
                break;
            case this.chain_tag:
                const chain_obj = {
                    'nat_chain': '',
                    'description': '',
                    'plant': '',
                    'profile': '',
                    'profile_name': '',
                    'editable_prime': true
                };
                const firstChain = this.tableJSON[this.chains_tag][0];
                if (!firstChain) {
                    this.tableJSON[this.chains_tag].unshift(chain_obj);
                    this.tableJSON[this.chains_tag] = [...this.tableJSON[this.chains_tag]];
                } else {
                    if (firstChain.nat_chain.length > 1) {
                        this.tableJSON[this.chains_tag].unshift(chain_obj);
                        this.tableJSON[this.chains_tag] = [...this.tableJSON[this.chains_tag]];
                    } else {
                        this.showNotification('Error at ' + type + ' table addition', 'More than one blank row is not allowed.');
                    }
                }
                break;
            case this.group_tag:
                const group_obj = {
                    'nat_group': '',
                    'nat_group_description': '',
                    'nat_subgroup': '',
                    'nat_subgroup_description': '',
                    'nat_region': '',
                    'nat_district': '',
                    'plant': '',
                    'profile': '',
                    'profile_name': '',
                    'editable_prime': true
                };
                const firstGroup = this.tableJSON[this.groups_tag][0];
                if (!firstGroup) {
                    this.tableJSON[this.groups_tag].unshift(group_obj);
                    this.tableJSON[this.groups_tag] = [...this.tableJSON[this.groups_tag]];
                } else {
                    if (firstGroup.nat_group.length > 1) {
                        this.tableJSON[this.groups_tag].unshift(group_obj);
                        this.tableJSON[this.groups_tag] = [...this.tableJSON[this.groups_tag]];
                    } else {
                        this.showNotification('Error at ' + type + ' table addition', 'More than one blank row is not allowed.');
                    }
                }
                break;
            default:
        }


    }

    deleteSelectedRecs(type, rec) {
        if (this.selectedItems[type] && this.selectedItems[type].length > 0) {
            if (confirm('Confirm OK to delete')) {
                const self = this.selectedItems[type];
                const tbl = this.tableJSON[type];
                this.tableJSON[type].forEach(function (item, idx) {
                    if (self.indexOf(item[rec]) !== -1) {
                        tbl.splice(idx, 1);
                    }
                });
                this.tableJSON[type] = tbl;
                this.tableJSON[type] = [...this.tableJSON[type]];
                this.selectedItems[type] = [];
            }
        } else {
            this.showNotification(' Important Note ', 'Should select at least one ' + type);
        }
    }

    onRowSelection(e, type, rec) {
        if (this.selectedItems[type]) {
            this.selectedItems[type].push(e.data[rec]);
        } else {
            this.selectedItems[type] = [];
            this.selectedItems[type].push(e.data[rec]);
        }
    }

    onRowClick(e, type) {
        this.isEditable_prime = e.data.editable_prime;
    }

    onRowUnselect(e, type, rec) {
        this.selectedItems[type].splice(this.selectedItems[type].indexOf(e.data[rec]), 1);
    }

    saveTable(type) {
        this.showNotification(type, 'Saved successfully.', 'success');
    }

    showNotification(title, content, type = 'error') {

        switch (type) {
            case 'warn':
                this.notificationsService.warn(
                    title,
                    content,
                    {
                        timeOut: 2000,
                        pauseOnHover: true,
                        clickToClose: false,
                        maxLength: 0,
                        maxStack: 1
                    }
                );
                break;
            case 'error':
                this.notificationsService.error(
                    title,
                    content,
                    {
                        timeOut: 2000,
                        pauseOnHover: true,
                        clickToClose: false,
                        maxLength: 0,
                        maxStack: 1
                    }
                );
                break;
            case 'info':
                this.notificationsService.info(
                    title,
                    content,
                    {
                        timeOut: 2000,
                        pauseOnHover: true,
                        clickToClose: false,
                        maxLength: 0,
                        maxStack: 1
                    }
                );
                break;
            default:
                this.notificationsService.success(
                    title,
                    content,
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

    recordSearch() {
        if (!this.customer && !this.chain && !this.group) {
            this.showNotification('Error', 'Enter content to perform search');

        } else {
            let customer, chain, group;
            customer = (this.customer && this.customer['desc']) ? this.customer['desc'] : this.customer;


            chain = (this.chain && this.chain['desc']) ? this.chain['desc'] : this.chain;

            group = (this.group && this.group['desc']) ? this.group['desc'] : this.group;

            this.profileService.searchQuery(customer, chain, group).subscribe(data => {
                if (data && data['responseCode'] === 500) {
                    this.showNotification('Server Error', data['message']);
                    this.filteredCustomersISM = [];
                    this.filteredChainsISM = [];
                    this.filteredGroupsISM = [];

                } else {
                    this.tableJSON = data['results'];
                    if (this.tableJSON) {
                        this.isDataAvailable = true;
                        if (this.tableJSON[this.customers_tag].length > 1) {
                            this.tableJSON[this.customers_tag].forEach(function (item) {
                                item['cust_desc'] = item.customer + ' - ' + item.customer_name;
                                item['profile_desc'] = item.profile + ' - ' + item.profile_name;
                                item['editable_prime'] = false;
                            });
                        }
                        if (this.tableJSON[this.chains_tag].length > 0) {
                            this.tableJSON[this.chains_tag].forEach(function (item) {
                                item['chain_desc'] = item.nat_chain + ' - ' + item.description;
                                item['profile_desc'] = item.profile + ' - ' + item.profile_name;
                                item['editable_prime'] = false;
                            });
                        }
                        if (this.tableJSON[this.groups_tag].length > 0) {
                            this.tableJSON[this.groups_tag].forEach(function (item) {
                                item['group_desc'] = item.nat_group + ' - ' + item.nat_group_description;
                                item['subgroup_desc'] = item.nat_subgroup + ' - ' + item.nat_subgroup_description;
                                item['region_desc'] = item.nat_region + ' - ' + item.nat_region_description;
                                item['district_desc'] = item.nat_district + ' - ' + item.nat_district_description;
                                item['profile_desc'] = item.profile + ' - ' + item.profile_name;
                                item['editable_prime'] = false;
                            });
                        }

                    } else {
                        this.showNotification('Server Error', '');
                        this.isDataAvailable = false;
                    }
                }

            });
        }
    }
}
