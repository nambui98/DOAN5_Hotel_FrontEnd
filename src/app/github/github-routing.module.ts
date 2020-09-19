import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepoListComponent } from './pages';

const routes: Routes = [
  {
    path: 'github',
    component: RepoListComponent,
    children: [{ path: 'list', component: RepoListComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GithubRoutingModule {}
