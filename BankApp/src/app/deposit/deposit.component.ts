import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  constructor(private router: Router, private ds: DataService) { }

  ngOnInit(): void {
  }

  deposit(amount: any) {
    var amt = parseInt(amount.value);
    var acc = this.ds.users;
    var loginuser = this.ds.loginuser;

    if (loginuser["accno"] in acc) { 
      loginuser["balance"] += amt;
      loginuser.transaction.push({
        amount: amt,
        type: "CREDIT"
      })
      console.log(acc);
      alert(amt + " is successfully deposited and new balance is " + loginuser["balance"])
    }
  }

  back() {
    this.router.navigateByUrl("dashboard")
  }

}
