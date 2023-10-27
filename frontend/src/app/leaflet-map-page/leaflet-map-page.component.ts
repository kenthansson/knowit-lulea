import { Component, NgZone, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { latLng, tileLayer } from 'leaflet';
import { PoiService } from '../services/poi.service';
import { Poi } from '../models/poi.model';
import { AddPoiPopup } from './popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-leaflet-map-page',
  templateUrl: './leaflet-map-page.component.html',
  styleUrls: ['./leaflet-map-page.component.css']
})
export class LeafletMapPageComponent implements OnInit {
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 12,
    center: latLng(65.5819525877293, 22.154102325439453)
  };

  constructor(private poiService: PoiService, private categoryService: CategoryService, public dialog: MatDialog, private ngZone: NgZone,) {
  }

  ngOnInit(): void {
    L.Icon.Default.imagePath = "assets/leaflet/"
  }

  categories!:Category[];


  onMapReady(map: L.Map) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        L.circleMarker([position.coords.latitude, position.coords.longitude], {
          radius: 5
        }).addTo(map);
      });
    } else {
      L.circleMarker([65.5819525877293, 22.154102325439453], {
        radius: 5
      }).addTo(map);
    }
    this.poiService.getPois().subscribe((response: any) => {
      console.log(response);
      response.forEach((poi: Poi) => {
        new L.Marker([poi.lat, poi.lng])
        .bindPopup('<h1>' + poi.name + '</h1><h4>'+poi.category.name + '</h4><p>' + poi.description +'</p><small>Tillagd: '+ new Date(poi.created).toLocaleDateString()+ '</small>')
          .addTo(map);
      });
    });
    this.categoryService.getCategories().subscribe((response: any) => {
      console.log(response);
      this.categories = response
    });

    map.on('click', (e) => {
      const lat = e.latlng.lat
      const lng = e.latlng.lng
      this.ngZone.run(() => {
      const dialogRef = this.dialog.open(AddPoiPopup, {
        width: '300px',
        height: '500px',
        data: {'categories': this.categories} // Du kan skicka med data till dialogen om det behövs.
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          let poi = new Poi(undefined, lat, lng, result.name, result.description, result.category, new Date(), undefined)
          this.poiService.savePoi(poi).subscribe(
            (response: any) => {
              if (response.status === 200) {
                // "OK" svar från post, lägg till markören på kartan
                new L.Marker([lat, lng])
                  .bindPopup('<h1>' + poi.name + '</h1><h4>' + poi.category.name + '</h4><p>' + poi.description + '</p><small>Tillagd: ' + new Date(poi.created).toLocaleDateString() + '</small>')
                  .addTo(map);
              } else {
                // Felhantering om HTTP-statuskoden inte är 200
                console.error('Något gick fel:', response);
                // Visa meddelande för användaren
                // Du kan använda t.ex. en toast, en varning eller något liknande här
              }
            },
            (error) => {
              // Felhantering om det uppstår ett nätverksfel eller liknande
              console.error('Nätverksfel:', error);
              // Visa meddelande för användaren om nätverksfel
            }
          );
        }
      });
    });
    });
  }


}
