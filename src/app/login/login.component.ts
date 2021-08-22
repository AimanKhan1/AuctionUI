import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {AppSettings} from '../AppSettings';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  userName: string = "user1";
  password: string = "user1";

  ngOnInit(): void {
    AppSettings.logOut();
  }

  login() {
    if(this.userName.toLowerCase() == 'user1' && this.password.toLowerCase() == 'user1'){
      debugger
      let user = AppSettings.Users.find(x=> x.name.toLowerCase() == this.userName.toLowerCase());
      AppSettings.doLogin(user);
      alert('Login Successfull!');
      this.router.navigate(['/items-list']);
    } 
    else{
      alert('Login Failed!');
    }
  }

}
