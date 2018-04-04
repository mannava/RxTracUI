import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AppService} from '../app.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ReviewService {
    constructor(private http: HttpClient) {

    }

    public saveReview(username, comments, description) {

        return this.http.get(AppService.API_ENDPOINT + 'feedback/' + username + '/' + comments + '/' + description)
            .map((res: Response) => res)
            .catch
            ((error: any) => {
                return Observable.throw(error);
            });
    }

    handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
};


