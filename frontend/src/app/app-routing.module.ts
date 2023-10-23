import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapPageComponent } from './map-page/map-page.component';
import { PinsListPageComponent } from './pins-list-page/pins-list-page.component';
import { LeafletMapPageComponent } from './leaflet-map-page/leaflet-map-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'leaflet-map', component: LeafletMapPageComponent },
  { path: 'map', component: MapPageComponent },
  { path: 'pins', component: PinsListPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
