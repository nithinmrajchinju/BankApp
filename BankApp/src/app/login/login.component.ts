import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  bankname = "NMR"
  
  loginForm = this.fb.group({
    accno: [""],
    password: [""]
  })

  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  login() {
    // if (this.loginForm.valid) {

      var accno = this.loginForm.value.accno;
      var password = this.loginForm.value.password;
      var acs = this.ds.users;
      var loginuser;

      if ((accno in acs) && (password == acs[accno]["password"])) {

        loginuser = acs[accno]
        this.ds.loginuser = loginuser
        console.log(loginuser);
        console.log(this.loginForm.value);

        alert("login succesfully")
        this.router.navigateByUrl('dashboard')
      }
      else {
        alert("invalued user")
      }
    // }
    // else {
    //   alert("invalid")
    // }
  }

  signup() {
    alert("create an account")
    this.router.navigateByUrl('register')
  }

}
