import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppService} from '../app.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProfileService {
    private headers: any;

    constructor(private http: HttpClient) {
    }

    public getDashboardData(card): Observable<Object> {
        return this.http.get(AppService.API_ENDPOINT + card)
            .map((res: Response) => res)
            .catch
            ((error: any) => {
                return Observable.throw(error);
            });
    }

    public getCustData(str, type): Observable<Object> {

        return this.http.get(AppService.ISM_ENDPOINT + type + '?searchstring=' + str + '&level=' + 1)
            .map((res: Response) => res)
            .catch
            ((error: any) => {
                return Observable.throw(error);
            });
    }

    public getProfile(str, type): Observable<Object> {

        return this.http.get(AppService.ISM_ENDPOINT + 'getProfile?operation=select&' + '?searchKey=' + str)
            .map((res: Response) => res)
            .catch
            ((error: any) => {
                return Observable.throw(error);
            });
    }
};