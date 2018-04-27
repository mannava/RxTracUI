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

    public getCustData(str, type, level = 1, group = '', subgroup = '', region = '', district = ''): Observable<Object> {

        return this.http.get(AppService.ISM_ENDPOINT + type + '?searchstring=' + str + '&level=' + level + '&group=' + group + '&subgroup=' + subgroup + '&region=' + region + '&district=' + district)
            .map((res: Response) => res)
            .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }

    public getProfile(str): Observable<Object> {

        return this.http.get(AppService.ISM_DEV_ENDPOINT + 'getProfile?operation=select&' + 'searchKey=' + str)
            .map((res: Response) => res)
            .catch((e: any) => Observable.throw(this.errorHandler(e)));
    }


    public searchQuery(customer = '', chain = '', group = ''): Observable<Object> {


        //http://esswsddp02.mckesson.com:8243/1.0.0/ism/process/customer/assignment?customer=0000000007,0000170173&chain=252,815&group=0230,0550,0392&operation=select


        return this.http.get(AppService.ISM_ENDPOINT + 'customer/assignment?customer=' + customer + '&chain=' + chain + '&group=' + group + '&operation=select')
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
