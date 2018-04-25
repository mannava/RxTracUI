import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../app.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Dashboard} from './dashboard.interface';
import {NotificationsService} from "angular2-notifications";

@Injectable()
export class DashboardService {

    constructor(private http: HttpClient, private notificationsService: NotificationsService) {
    }

    public getDashboardData(card): Observable<Object> {
        return this.http.get(AppService.API_ENDPOINT + card)
            .map((res: Response) => res)
            .catch
            ((error: any) => {
                this.handleError(error);
            });
    }

    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        this.notificationsService.error(
            ' Server Error ',
            error.message,
            {
                timeOut: 1500,
                pauseOnHover: true,
                clickToClose: false,
                maxLength: 0,
                maxStack: 1
            }
        );
        return Observable.throw(errMsg);
    }
};