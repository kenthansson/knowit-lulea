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
  height = '500px';
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
    this.showPois();
  }

  currentUserCircle!: google.maps.Marker;

  showPois() {
    this.poiService.getPois().subscribe((response: any) => {
      console.log(response);
      response.forEach((poi: Poi) => {
        new google.maps.Marker({
          position: { lat: poi.lat, lng: poi.lng },
          map: this.map,
          title: poi.name
        });
      });
    });
  }

  watchId!: number;
  pos!: any;

  trackUserLocation() {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition((position) => {
        this.pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // Ta bort föregående cirkel om den finns
        if (this.currentUserCircle) {
          this.currentUserCircle.setMap(null);
        }

        // Skapa en ny cirkel på användarens nuvarande position
        this.currentUserCircle = new google.maps.Marker({
          map: this.map,
          position: this.pos,
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
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
    this.map.setCenter(this.pos);
    this.map.setZoom(15);  // Anpassa zoomnivån efter behov
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
