import { Component } from '@angular/core';
import { tileLayer, LatLngTuple } from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      })
    ],
    zoom: 10,
    center: <LatLngTuple>[65.58198917359508, 22.154068133531794]
  };
}
