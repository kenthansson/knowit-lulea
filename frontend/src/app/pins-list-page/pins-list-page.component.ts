import {Component, OnInit, ViewChild} from '@angular/core';
import {PoiService} from "../services/poi.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Poi} from "../models/poi.model";
import {MatDialog} from "@angular/material/dialog";
import {PinsEditDialogComponent} from "./pins-list-form/pins-edit-dialog.component";
import {MatSort} from "@angular/material/sort";


import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';


@Component({
    selector: 'app-pins-list-page',
    templateUrl: './pins-list-page.component.html',
    styleUrls: ['./pins-list-page.component.css'],

})

export class PinsListPageComponent implements OnInit {
    pois: Poi[] = [];

    dataSource: MatTableDataSource<Poi>;
    displayedColumns: string[] = ['name', 'description', 'category', 'lat', 'lng', 'created'];


    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort!: MatSort;

    isHandset: boolean = false;

    constructor(private poiService: PoiService, private dialog: MatDialog, private breakpointObserver: BreakpointObserver) {
        this.dataSource = new MatTableDataSource(this.pois);
    }

    ngOnInit(): void {
        this.breakpointObserver.observe([
            Breakpoints.HandsetPortrait,
            Breakpoints.HandsetLandscape,
        ]).subscribe(result => {
            this.isHandset = result.matches;
            console.log('Is handset:', this.isHandset); // Ska logga true eller false när storleken på skärmen ändras
        });
        this.loadPois();
    }

    loadPois() {
        this.poiService.listPois().subscribe((data: Poi[]) => {
            this.pois = data;
            this.dataSource = new MatTableDataSource(this.pois);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            this.dataSource.sortingDataAccessor = (poi: Poi, sortHeaderId: string) => {
                if (sortHeaderId in poi) {
                    switch (sortHeaderId) {
                        case 'created':
                            // Kontrollera först om 'created' är en sträng för att undvika runtime-fel
                            // om 'created' inte är en sträng, borde du hantera det på ett lämpligt sätt
                            return new Date((poi as any)[sortHeaderId]);
                        default:
                            return (poi as any)[sortHeaderId];
                    }
                }
                throw new Error(`Property '${sortHeaderId}' is not a valid key of Poi.`);
            };
        });
    }

    deletePoi(id: number | undefined) {
        if (id === undefined) {
            console.error('Försöker radera en POI utan ett ID');
            return;
        }
        this.poiService.deletePoi(id).subscribe(
            data => {
                console.log('deleted response', data);
                this.ngOnInit();
            }
        )
    }

    editPoi(poi: Poi) {
        const originalCreatedDate = poi.created; // Spara det ursprungliga createdDate

        const dialogRef = this.dialog.open(PinsEditDialogComponent, {
            data: {poi, originalCreatedDate},
        });

        dialogRef.afterClosed().subscribe((result: Poi) => {
            if (result && result.id !== undefined) {
                this.updatePoi(result.id, {...result, created: originalCreatedDate});
            }
        });
    }

    updatePoi(id: number, updatedPoi: Poi) {
        this.poiService.updatePoi(id, updatedPoi).subscribe({
            next: (data: Poi) => {
                console.log('Updated response', data);
                this.loadPois(); // Reload the list of POIs after update
            },
            error: (error) => {
                console.error('Error updating POI', error);
            }
        });
    }

}
