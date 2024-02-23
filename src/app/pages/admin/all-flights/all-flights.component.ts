import { Component } from '@angular/core';
import { MasterService } from '../../../core/service/master.service';

@Component({
  selector: 'app-all-flights',
  templateUrl: './all-flights.component.html',
  styleUrl: './all-flights.component.css'
})
export class AllFlightsComponent {

  constructor(private master: MasterService) {

  }

  flightList: any[] = [];



  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights(){
    this.master.getAllFlights().subscribe((res: any) => {
      this.flightList = res.data;
    });
  }

}
