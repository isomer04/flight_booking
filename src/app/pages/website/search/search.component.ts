import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../core/service/master.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {


  airports: any[] = [];
  fromAirport: number=0;
  toAirport: number=0;
  travelDate: string="";
  flightList: any[] = [];
  passengerObj: any = {
    "travelerName": "string",
    "contactNo": "string",
    "aadharNo": "string",
    "seatNo": "string",
  }
  bookingObj: any = {
    "flightId": 0,
    "customerId": 0,
    "bookgingDate": new Date(),
    "totalAmount": 0,
    "FlightBookingTravelers": [ ]
  }
  passengerList: any[] = [];
  constructor(private master: MasterService) { 

    const isLocal = localStorage.getItem('flightCustomer');
    if(isLocal != null) {
      this.bookingObj.customerId = JSON.parse(isLocal).userId;
    }
  }

  ngOnInit(): void {
    this.loadAirports();
  }

  addPassenger() {
    const obj = JSON.stringify(this.passengerObj);
    const newObj = JSON.parse(obj);
    this.passengerList.push(newObj);
  }


  loadAirports() {
    this.master.getAllAirport().subscribe((res: any) => {
      this.airports = res.data;
    });
  }

  searchFlight() {
    if(this.fromAirport == 0) {
      alert('Please select from airport');
      return;
    }
    if(this.toAirport == 0) {
      alert('Please select to airport');
      return;
    }
    if(this.travelDate == "") {
      alert('Please select travel date');
      return;
    }
    this.master.searchFlight(this.fromAirport,this.toAirport,this.travelDate).subscribe((res: any) => {
      this.flightList = res.data;
    });
  }

  onBookTicket() {
    this.bookingObj.FlightBookingTravelers = this.passengerList;
    this.master.bookTicket(this.bookingObj).subscribe((res: any) => {
      if(res.result) {
        alert('Ticket Booked Successfully');
        this.closeModel();
      } else {
        alert(res.message);
      }
    });
  }

  bookTicket(flightId: number) {
    this.bookingObj.flightId = flightId;
    const model = document.getElementById('bookModel');
    if(model != null) {
      model.style.display = 'block';
    } 
  }

  closeModel() {
    const model = document.getElementById('bookModel');
    if(model != null) {
      model.style.display = 'none';
    } 
  }


}
