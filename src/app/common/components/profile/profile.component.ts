import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../services/github.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: number;
  user: any;
  followers: any;
  repositories: any;

  constructor(private githubService: GithubService, private route: ActivatedRoute) {
    route.params.subscribe(val => {
      this.githubService.getUser(this.route.snapshot.paramMap.get('id')).subscribe(user => {
        this.user = user;
        this.githubService.getUserFollowers(this.user.login).subscribe(x => this.followers = x);
        this.githubService.getUserRepositories(this.user.login).subscribe(x => this.repositories = x);
      });
    });
  }


  ngOnInit() {
  }

}
