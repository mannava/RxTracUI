import {Component, OnInit} from '@angular/core';
import {QueryBuilderConfig} from 'angular2-query-builder';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

    query = {
        condition: 'and',
        rules: [
            {field: 'EI_TIMESTAMP', operator: '=', value: new Date()},
            /*{field: 'EI_TRXN_TYPE', operator: '=', value: ''},
            {field: 'TRXN_ID', operator: '=', value: ''},
            {field: 'ORD_ID', operator: '=', value: ''},
            {field: 'SALESDOCNUM', operator: '=', value: ''},
            {field: 'DELIVERYDOCNUM', operator: '=', value: ''},
            {field: 'DCNUMBER', operator: '=', value: ''}*/
        ]
    };

    config: QueryBuilderConfig = {
        fields: {

            EI_TIMESTAMP: {
                name: 'Timestamp',
                type: 'date',
                operators: ['=', '!=', '<', '>', '<=', '>='],
                defaultValue: (new Date())
            },
            EI_TRXN_TYPE: {
                name: 'Transaction Type',
                type: 'category',
                operators: ['=', '!=', '<', '>', '<=', '>='],
                defaultValue: 'connector',
                options: [
                    {name: 'CONNECTOR', value: 'connector'},
                    {name: 'EDI', value: 'edi'},
                    {name: 'ENT', value: 'ent'},
                    {name: 'SAP', value: 'sap'},
                    {name: 'ACUMAX', value: 'acumax'},
                    {name: 'DROPSHIP', value: 'dropship'}
                ]
            },
            TRXN_ID: {name: 'Transaction ID', type: 'string', operators: ['=', '!=', '<', '>', '<=', '>=']},
            ORD_ID: {name: 'Order ID', type: 'string', operators: ['=', '!=', '<', '>', '<=', '>=']},
            SALESDOCNUM: {name: 'Sales Document Number', type: 'string', operators: ['=', '!=', '<', '>', '<=', '>=']},
            DELIVERYDOCNUM: {
                name: 'Delivery Document Number',
                type: 'string',
                operators: ['=', '!=', '<', '>', '<=', '>=']
            },
            DCNUMBER: {name: 'DCU Number', type: 'string', operators: ['=', '!=', '<', '>', '<=', '>=']}
        }
    };


    constructor() {
    }

    ngOnInit() {
    }


}
