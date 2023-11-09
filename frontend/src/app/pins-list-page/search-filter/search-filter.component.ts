import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Poi} from "../../models/poi.model";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {MatTableDataSource} from "@angular/material/table";

@Component({
    selector: 'app-search-filter',
    templateUrl: './search-filter.component.html',
    styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {

    @Input() dataSource!: MatTableDataSource<Poi>;

    selectedStartDate: Date | null = null;
    selectedEndDate: Date | null = null;
    isSelectingStartDate: boolean = true;

    isAdvancedFilterOpen = false;

    constructor() {}

    ngOnInit(): void {}

    toggleAdvancedFilter() {
        this.isAdvancedFilterOpen = !this.isAdvancedFilterOpen;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    applyDateFilter() {
        if (this.selectedStartDate && this.selectedEndDate) {
            this.dataSource.filterPredicate = (data: Poi, filter: string) => {
                const date = new Date(data.created);
                if (
                    this.selectedStartDate &&
                    this.selectedEndDate &&
                    date >= this.selectedStartDate &&
                    date <= this.selectedEndDate
                ) {
                    return true;
                }
                return !!(this.selectedEndDate && date.toDateString() === this.selectedEndDate.toDateString());

            };
            this.dataSource.filter = `${this.selectedStartDate} TILL/TO ${this.selectedEndDate}`;
        } else {
            this.dataSource.filterPredicate = (data: Poi, filter: string) => {
                return true;
            };
            this.dataSource.filter = '';
        }
    }

    onStartDateSelected(event: MatDatepickerInputEvent<Date>) {
        this.selectedStartDate = event.value;
    }

    onEndDateSelected(event: MatDatepickerInputEvent<Date>) {
        this.selectedEndDate = event.value;
    }

}
