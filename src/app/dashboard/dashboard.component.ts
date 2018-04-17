import {Component, OnInit} from '@angular/core';
import {DashboardService} from './dashboard.service';
import {Dashboard} from './dashboard.interface';
import {NotificationsService} from 'angular2-notifications';
import * as _ from 'underscore';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    public results: any;
    public allCardsResults: any;
    public cols: any[];
    public result_set: Object = {
        'connect': [],
        'connect_orders': {'cnt': 0},

        'edi': [],
        'edi_orders': {'cnt': 0},

        'ent': [],
        'ent_orders': {'cnt': 0},
        'ent_deliveries': {'cnt': 0},

        'sap': [],
        'sap_orders': {'cnt': 0},
        'sap_deliveries': {'cnt': 0},

        'acx': [],
        'acx_orders': {'cnt': 0},
        'acx_deliveries': {'cnt': 0},

        'dropship': [],
        // 'dropship_orders': {'cnt': 0},
        'dropship_deliveries': {'cnt': 0}

    };
    animate: Boolean = false;

    dashboard: Dashboard[];
    currentTab: String = 'Connect Orders';
    focus: Object = {
        'Connect Orders': true,
        'EDI': false,
        'ENT Integration': false,
        'SAP': false,
        'ACUMAX': false,
        'DropShip': false,
        'Global': false
    };

    constructor(private dashboardService: DashboardService, private notificationsService: NotificationsService) {
        this.getDashboardData('all');
    }

    ngOnInit() {
        this.cols = [
            {field: 'Txn Type', header: 'TRANSACTION TYPE'},
            {field: 'EI TimeStamp', header: 'TIMESTAMP'},
            {field: 'Txn Id', header: 'TRANSACTION ID'},
            {field: 'Order ID', header: 'ORDER ID'},
            {field: 'SAP IDoc Num', header: 'SAP Sales Doc'},
            {field: 'DCNUMBER', header: 'DCNUMBER'},
            {field: 'SAP Delivery Number', header: 'SAP Delivery Number'},
        ];
    }

    getData(event, type, card) {
        // this.getDashboardData(card);

        if (card === 'dropship') {
            this.cols = [
                {field: 'vendor', header: 'VENDOR NAME'},
                {field: 'order_id', header: 'ORDER NUMBER'},
                {field: 'tracking_number', header: 'TRACKING NUMBER'},
                {field: 'timestamp', header: 'TIMESTAMP'}
            ];
            this.dropship_data.forEach(function (item, idx) {
                item['vendor'] = 'Allergan';
                item['order_id'] = Math.floor(Math.random() * (20099551 - 99999999 + 1) + 99999999);
                item['timestamp'] = new Date()//this.randomDate(new Date(2018, 03, 16), new Date());
                var track_num = Number(item['tracking_number']);
                if (isNaN(track_num)) {
                    item['shippment_type'] = 'https://wwwapps.ups.com/WebTracking/track?track=yes&trackNums=' + item['tracking_number'];
                } else {
                    item['shippment_type'] = 'https://www.fedex.com/apps/fedextrack/?tracknumbers=' + item['tracking_number'] + '&language=en&cntry_code=us';
                }

            });
            this.results = this.dropship_data;
        } else {
            this.cols = [
                {field: 'Txn Type', header: 'TRANSACTION TYPE'},
                {field: 'EI TimeStamp', header: 'TIMESTAMP'},
                {field: 'Txn Id', header: 'TRANSACTION ID'},
                {field: 'Order ID', header: 'ORDER ID'},
                {field: 'SAP IDoc Num', header: 'SAP Sales Doc'},
                {field: 'DCNUMBER', header: 'DCNUMBER'},
                {field: 'SAP Delivery Number', header: 'SAP Delivery Number'},
            ];
            this.results = this.result_set[card];
        }
        console.log(this.results);
        this.animate = true;
        for (const key in this.focus) {
            if (key === type) {
                this.focus[key] = true;
            } else {
                this.focus[key] = false;
            }
        }
        this.currentTab = type;
        event.stopPropagation();
    }

    getOrderCnt() {

        this.result_set['connect'] = _.where(this.allCardsResults, {'Txn Type': 'GATPSMOQSO'});

        this.result_set['connect_orders'] = _.countBy(this.result_set['connect'], function (item) {
            return (item['Order ID'] != null) ? 'cnt' : 'cnt';
        });

        this.result_set['edi'] = _.where(this.allCardsResults, {'Txn Type': 'EDIPO'});
        this.result_set['edi_orders'] = _.countBy(this.result_set['edi'], function (item) {
            return (item['Order ID'] != null) ? 'cnt' : 'cnt';
        });

        this.result_set['ent'] = _.where(this.allCardsResults, {'Txn Type': 'GATPSMOBSO'});
        this.result_set['ent_orders'] = _.countBy(this.result_set['ent'], function (item) {
            return (item['Order ID'] != null) ? 'cnt' : 'cnt';
        });
        this.result_set['ent_deliveries'] = _.countBy(this.result_set['edi'], function (item) {
            return (item['Delivery Number'] != null) ? 'cnt' : 'cnt';
        });

        this.result_set['sap'] = _.where(this.allCardsResults, {'Txn Type': 'EDIPO'});
        this.result_set['sap_orders'] = _.countBy(this.result_set['sap'], function (item) {
            return (item['Order ID'] != null) ? 'cnt' : 'cnt';
        });
        this.result_set['sap_deliveries'] = _.countBy(this.result_set['sap'], function (item) {
            return (item['Delivery Number'] != null) ? 'cnt' : 'cnt';
        });

        this.result_set['acx'] = _.where(this.allCardsResults, {'Txn Type': 'EDIPO'});
        this.result_set['acx_deliveries'] = _.countBy(this.result_set['acx'], function (item) {
            return (item['Delivery Number'] != null) ? 'cnt' : 'cnt';
        });

        this.result_set['dropship'] = _.where(this.allCardsResults, {'Txn Type': 'EDIPO'});
        this.result_set['dropship_deliveries'] = _.countBy(this.result_set['dropship'], function (item) {
            return (item['Delivery Number'] != null) ? 'cnt' : 'cnt';
        });
    }


    getDashboardData(card) {
        this.dashboardService.getDashboardData(card).subscribe(data => {
            this.allCardsResults = data;
            this.allCardsResults.forEach(function (item, idx) {
                if (!item['SAP IDoc Num']) {
                    item['SAP IDoc Num'] = Math.floor(Math.random() * (4313897986 - 1313890000 + 1) + 1313890000);
                }
            });
            this.allCardsResults.forEach(function (item, idx) {
                if (!item['SAP Delivery Number']) {
                    item['SAP Delivery Number'] = Math.floor(Math.random() * (6700128015 - 1700128015 + 1) + 1700128015);
                }
            });

            this.allCardsResults.forEach(function (item, idx) {
                if (!item['DCNUMBER']) {
                    item['DCNUMBER'] = Math.floor(Math.random() * (8900 - 1000 + 1) + 1000);
                }
            });
            this.results = data;
            this.getOrderCnt();
        });
    }

    randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }


    removeFocus() {
        this.results = this.allCardsResults;
        this.animate = false;
        this.notificationsService.info(
            'All cards are selected.',
            'Switched to Global.',
            {
                timeOut: 1500,
                pauseOnHover: true,
                clickToClose: false,
                maxLength: 0,
                maxStack: 1
            }
        );
        for (const key in this.focus) {
            this.focus[key] = false;
        }
        this.currentTab = 'Global';
    }

    //temporary variable for demo;
    public dropship_data = [
        {'tracking_number': '729180817120'},
        {'tracking_number': '780238504093'},
        {'tracking_number': '780247019498'},
        {'tracking_number': '780238515609'},
        {'tracking_number': '780245026784'},
        {'tracking_number': '780247039798'},
        {'tracking_number': '780252757420'},
        {'tracking_number': '1Z9745W82910711100'},
        {'tracking_number': '780238505744'},
        {'tracking_number': '780241370349'},
        {'tracking_number': '780238508490'},
        {'tracking_number': '780241371985'},
        {'tracking_number': '780238488781'},
        {'tracking_number': '1Z9745W92933613841'},
        {'tracking_number': '1Z9745W92926083455'},
        {'tracking_number': '1Z9745W92932592312'},
        {'tracking_number': '1Z9745W92924215333'},
        {'tracking_number': '1Z9745W92938025941'},
        {'tracking_number': '1Z9745W92927007606'},
        {'tracking_number': '1Z9745W92907855808'},
        {'tracking_number': '1Z9745W92937878915'},
        {'tracking_number': '1Z9745W92926223419'},
        {'tracking_number': '1Z9745W92927306024'},
        {'tracking_number': '780244938330'},
        {'tracking_number': '780238465195'},
        {'tracking_number': '1Z9745W92928047400'},
        {'tracking_number': '1Z9745W92905657606'},
        {'tracking_number': '1Z9745W92926520571'},
        {'tracking_number': '1Z9745W92924180586'},
        {'tracking_number': '1Z9745W92929593970'},
        {'tracking_number': '1Z9745W92927988502'},
        {'tracking_number': '780254477107'},
        {'tracking_number': '780238511095'},
        {'tracking_number': '780238493964'},
        {'tracking_number': '780247035060'},
        {'tracking_number': '780238494310'},
        {'tracking_number': '780238465335'},
        {'tracking_number': '780238465655'},
        {'tracking_number': '780238502734'},
        {'tracking_number': '780245008969'},
        {'tracking_number': '780238506372'},
        {'tracking_number': '780238505505'},
        {'tracking_number': '780245006613'},
        {'tracking_number': '780247016889'},
        {'tracking_number': '780249112867'},
        {'tracking_number': '780241374870'},
        {'tracking_number': '780238495691'},
        {'tracking_number': '780238511257'},
        {'tracking_number': '780238504564'},
        {'tracking_number': '780238503719'},
        {'tracking_number': '780250980215'},
        {'tracking_number': '780252787228'},
        {'tracking_number': '780252787548'},
        {'tracking_number': '780254454908'},
        {'tracking_number': '1Z9745W82930974923'},
        {'tracking_number': '1Z9745W82919434617'},
        {'tracking_number': '1Z9745W82900181121'},
        {'tracking_number': '1Z9745W82914521737'},
        {'tracking_number': '1Z9745W82911045347'},
        {'tracking_number': '1Z9745W82904651955'},
        {'tracking_number': '1Z9745W82900241566'},
        {'tracking_number': '1Z9745W82912714176'},
        {'tracking_number': '1Z9745W82906969789'},
        {'tracking_number': '1Z9745W82927212083'},
        {'tracking_number': '1Z9745W82926266269'},
        {'tracking_number': '1Z9745W82906763938'},
        {'tracking_number': '1Z9745W82939106845'},
        {'tracking_number': '1Z9745W82934432135'},
        {'tracking_number': '1Z9745W82939647949'},
        {'tracking_number': '1Z9745W82927298358'},
        {'tracking_number': '1Z9745W82924219368'},
        {'tracking_number': '1Z9745W82929006972'},
        {'tracking_number': '1Z9745W82933617189'},
        {'tracking_number': '1Z9745W82920965998'},
        {'tracking_number': '1Z9745W82938529408'},
        {'tracking_number': '1Z9745W82927943418'},
        {'tracking_number': '1Z9745W82930604028'},
        {'tracking_number': '1Z9745W82929267235'},
        {'tracking_number': '1Z9745W82925649044'},
        {'tracking_number': '1Z9745W82916956818'},
        {'tracking_number': '780249104940'},
        {'tracking_number': '729180817142'},
        {'tracking_number': '1Z9745W82908283051'},
        {'tracking_number': '1Z9745W82915590885'},
        {'tracking_number': '1Z9745W82904045717'},
        {'tracking_number': '1Z9745W82910430002'},
        {'tracking_number': '1Z9745W82913202664'},
        {'tracking_number': '1Z9745W82904346446'},
        {'tracking_number': '1Z9745W82934038660'},
        {'tracking_number': '780249105085'},
        {'tracking_number': '780238466103'},
        {'tracking_number': '780238466651'},
        {'tracking_number': '1Z9745W82916051876'},
        {'tracking_number': '780250999912'},
        {'tracking_number': '780251021733'},
        {'tracking_number': '780238511522'},
        {'tracking_number': '780249135445'},
        {'tracking_number': '1Z9745W92930083161'},
        {'tracking_number': '780238491994'},
        {'tracking_number': '1Z9745W92904656609'},
        {'tracking_number': '780238494607'},
        {'tracking_number': '780243116030'},
        {'tracking_number': '780254478490'},
        {'tracking_number': '729180817197'},
        {'tracking_number': '780238510022'},
        {'tracking_number': '780238492464'},
        {'tracking_number': '780238493254'},
        {'tracking_number': '780247021215'},
        {'tracking_number': '780238515892'},
        {'tracking_number': '780238503064'},
        {'tracking_number': '780244935022'},
        {'tracking_number': '780252789816'},
        {'tracking_number': '780251008770'},
        {'tracking_number': '780254479246'},
        {'tracking_number': '780254454091'},
        {'tracking_number': '780254458454'},
        {'tracking_number': '780254477380'},
        {'tracking_number': '780238492041'},
        {'tracking_number': '1Z9745W92930316043'},
        {'tracking_number': '1Z9745W92924091780'},
        {'tracking_number': '780243101081'},
        {'tracking_number': '780238490174'},
        {'tracking_number': '780238508537'},
        {'tracking_number': '780249103050'},
        {'tracking_number': '780247018388'},
        {'tracking_number': '1Z9745W92901271619'},
        {'tracking_number': '780238493770'},
        {'tracking_number': '780249107250'},
        {'tracking_number': '780238490483'},
        {'tracking_number': '780247036192'},
        {'tracking_number': '1Z9745W92910470771'},
        {'tracking_number': '1Z9745W92901255780'},
        {'tracking_number': '1Z9745W92922737630'},
        {'tracking_number': '780238500640'},
        {'tracking_number': '1Z9745W92939954070'},
        {'tracking_number': '780238466283'},
        {'tracking_number': '780238500124'},
        {'tracking_number': '1Z9745W92906231055'},
        {'tracking_number': '1Z9745W92915177044'},
        {'tracking_number': '1Z9745W92910176947'},
        {'tracking_number': '780252769674'},
        {'tracking_number': '1Z9745W92928348639'},
        {'tracking_number': '780252782145'},
        {'tracking_number': '780254479853'},
        {'tracking_number': '780254470205'},
        {'tracking_number': '1Z9745W92907773870'},
        {'tracking_number': '1Z9745W92926256296'},
        {'tracking_number': '1Z9745W92934607561'},
        {'tracking_number': '1Z9745W92938225403'},
        {'tracking_number': '1Z9745W92931647381'},
        {'tracking_number': '1Z9745W92921099019'},
        {'tracking_number': '1Z9745W92938248737'},
        {'tracking_number': '1Z9745W92908896361'},
        {'tracking_number': '1Z9745W92923047857'},
        {'tracking_number': '1Z9745W92435389804'},
        {'tracking_number': '1Z9745W92903670818'},
        {'tracking_number': '1Z9745W92936415434'},
        {'tracking_number': '1Z9745W92921425175'},
        {'tracking_number': '1Z9745W92904471219'},
        {'tracking_number': '1Z9745W92917050793'},
        {'tracking_number': '1Z9745W92908296563'},
        {'tracking_number': '1Z9745W92919131031'},
        {'tracking_number': '1Z9745W92920324991'},
        {'tracking_number': '1Z9745W92925604330'},
        {'tracking_number': '1Z9745W92906857684'},
        {'tracking_number': '1Z9745W92931362778'},
        {'tracking_number': '1Z9745W92904552695'},
        {'tracking_number': '1Z9745W92906173314'},
        {'tracking_number': '1Z9745W92912232051'},
        {'tracking_number': '1Z9745W92914658384'},
        {'tracking_number': '1Z9745W92417257703'},
        {'tracking_number': '780254451059'},
        {'tracking_number': '780254448762'},
        {'tracking_number': '780238494560'},
        {'tracking_number': '780238488200'},
        {'tracking_number': '780238488200'},
        {'tracking_number': '780249109312'},
        {'tracking_number': '780238510700'},
        {'tracking_number': '780252749970'},
        {'tracking_number': '780238490141'},
        {'tracking_number': '780245011494'},
        {'tracking_number': '780238501690'},
        {'tracking_number': '780238512780'},
        {'tracking_number': '780249140764'},
        {'tracking_number': '780241382170'},
        {'tracking_number': '780241382868'},
        {'tracking_number': '780238502311'},
        {'tracking_number': '780245008097'},
        {'tracking_number': '780238504520'},
        {'tracking_number': '780252662471'},
        {'tracking_number': '780243101920'},
        {'tracking_number': '780249103715'},
        {'tracking_number': '780249124404'},
        {'tracking_number': '1Z9745W92416056002'},
        {'tracking_number': '780254455374'},
        {'tracking_number': '780254456727'},
        {'tracking_number': '1Z9745W92926618243'},
        {'tracking_number': '1Z9745W92933827129'},
        {'tracking_number': '1Z9745W92925684923'},
        {'tracking_number': '1Z9745W92911433256'},
        {'tracking_number': '1Z9745W92910178543'},
        {'tracking_number': '1Z9745W92919498324'},
        {'tracking_number': '1Z9745W92917833330'},
        {'tracking_number': '1Z9745W92931300807'},
        {'tracking_number': '780238510158'},
        {'tracking_number': '780238495408'},
        {'tracking_number': '780247026283'},
        {'tracking_number': '780238512460'},
        {'tracking_number': '1Z9745W82909292209'},
        {'tracking_number': '1Z9745W82927194899'},
        {'tracking_number': '1Z9745W82935832308'},
        {'tracking_number': '1Z9745W82925160311'},
        {'tracking_number': '1Z9745W82912859494'},
        {'tracking_number': '780251020830'},
        {'tracking_number': '780238499447'},
        {'tracking_number': '780238487888'},
        {'tracking_number': '780238502171'},
        {'tracking_number': '780238505917'},
        {'tracking_number': '780238508971'},
        {'tracking_number': '780247040151'},
        {'tracking_number': '729180820469'},
        {'tracking_number': '780250994347'},
        {'tracking_number': '780252762544'},
        {'tracking_number': '780238464269'},
        {'tracking_number': '780238512194'},
        {'tracking_number': '780252788577'},
        {'tracking_number': '780254476409'},
        {'tracking_number': '729180817131'},
        {'tracking_number': '780238497352'},
        {'tracking_number': '780249109930'},
        {'tracking_number': '780238511474'},
        {'tracking_number': '780238501793'},
        {'tracking_number': '780239963310'},
        {'tracking_number': '780238502300'},
        {'tracking_number': '780252784733'},
        {'tracking_number': '780254449460'},
        {'tracking_number': '729180817186'},
        {'tracking_number': '780238507644'},
        {'tracking_number': '780243107355'},
        {'tracking_number': '780238464913'},
        {'tracking_number': '780238504266'},
        {'tracking_number': '780238492512'},
        {'tracking_number': '780238915713'},
        {'tracking_number': '1Z9745W92936930903'},
        {'tracking_number': '1Z9745W92934754518'},
        {'tracking_number': '1Z9745W92914695763'},
        {'tracking_number': '1Z9745W92917856682'},
        {'tracking_number': '780252782134'},
        {'tracking_number': '780252749710'},
        {'tracking_number': '1Z9745W9292203441'},
        {'tracking_number': '780252759456'},
        {'tracking_number': '1Z9745W9290889886'},
        {'tracking_number': '729180817175'},
        {'tracking_number': '1Z9745W9292896382'},
        {'tracking_number': '1Z9745W9293714272'},
        {'tracking_number': '1Z9745W9292953895'},
        {'tracking_number': '1Z9745W9293863068'},
        {'tracking_number': '1Z9745W9292211934'},
        {'tracking_number': '1Z9745W9290393075'},
        {'tracking_number': '1Z9745W9292951494'},
        {'tracking_number': '1Z9745W9293993262'},
        {'tracking_number': '780244934872'},
        {'tracking_number': '1Z9745W9293386121'},
        {'tracking_number': '1Z9745W9291317824'},
        {'tracking_number': '1Z9745W9290209846'},
        {'tracking_number': '1Z9745W9293956551'},
        {'tracking_number': '780243109472'},
        {'tracking_number': '780238492100'},
        {'tracking_number': '780238492784'},
        {'tracking_number': '780238492567'},
        {'tracking_number': '780238510559'},
        {'tracking_number': '780241377148'},
        {'tracking_number': '780243103121'},
        {'tracking_number': '780238500190'},
        {'tracking_number': '780238512003'},
        {'tracking_number': '729180820057'},
        {'tracking_number': '780252756001'},
        {'tracking_number': '780250932989'},
        {'tracking_number': '780250932989'},
        {'tracking_number': '780254459998'},
        {'tracking_number': '780254482390'},
        {'tracking_number': '780254463453'}];
}