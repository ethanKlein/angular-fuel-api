import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nationwide-angular-car-image';
  getProductInfoUrl = 'https://api.fuelapi.com/v1/json/vehicle/1078/?api_key=06b3ad37-40ec-4466-9da4-dba806d212f1&year=2014';
  getVehicleIdUrl = 'https://api.fuelapi.com/v1/json/vehicles/?year=2016&model=silverado%201500&make=chevrolet&api_key=06b3ad37-40ec-4466-9da4-dba806d212f1&year=2014';

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

}

// https://api.fuelapi.com/v1/json/vehicles/?year=2016&model=silverado%201500&make=chevrolet&body=crew%20cab%20pickup&drive=4x4&doors=4&trim=LS&api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1
// https://api.fuelapi.com/v1/json/vehicle/1078/?api_key=daefd14b-9f2b-4968-9e4d-9d4bb4af01d1&productID=1&shotCode=113
