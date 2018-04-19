import {Component, OnInit} from '@angular/core';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
    {path: 'delayed-orders', title: 'Delayed Orders', icon: 'add_shopping_cart', class: ''},
    {path: 'search', title: 'Search', icon: 'search', class: ''},
    {path: 'reviews', title: 'Reviews/Feedback', icon: 'feedback', class: ''},
    {path: 'profile', title: 'Profile Management', icon: 'recent_actors', class: ''}
    /* { path: 'notifications', title: 'Notifications',  icon:'notifications', class: '' },
     { path: 'upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },*/
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
