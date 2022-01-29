import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  bankname = "SBI"
  loginuser=this.ds.loginuser["username"]

  constructor(private router: Router, private ds:DataService) { }

  ngOnInit(): void {
  }
  
  logout(){
    this.router.navigateByUrl("")
  }

}
