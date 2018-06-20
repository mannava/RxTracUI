import {Injectable} from '@angular/core';

/* Should have specific file based on Environment */
@Injectable()
export class AppService {
    public static API_ENDPOINT = 'http://127.0.0.1:8081/api/dashboard/';
    public static version: string = '1.0.0/';
    public static port: string = ':8243/';

    constructor() {
    }

};