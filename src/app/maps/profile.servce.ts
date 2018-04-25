import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppService} from '../app.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {NotificationsService} from 'angular2-notifications';

@Injectable()
export class ProfileService {
    private headers: any;

    constructor(private http: HttpClient, private notificationsService: NotificationsService) {
    }

    public getDashboardData(card): Observable<Object> {
        return this.http.get(AppService.API_ENDPOINT + card)
            .map((res: Response) => res)
            .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }

    public getCustData(str, type): Observable<Object> {

        return this.http.get(AppService.ISM_ENDPOINT + type + '?searchstring=' + str + '&level=' + 1)
            .map((res: Response) => res)
            .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }

    public getProfile(str, type): Observable<Object> {

        return this.http.get(AppService.ISM_ENDPOINT + 'getProfile?operation=select&' + '?searchKey=' + str)
            .map((res: Response) => res)
            .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }

    private errorHandler(error: any) {
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
