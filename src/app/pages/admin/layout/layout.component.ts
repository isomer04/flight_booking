import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  loggedUserData: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    // Check if localStorage is available before accessing it
    if (typeof localStorage !== 'undefined') {
      const localData = localStorage.getItem("FlightUser");
      if (localData !== null) {
        this.loggedUserData = JSON.parse(localData);
      }
    }
  }

  logoff(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('FlightUser');
    }
    this.router.navigateByUrl('/login');
  }
}
