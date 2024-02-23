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
  constructor(private master: MasterService) { }

  ngOnInit(): void {
    this.loadAirports();
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

  bookTicket(flight: any) {
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
