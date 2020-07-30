import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  getRequest: any;
  loggedUser: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private githubService: GithubService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params['code'];
      this.getAccessToken(code);
    });
  }

  private getAccessToken(code) {
    return this.githubService.getToken(code).subscribe(x => {
      this.getRequest = x;
      if (this.getRequest.access_token) {
        localStorage.setItem('accessToken', this.getRequest.access_token);
        this.githubService.getLoggedUser().subscribe(user => {
          this.loggedUser = user;

          localStorage.setItem('loggedUserName', this.loggedUser.login);
          localStorage.setItem('loggedUserAvatar', this.loggedUser.avatar);
          this.redirectMe();
        });
      }
    });
  }

  private redirectMe() {
    this.router.navigateByUrl('/list');
  }
}
