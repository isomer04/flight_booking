import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../core/service/master.service';

@Component({
  selector: 'app-new-flight',
  templateUrl: './new-flight.component.html',
  styleUrl: './new-flight.component.css'
})
export class NewFlightComponent {

  airportList: any[] = [];
  flightObj: any = {
    "flightId": 0,
    "flightNumber": "",
    "departureAirportId": 0,
    "departureTime": "",
    "arriveAirportId": 0,
    "arrivalTime": "",
    "price": 0,
    "totalSeats": 0,
    "flightVendorId": 0,
    "travelDate": ""
  }
  constructor(private master: MasterService) {

    if (typeof localStorage !== 'undefined') {

      const localData = localStorage.getItem("FlightUser");
      if (localData != null) {
        this.flightObj.flightVendorId = JSON.parse(localData).userId;
      }
    }
  }

  ngOnInit(): void {
    this.loadAirports();

  }

  loadAirports() {
    this.master.getAllAirport().subscribe((res: any) => {
      this.airportList = res.data;
    });

  }

  OnSaveFlight() {
    const obj = [

    ];

    obj.push(this.flightObj);
    this.master.createFlight(obj).subscribe((res: any) => {
      if (res.result) {
        alert("Flight added successfully")
      } else {
        alert(res.message)
      }
    });
  }

}
