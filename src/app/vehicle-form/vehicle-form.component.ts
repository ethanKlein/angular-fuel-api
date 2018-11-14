import { Component, OnInit } from '@angular/core';
import { Vehicle }    from '../vehicle';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {

  makes = ['chevrolet', 'ford',
            'Nissan', 'toyota'];

  model = new Vehicle('CHEV', 'Nova', '2011', 'black');

  submitted = false;

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }


  onClickMe() {
    this.clickMessage = this.model.make + this.model.vehicleModel + this.model.year;
  }


  constructor() { }

  ngOnInit() {
  }

}
