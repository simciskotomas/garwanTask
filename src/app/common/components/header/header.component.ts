import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userAvatar: string;
  userName: string;

  constructor( private router: Router ) { }

  ngOnInit() {
    this.userName = localStorage.getItem('loggedUserName');
    this.userAvatar = localStorage.getItem('loggedUserAvatar');

    console.log('username', this.userName);
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loggedUserName');
    localStorage.removeItem('loggedUserAvatar');
    this.router.navigateByUrl('/list');
  }

}
