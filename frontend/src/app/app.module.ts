import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HeaderComponent } from './header/header.component';
import { MapPageComponent } from './map-page/map-page.component';
import { PinsListPageComponent } from './pins-list-page/pins-list-page.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { LeafletMapPageComponent } from './leaflet-map-page/leaflet-map-page.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapPageComponent,
    PinsListPageComponent,
    LeafletMapPageComponent
  ],
  imports: [
    GoogleMapsModule,
    LeafletModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
