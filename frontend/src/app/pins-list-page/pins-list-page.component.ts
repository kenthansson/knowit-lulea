import {Component, OnInit, ViewChild} from '@angular/core';
import {PoiService} from "../services/poi.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Poi} from "../models/poi.model";

@Component({
    selector: 'app-pins-list-page',
    templateUrl: './pins-list-page.component.html',
    styleUrls: ['./pins-list-page.component.css'],

})

export class PinsListPageComponent implements OnInit {

    pois: Poi[] = [];

    dataSource: MatTableDataSource<Poi>;
    displayedColumns: string[] = ['name', 'description', 'lat', 'lng'];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private poiService: PoiService) {
        this.dataSource = new MatTableDataSource(this.pois);
    }

    ngOnInit(): void {
        this.poiService.getPois().subscribe((data: any) => {
            this.pois = data;
            this.dataSource = new MatTableDataSource(this.pois);
            //  this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
        });
    }

    deleteExpense(id: number) {
        this.poiService.deletePoi(id).subscribe(
            data => {
                console.log('deleted response', data);
                this.ngOnInit();
            }
        )
    }




}
