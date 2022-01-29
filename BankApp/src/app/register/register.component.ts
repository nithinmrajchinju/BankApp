import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  bankname = "SBI"

  registerForm = this.fb.group({

    accno: ["", Validators.required, Validators.pattern('[1-9]*')],
    username: ["", [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    password: ["", Validators.required, Validators.pattern('[a-zA-Z0-9]*')]

  })

  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  register() {

    if (this.registerForm.valid) {

      var accno = this.registerForm.value.accno;
      var username = this.registerForm.value.username;
      var password = this.registerForm.value.password;
      let acc = this.ds.users;
      console.log(this.registerForm);

      if (accno in acc) {

        alert("user already exist...! please login")
        this.router.navigateByUrl("")

      }
      else {

        acc[accno] = {
          accno,
          username,
          password,
          balance: 500,
          transaction: []
        }

        console.log(acc[accno]);
        alert(acc[accno]["username"] + " user successfully created..! please login")
        this.router.navigateByUrl("")
        
      }
    }
    else {
      alert("invalid")
    }
  }

}
