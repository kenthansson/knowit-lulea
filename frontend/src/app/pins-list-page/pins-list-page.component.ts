import {Component, OnInit, ViewChild} from '@angular/core';
import {PoiService} from "../services/poi.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Poi} from "../models/poi.model";
import {MatDialog} from "@angular/material/dialog";
import {PinsEditDialogComponent} from "./pins-list-form/pins-edit-dialog.component";

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

    constructor(private poiService: PoiService, private dialog: MatDialog) {
        this.dataSource = new MatTableDataSource(this.pois);
    }

    ngOnInit(): void {
        this.loadPois();
    }

    loadPois() {
        this.poiService.listPois().subscribe((data: Poi[]) => {
            this.pois = data;
            this.dataSource = new MatTableDataSource(this.pois);
            this.dataSource.paginator = this.paginator;
        });
    }

    deletePoi(id: number) {
        this.poiService.deletePoi(id).subscribe(
            data => {
                console.log('deleted response', data);
                this.ngOnInit();
            }
        )
    }


    editPoi(poi: Poi) {
        const dialogRef = this.dialog.open(PinsEditDialogComponent, {
            data: {poi},
        });

        dialogRef.afterClosed().subscribe((result: Poi) => {
            if (result && result.id !== undefined) {
                this.updatePoi(result.id, result);
            }
        });
    }


    updatePoi(id: number, updatedPoi: Poi) {
        this.poiService.updatePoi(id, updatedPoi).subscribe(
            (data: Poi) => {
                console.log('Updated response', data);
                this.loadPois(); // Reload the list of POIs after update
            },
            (error) => {
                console.error('Error updating POI', error);
            }
        );
    }


}
