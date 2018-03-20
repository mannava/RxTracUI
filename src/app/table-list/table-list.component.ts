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
            {field: 'EI_TRXN_TYPE', operator: '=', value: ''},
            {field: 'EI_TIMESTAMP', operator: '=', value: new Date()},
            {field: 'TRXN_ID', operator: '=', value: ''},
            {field: 'ORD_ID', operator: '=', value: ''},
            {field: 'SALESDOCNUM', operator: '=', value: ''},
            {field: 'DELIVERYDOCNUM', operator: '=', value: ''},
            {field: 'DCNUMBER', operator: '=', value: ''}
        ]
    };

    config: QueryBuilderConfig = {
        fields: {
            EI_TRXN_TYPE: {name: 'EI_TRXN_TYPE', type: 'string', operators: ['=', '!=', '<', '>', '<=', '>=']},
            EI_TIMESTAMP: {name: 'EI_TIMESTAMP', type: 'string', operators: ['=', '!=', '<', '>', '<=', '>='], defaultValue: (new Date())},
            TRXN_ID: {name: 'TRXN_ID', type: 'string', operators: ['=', '!=', '<', '>', '<=', '>=']},
            ORD_ID: {name: 'ORD_ID', type: 'string', operators: ['=', '!=', '<', '>', '<=', '>=']},
            SALESDOCNUM: {name: 'SALESDOCNUM', type: 'string', operators: ['=', '!=', '<', '>', '<=', '>=']},
            DELIVERYDOCNUM: {name: 'DELIVERYDOCNUM', type: 'string', operators: ['=', '!=', '<', '>', '<=', '>=']},
            DCNUMBER: {name: 'DCNUMBER', type: 'string', operators: ['=', '!=', '<', '>', '<=', '>=']}
        }
    };


    constructor() {
    }

    ngOnInit() {
    }


}
