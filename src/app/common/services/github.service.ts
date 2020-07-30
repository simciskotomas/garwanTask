import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GithubService {
  private clientId = 'Iv1.92c22d1ed6ecfe1b';
  private clientSecret = '5b2a504fed88c069bfc236c29f156edaf91242b7';

  constructor(private http: HttpClient) {}

  listUsers(page: number, perPage: number, location: string, sort: string, order: string) {
    return this.http.get
    ('https://api.github.com/search/users?q=location%3A' + location + '+sort:' + sort + '-' + order + '' +
      '&order=desc&type=Users&page=' + page +
      '&per_page=' + perPage
      + this.validateAccessToken());
  }

  getUser(user: string) {
    return this.http.get('https://api.github.com/users/' + user + '?' + this.validateAccessToken());
  }

  getLoggedUser() {
    return this.http.get('https://api.github.com/user?' + this.validateAccessToken());
  }

  getUserRepositories(user: string) {
    return this.http.get('https://api.github.com/users/' + user + '/repos?' + this.validateAccessToken());
  }

  getUserFollowers(user: string) {
    return this.http.get('https://api.github.com/users/' + user + '/followers?' + this.validateAccessToken());
  }

  getToken(code: string) {
    const data = new FormData();
    data.append('client_id', this.clientId);
    data.append('client_secret', this.clientSecret);
    data.append('code', code);

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      })
    };

    return this.http.post
    ('https://github.com/login/oauth/access_token?client_id=' + this.clientId +
      '&client_secret=' + this.clientSecret + '&code=' + code, data, httpOptions);
  }

  validateAccessToken() {
    return localStorage.getItem('accessToken') ? '&access_token=' + localStorage.getItem('accessToken') : '';
  }
}
