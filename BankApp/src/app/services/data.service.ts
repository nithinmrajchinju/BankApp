import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  users: any = {
    1000: { accno: 1000, username: "nithin", password: "nithin123", balance: 1000, transaction: [] },
    1001: { accno: 1001, username: "amal", password: "amal123", balance: 2000, transaction: [] },
    1002: { accno: 1002, username: "rahul", password: "rahul123", balance: 3000, transaction: [] },
    1003: { accno: 1003, username: "raju", password: "raju123", balance: 4000, transaction: [] }
  }
  loginuser: any = "User"

  constructor() { }
}
