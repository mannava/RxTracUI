import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';

import {DashboardComponent} from './dashboard/dashboard.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {TableListComponent} from './table-list/table-list.component';
import {TypographyComponent} from './typography/typography.component';
import {IconsComponent} from './icons/icons.component';
import {MapsComponent} from './maps/maps.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {UpgradeComponent} from './upgrade/upgrade.component';
import {HttpClientModule} from '@angular/common/http';
import {DashboardService} from './dashboard/dashboard.service';
import {
    AutoCompleteModule, DataTableModule, MultiSelectModule, PaginatorModule
} from 'primeng/primeng';
import {QueryBuilderModule} from 'angular2-query-builder';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReviewService} from './typography/typography.service';
import {ProfileService} from './maps/profile.servce';
import {TableModule} from 'primeng/table';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        UpgradeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        DataTableModule,
        QueryBuilderModule,
        PaginatorModule,
        AutoCompleteModule,
        TableModule,
        MultiSelectModule,
        BrowserAnimationsModule,
        SimpleNotificationsModule.forRoot(),

    ],

    providers: [DashboardService, ReviewService, ProfileService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
