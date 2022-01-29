import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  constructor(private router: Router, private ds: DataService) { }

  ngOnInit(): void {
  }

  withdraw(amount: any) {
    var amt = parseInt(amount.value);
    var acc = this.ds.users;
    var loginuser = this.ds.loginuser;

    if (loginuser["accno"] in acc) {
      if (loginuser["balance"] > amt) {
        loginuser["balance"] -= amt;
        loginuser.transaction.push({
          amount: amt,
          type: "DEBITE"
        })
        console.log(acc);

        alert(amt + " successfully withdrawled from " + loginuser["username"] + " and new balance is " + loginuser["balance"])
      }
      else {
        alert("insufficient balance")
      }
    }
  }

  back() {
    this.router.navigateByUrl("dashboard")
  }

}
