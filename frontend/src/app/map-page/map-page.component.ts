import { Component, OnInit, ViewChild } from '@angular/core';
import { PoiService } from '../services/poi.service';
import { Poi } from '../models/poi.model';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {
  center = { lat: 65.5819525877293, lng: 22.154102325439453 };
  zoom = 12;
  width = '100%';
  height = '90%';
  markerPositions: any[] = [];

  options: google.maps.MapOptions = {
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: true,
    fullscreenControl: false,
    center: this.center,
    zoom: this.zoom
  };

  constructor(private poiService: PoiService) { };

  @ViewChild('map', { static: false }) mapElement: any;
  map!: google.maps.Map;

  ngAfterViewInit() {
    this.map = this.mapElement.googleMap;
    this.addCenterControl();
    this.trackUserLocation();
  }
  watchId!: number;
  currentUserCircle!: google.maps.Circle;

  trackUserLocation() {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // Ta bort föregående cirkel om den finns
        if (this.currentUserCircle) {
          this.currentUserCircle.setMap(null);
        }

        // Skapa en ny cirkel på användarens nuvarande position
        this.currentUserCircle = new google.maps.Circle({
          strokeColor: '#3f51b5',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#3f51b5',
          fillOpacity: 0.5,
          map: this.map,
          center: pos,
          radius: 5
        });
      },
        (error) => {
          console.warn('ERROR(' + error.code + '): ' + error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  stopTrackingUserLocation() {
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
      if (this.currentUserCircle) {
        this.currentUserCircle.setMap(null);
      }
    }
  }

  centerOnUser() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.map.setCenter(pos);
        this.map.setZoom(15);  // Anpassa zoomnivån efter behov
      });
    } else {
      // Geolocation is not supported by this browser
      alert("Geolocation is not supported by this browser.");
    }
  }

  addCenterControl() {
    const centerControlDiv = document.createElement('div');
    centerControlDiv.style.padding = '10px';
    const centerControlUI = document.createElement('div');
    centerControlUI.style.backgroundColor = '#fff';
    centerControlUI.style.border = '2px solid #fff';
    centerControlUI.style.borderRadius = '3px';
    centerControlUI.style.cursor = 'pointer';
    centerControlUI.innerText = 'Center on me';
    centerControlDiv.appendChild(centerControlUI);
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
    centerControlUI.addEventListener('click', () => {
      this.centerOnUser();
    });
  }



  ngOnInit() {
  }

  mapClick(event: any) {
    // Lägg till den klickade positionen till markerPositions-arrayen
    this.markerPositions.push({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });

    //call savePio wit poi object use observable to get the response
    this.poiService.savePoi(event.latLng.toJSON()).subscribe((response: any) => {
      console.log(response);
    });



    // Om du vill fånga och spara dessa värden kan du göra det här.
    console.log(event.latLng.toJSON());  // Skriver ut { lat: ..., lng: ... } i konsolen.


  }

}
