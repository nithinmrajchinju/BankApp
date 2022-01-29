import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {
  statement = this.ds.loginuser["transaction"]

  constructor(private router: Router, private ds: DataService) { }

  ngOnInit(): void {
  }

  back() {
    this.router.navigateByUrl("dashboard")
  }

}
