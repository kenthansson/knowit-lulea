import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoiService {
  private apiUrl = 'http://localhost:8080/poi';
  
  constructor(private http: HttpClient) { }

  getPois() {
    console.log('PoiService.getPois() called');
    return this.http.get(this.apiUrl);
  }

  savePoi(poi: { lat: number, lng: number }): Observable<any> {
    console.log('PoiService.savePoi() called');
    return this.http.post(this.apiUrl, poi);
  }
}
