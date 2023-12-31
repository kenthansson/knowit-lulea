import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {HeaderComponent} from './header/header.component';
import {MapPageComponent} from './map-page/map-page.component';
import {PinsListPageComponent} from './pins-list-page/pins-list-page.component';
import {GoogleMapsModule} from '@angular/google-maps';
import {HttpClientModule} from '@angular/common/http';
import {LeafletMapPageComponent} from './leaflet-map-page/leaflet-map-page.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";

import { MatSnackBarModule } from '@angular/material/snack-bar';

import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AddPoiPopup} from './leaflet-map-page/popup/popup.component';
import {MatSelectModule} from '@angular/material/select';
import {PinsEditDialogComponent} from './pins-list-page/pins-list-form/pins-edit-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {SearchFilterComponent} from './pins-list-page/search-filter/search-filter.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSortModule} from "@angular/material/sort";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MapPageComponent,
        LeafletMapPageComponent,
        PinsListPageComponent,
        AddPoiPopup,
        PinsEditDialogComponent,
        SearchFilterComponent
    ],
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        GoogleMapsModule,
        LeafletModule,
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        MatDialogModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSortModule,


        MatSnackBarModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        BrowserAnimationsModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatExpansionModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
