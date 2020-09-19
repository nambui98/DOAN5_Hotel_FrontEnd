import { NgModule, Optional, SkipSelf } from '@angular/core';
import { GitHubService } from './services/github.service';

@NgModule({
  imports: [],
  providers: [GitHubService],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You should import core module only in the root module');
    }
  }
}
