import { NgModule } from '@angular/core';
import { GithubRoutingModule } from './github-routing.module';

import { RepoListComponent } from './pages';
import { GitHubService } from '../core';
import { SharedModule } from '../shared';

@NgModule({
  imports: [GithubRoutingModule, SharedModule],
  providers: [GitHubService],
  declarations: [RepoListComponent],
})
export class GithubModule {}
