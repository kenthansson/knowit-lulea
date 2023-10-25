import {Component, OnInit} from '@angular/core';
import {PoiService} from "../services/poi.service";


@Component({
    selector: 'app-pins-list-page',
    templateUrl: './pins-list-page.component.html',
    styleUrls: ['./pins-list-page.component.css']
})

export class PinsListPageComponent implements OnInit {

    pois: any;

    constructor(private poiService: PoiService) {
    }

    ngOnInit(): void {
        this.poiService.getPois()
            .subscribe({
                next: p => this.pois = p,
                error: e => console.log(e)
            })
    }


}
