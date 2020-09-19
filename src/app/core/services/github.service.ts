import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { repos } from '../models';

@Injectable()
export class GitHubService {
  baseURL: string = 'https://api.github.com/';

  constructor(private http: HttpClient) {}

  getRepos(userName: string): Observable<repos[]> {
    return this.http.get<repos[]>(
      this.baseURL + 'users/' + userName + '/repos'
    );
  }
}
