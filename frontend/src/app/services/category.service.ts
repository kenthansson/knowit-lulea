import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiUrl = 'http://localhost:8080/category';


    constructor(private http: HttpClient) {
    }

    getCategories() {
        console.log('getCategories() called');
        return this.http.get(this.apiUrl);
    }

    saveCategory(poi: { lat: number, lng: number }): Observable<any> {
        console.log('saveCategory() called');
        return this.http.post(this.apiUrl, poi);
    }

    deleteCategory(id: number): Observable<any> {
        console.log('deleteCategory called');
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

}
