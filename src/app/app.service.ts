import {Injectable} from '@angular/core';

/* Should have specific file based on Environment */
@Injectable()
export class AppService {
    public static API_ENDPOINT = 'http://127.0.0.1:8081/api/dashboard/';
    public static version: string = '1.0.0/';
    public static port: string = ':8243/';

    public static ISM_DEV_ENDPOINT = 'http://ism-dev.app.dev-west.paas.mckesson.com/';

    //public static ISM_ENDPOINT = 'http://esswsddp02.mckesson.com' + API_ENDPOINT.port + API_ENDPOINT.version + 'ism/process/';

    public static ISM_ENDPOINT = 'http://esswsddp02.mckesson.com:8243/1.0.0/ism/process/';

    constructor() {
    }

};