import { Component, OnInit, OnChanges } from '@angular/core';
import { tap, catchError, map } from 'rxjs/operators';
import {GithubService} from '../../services/github.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  city: string;
  users: any;
  detailedUsers = [];
  sort = 'repositories';
  order = 'desc';
  itemsPerPage = 10;
  page = 1;

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.city = 'Bratislava';
  }

  loadUsers() {
    this.detailedUsers = [];
    return this.githubService.listUsers(this.page, this.itemsPerPage, this.city, this.sort, this.order).subscribe(users => {
      this.users = users;
      this.users.items.map(user => {
        this.githubService.getUser(user.login).subscribe(
          x => {
            this.detailedUsers.push(x);
            this.orderUsers(this.detailedUsers, this.order);
          });
      });
    });
  }

  orderUsers(users, order) {
    this.detailedUsers = users.sort((obj1, obj2) => {
      return obj1.public_repos - obj2.public_repos;
    });
    if (order === 'desc') { this.detailedUsers.reverse(); }
  }

  changeSort(sort) {
    this.sort = sort;
    this.loadUsers();
  }

  changeOrder(order) {
    this.order = order;
    this.loadUsers();
  }

}
