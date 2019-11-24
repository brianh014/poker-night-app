import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.username && this.password) {
      this.accountService.login(this.username, this.password)
        .then(user => {
          this.router.navigateByUrl('/home');
        },
        err => {
          alert('Incorrect username or password');
        }) 
    }
  }

}
