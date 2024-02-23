import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {



  constructor(private http: HttpClient) {

  }
  cityList: any[] = [];

  ngOnInit(): void {
    this.getAllCity();

  }
  getAllCity() {

    // http://localhost:3000/api/FlightBooking/GetAllCity

    this.http.get('https://freeapi.gerasim.in/api/FlightBooking/GetAllCity').subscribe((res: any) => {
      this.cityList = res.data;
      // this.cityList.forEach((element: any) => {
      //   element.isEdit = false;
      // });
    });

  }

  bulkUpdateCity(){
    this.http.post('https://freeapi.gerasim.in/api/FlightBooking/AddUpdateBultCity',this.cityList).subscribe((res: any) => {
      if(res.status){
        alert('Bult Update Success')
      } else {
        alert(res.message)
      }
    });
  }

  addNew() {
    const obj = {
      cityId: 0,
      cityName: '',
    };

    this.cityList.unshift(obj);
  }

}
