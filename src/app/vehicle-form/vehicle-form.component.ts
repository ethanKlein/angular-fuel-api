import { Component, OnInit } from '@angular/core';
import { Vehicle }    from '../vehicle';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {
  vehicleId = "balkj";
  makes = ['CHEV', 'SUBA', 'CHRY', 'TOYT', 'MERZ', 'BMW'];

  model = new Vehicle('CHEV', 'volt', '2017', 'black');
  submitted = false;
  showError = false;
  queryString = "";
  getVehicleIdUrl = 'https://api.fuelapi.com/v1/json/vehicles/';
  getProductInfoUrl = 'https://api.fuelapi.com/v1/json/vehicle/';
  productId = '2';
  productFormatIDs = '12';
  shotCode = '037';
  apiKey = '06b3ad37-40ec-4466-9da4-dba806d212f1';
  stringAtEndOfImageUrl = "?fuel_app_key=0f615c30c3534a95a20f3ff8e313e0e6&Expires=1542386307&Signature=YJc8Af3CQt7cEKmznvJhw3U1y7BlNXpZaSZ-z3Ak8GQXlSx9rC6houQ4XJvus2wmyjXgNUt-q0ahIZkTqPCCOPKRcK72FF4z6lgtNOobGlkqtpoXNW4t0k3QfQ9fUAxwIgqi7U4pWSnMjOZcpHJ8TWRSlqj1AYGlrOgfd5uoQZFEQ0kNhw-qOXXxh4Nu7VZeZTAIKxnVAu29oCzSshn41PWvYftc8JSY5NJFBxsO5fRasBp-zm71ueV~BabSg2xcCnAzaXV1DKX9ucZfODNWxfcYrThYLhLwDuzVXvIWoahMoaeMXv24-igEHjFOsUb4AdLhkjppD9tkhStPlArQgw__&Key-Pair-Id=APKAJEHLXC3UBWDEGR3A";
  imageUrl = "https://i.fuelapi.com/0f615c30c3534a95a20f3ff8e313e0e6/26004/2/12/color_0640_032_png/MY2017/11163/11163_cc0640_032_GAZ.png";
  vehicleShortNameLookupTable = [
                                  {shortname: 'CHEV', longname: 'Chevrolet'},
                                  {shortname: 'SUBA', longname: 'Subaru'},
                                  {shortname: 'CHRY', longname: 'Chrysler'},
                                  {shortname: 'TOYT', longname: 'Toyota'},
                                  {shortname: 'MERZ', longname: 'Mercedes-Benz'},
                                  {shortname: 'BMW', longname: 'BMW'}
                                ];


  startFuelApiCall() {
    // get the vehicle id from Fuel API
    this.getVehicleIdUrl = 'https://api.fuelapi.com/v1/json/vehicles/' +
                           '?api_key=' + this.apiKey +
                           '&model=' + this.model.vehicleModel +
                           '&make=' + this.getVehicleLongName() +
                           '&year=' + this.model.year;
    let obs = this.http.get(this.getVehicleIdUrl);
    obs.subscribe((response) => this.callbackAfterGettingVehicleId(response), err => this.showError = true);
  }

  getVehicleLongName() {
    const finalLongName = this.vehicleShortNameLookupTable.filter(vehicle => vehicle.shortname === this.model.make);
    return finalLongName[0].longname;
  }

  callbackAfterGettingVehicleId(response) {
    this.showError = false;
    this.vehicleId = response[0].id;
    this.callToGetImageUrl();
  }

  buildProductInfoUrl() {
    let productInfoUrl = this.getProductInfoUrl + this.vehicleId +
                         '/?productID=' + this.productId +
                         '&productFormatIDs=' + this.productFormatIDs +
                         '&color=white' +
                         // '&shotCode=040' +
                         // '&shotCode=' + this.shotCode +
                         '&api_key=' + this.apiKey;
    return productInfoUrl;
  }

  callToGetImageUrl() {
    let url = this.buildProductInfoUrl();
    let obs = this.http.get(url);
    obs.subscribe((response) => this.callbackAfterGetImageUrl(response));
  }

  callbackAfterGetImageUrl(response) {
    console.log(response);
    try {
      this.imageUrl = response.products[0].productFormats[0].assets[0].url;
      // this.imageUrl = response.products[0].productFormats[0].assets[3].url;
    }
    catch {
      this.showError = true;
    }
  }

  constructor(private http: HttpClient) { }

  onSubmit() { this.submitted = true }

  ngOnInit() {}

}
