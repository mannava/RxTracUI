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

    public getCustData(str = '', type = '', level = 1, group = ''): Observable<Object> {

        this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8;', 'Accept': '*/*'});

        return this.http.get(AppService.ISM_ENDPOINT + type + '?searchstring=' + str + '&level=' + level + '&group=' + group)
            .map((res: Response) => res)
            .catch
            ((error: any) => {
                return Observable.throw(error);
            });
    }
};