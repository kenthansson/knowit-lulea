import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { latLng, tileLayer } from 'leaflet';
import { PoiService } from '../services/poi.service';
import { Poi } from '../models/poi.model';
import { AddPoiPopup } from './popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private poiService: PoiService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    L.Icon.Default.imagePath = "assets/leaflet/"
  }


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
          .bindPopup(poi.name)
          .addTo(map);
      });
    });
    console.log(map);
    map.on('click', (e) => {
      const dialogRef = this.dialog.open(AddPoiPopup, {
        width: '250px',
        data: {} // Du kan skicka med data till dialogen om det behövs.
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialogen stängd med resultat:', result);
      });
    });
  }

}
