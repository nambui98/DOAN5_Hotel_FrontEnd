import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { GitHubService } from '../../../core';
import { repos } from '../../../core';

@Component({
  templateUrl: './repolist.component.html',
})
export class RepoListComponent {
  userName: string = 'angular';
  repos: repos[];

  loading: boolean = false;
  errorMessage;

  constructor(private githubService: GitHubService) {}

  public getRepos() {
    this.loading = true;
    this.errorMessage = '';
    this.githubService.getRepos(this.userName).subscribe(
      (response) => {
        this.repos = response;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
}
