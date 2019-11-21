import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'poker-night';
  user: User;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.loadContext().then(user => {
      this.user = user

      this.accountService.currentUser
        .subscribe(user => this.user = user);
    });
    
  }

  logout() {
    this.accountService.logOut();
  }
}
