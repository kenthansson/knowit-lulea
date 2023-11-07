import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Poi} from "../models/poi.model";

@Injectable({
    providedIn: 'root'
})
export class PoiService {
    private apiUrl = '/api/poi';


    constructor(private http: HttpClient) {
    }

    getPois() {
        console.log('PoiService.getPois() called');
        return this.http.get(this.apiUrl);
    }

    listPois(): Observable<Poi[]> {
        return this.http.get<Poi[]>(this.apiUrl);
    }


    savePoi(poi: { lat: number, lng: number }): Observable<any> {
        console.log('PoiService.savePoi() called');
        return this.http.post(this.apiUrl, poi);
    }

    deletePoi(id: number): Observable<any> {
        console.log('PoiService.deletePoi() called');
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    updatePoi(id: number, poi: Poi): Observable<Poi> {
        return this.http.put<Poi>(`${this.apiUrl}/${id}`, poi);
    }

}
