// import { Component, OnInit, Renderer2 } from '@angular/core';
// import { AuthService } from '../../../core/services/auth.service';
// import { TokenStorageService } from '../../../core/services/token-storage.service';
// // import { TokenStorageService } from '../../core/services/token-storage.service';
// //add
// import { Router, ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { first } from 'rxjs/operators';

// import { AuthenticationService } from '../../../core/services/authentication.service';
// @Component({
//   selector: 'app-signin',
//   templateUrl: './signin.component.html',
//   styleUrls: ['./signin.component.css'],
// })
// export class SigninComponent implements OnInit {
//   // form: any = {};
//   // isLoggedIn = false;
//   // isLoginFailed = false;
//   // errorMessage = '';
//   // roles: string[] = [];
//   // constructor(
//   //   private authService: AuthService,
//   //   private tokenStorage: TokenStorageService,
//   //   private renderer: Renderer2
//   // ) {}

//   // ngOnInit(): void {
//   //   if (this.tokenStorage.getToken()) {
//   //     this.isLoggedIn = true;
//   //     this.roles = this.tokenStorage.getUser().roles;
//   //   }
//   // }

//   // onSubmit(): void {
//   //   this.authService.login(this.form).subscribe(
//   //     (data) => {
//   //       this.tokenStorage.saveToken(data.accessToken);
//   //       this.tokenStorage.saveUser(data);

//   //       this.isLoginFailed = false;
//   //       this.isLoggedIn = true;
//   //       this.roles = this.tokenStorage.getUser().roles;
//   //       this.reloadPage();
//   //     },
//   //     (err) => {
//   //       this.errorMessage = err.error.message;
//   //       this.isLoginFailed = true;
//   //     }
//   //   );
//   // }
//   // ngAfterViewInit() {
//   //   this.loadScripts();
//   // }
//   // public loadScripts() {
//   //   this.renderExternalScript(
//   //     'assets/assets/js/authentication/form-2.js'
//   //   ).onload = () => {};
//   // }

//   // public renderExternalScript(src: string): HTMLScriptElement {
//   //   const script = document.createElement('script');
//   //   script.type = 'text/javascript';
//   //   script.src = src;
//   //   script.async = true;
//   //   script.defer = true;
//   //   this.renderer.appendChild(document.body, script);
//   //   return script;
//   // }
//   // reloadPage(): void {
//   //   window.location.reload();
//   // }

//   loginForm: FormGroup;
//   loading = false;
//   submitted = false;
//   error = '';

//   constructor(
//     private formBuilder: FormBuilder,
//     private route: ActivatedRoute,
//     private renderer: Renderer2,
//     private router: Router,
//     private authenticationService: AuthenticationService
//   ) {
//     // redirect to home if already logged in
//     if (this.authenticationService.currentUserValue) {
//       this.router.navigate(['/']);
//     }
//   }

//   ngOnInit() {
//     this.loginForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required],
//     });
//   }

//   // convenience getter for easy access to form fields
//   get f() {
//     return this.loginForm.controls;
//   }

//   onSubmit() {
//     debugger;
//     this.submitted = true;

//     // stop here if form is invalid
//     if (this.loginForm.invalid) {
//       return;
//     }

//     this.loading = true;
//     this.authenticationService
//       .login(this.f.username.value, this.f.password.value)
//       .pipe(first())
//       .subscribe({
//         next: () => {
//           // get return url from route parameters or default to '/'
//           const returnUrl =
//             this.route.snapshot.queryParams['returnUrl'] || '/admin';
//           this.router.navigate([returnUrl]);
//         },
//         error: (error) => {
//           this.error = error;
//           this.loading = false;
//         },
//       });
//   }
//   ngAfterViewInit() {
//     this.loadScripts();
//   }
//   public loadScripts() {
//     this.renderExternalScript(
//       'assets/assets/js/authentication/form-2.js'
//     ).onload = () => {};
//   }

//   public renderExternalScript(src: string): HTMLScriptElement {
//     const script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = src;
//     script.async = true;
//     script.defer = true;
//     this.renderer.appendChild(document.body, script);
//     return script;
//   }
//   reloadPage(): void {
//     window.location.reload();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../core';

@Component({ templateUrl: 'signin.component.html' })
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
debugger
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl =
            this.route.snapshot.queryParams['returnUrl'] || '/admin';
          this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        },
      });
  }
}
