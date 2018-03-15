import {Component, NgModule, OnInit, ViewEncapsulation} from '@angular/core';
import {DashboardService} from './dashboard.service';
import {CommonModule} from '@angular/common';
import {PaginatorModule} from 'primeng/primeng';
import {
    CellEditor,
    EditableColumn, ReorderableColumn, ReorderableRow, ReorderableRowHandle, ResizableColumn, RowToggler,
    ScrollableView, SelectableRow,
    SelectableRowDblClick,
    SortableColumn,
    SortIcon,
    Table, TableBody, TableCheckbox, TableHeaderCheckbox, TableModule, TableRadioButton
} from 'primeng/table';
import {SharedModule} from 'primeng/shared';
import {Dashboard} from "./dashboard.interface";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css',

    ]
})

export class DashboardComponent implements OnInit {
    public results: any;
    public cols: any[];
    dashboard: Dashboard[];

    constructor(private dashboardService: DashboardService) {
        this.getDashboardData();
        /*
        * <td>{{result["Txn Type"]}}|</td>
                <td>{{result["EI TimeStamp"]}}|</td>
                <td>{{result["Txn Id"]}}|</td>
                <td>{{result["Order ID"]}}|</td>
                <td>{{result["SAP Document Number"]}}|</td>
                <td>{{result["DCNUMBER"]}}|</td>
        * */

    }

    ngOnInit() {
        this.cols = [
            {field: 'Txn Type', header: 'TRANSACTION TYPE'},
            {field: 'EI TimeStamp', header: 'TIMESTAMP'},
            {field: 'Txn Id', header: 'TRANSACTION ID'},
            {field: 'Order ID', header: 'ORDER ID'},
            {field: 'SAP Document Number', header: 'SAP'},
            {field: 'DCNUMBER', header: 'DCNUMBER'}
        ];
    }

    getData(event, type) {
    }

    getDashboardData() {
        this.dashboardService.getDashboardData().subscribe(data => {
            this.results = data;
            console.log(this.results);
        });
    }
}


@NgModule({
    imports: [CommonModule, PaginatorModule, TableModule],
    exports: [Table, SharedModule, SortableColumn, SelectableRow, RowToggler,
        ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, SortIcon,
        TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick],
    declarations: [Table, SortableColumn, SelectableRow, RowToggler, ResizableColumn, ReorderableColumn, EditableColumn,
        CellEditor, TableBody, ScrollableView, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox,
        ReorderableRowHandle, ReorderableRow, SelectableRowDblClick]
})
export class DashboardModule {

}