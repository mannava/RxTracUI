import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../app.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProfileService {

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
};