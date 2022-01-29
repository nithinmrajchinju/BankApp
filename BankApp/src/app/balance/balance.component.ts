import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  balance=this.ds.loginuser["balance"]

  constructor(private router: Router, private ds: DataService) { }

  ngOnInit(): void {
  }

  back() {
    this.router.navigateByUrl("dashboard")
  }

}
 