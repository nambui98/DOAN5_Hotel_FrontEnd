import { Component, Renderer2 } from '@angular/core';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
//add
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { User } from '../../core/models';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  //add
  currentUser: User;
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private authenticationService: AuthenticationService,
    private tokenStorageService: TokenStorageService
  ) {
    //add
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }
  //old
  // ngOnInit(): void {
  //   this.isLoggedIn = !!this.tokenStorageService.getToken();

  //   if (this.isLoggedIn) {
  //     const user = this.tokenStorageService.getUser();
  //     this.roles = user.roles;

  //     this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
  //     this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

  //     this.username = user.username;
  //   }
  // }
  //old
  // logout(): void {
  //   this.tokenStorageService.signOut();
  //   window.location.reload();
  // }

  //add
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/admin/login']);
  }
  // ngAfterViewInit() {
  //   this.loadScripts();
  // }
  // public loadScripts() {
  //   this.renderExternalScript(
  //     'assets/plugins/perfect-scrollbar/perfect-scrollbar.min.js'
  //   ).onload = () => {};
  // }

  // public renderExternalScript(src: string): HTMLScriptElement {
  //   const script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.src = src;
  //   script.async = true;
  //   script.defer = true;
  //   this.renderer.appendChild(document.body, script);
  //   return script;
  // }
}
