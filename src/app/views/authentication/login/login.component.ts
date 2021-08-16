import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginErrors, UserToken} from "../../../models/auth";
import {TOKEN_KEY} from "../../../utils/constants";
import {NotificationService} from "../../../services/notification/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  isLoginInProgress = false;
  loginErrors: LoginErrors | any;
  alertErrors: string = '';
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [
        "",
        {
          validators: [Validators.required, Validators.email],
          updateOn: "blur",
        },
      ],
      password: ["", { validators: [Validators.required], updateOn: "blur" }],
    });
  }

  get email() {
    return this.loginForm.get("username");
  }

  get password() {
    return this.loginForm.get("password");
  }

  login() {
    this.loginErrors = null;
    this.alertErrors = '';

    if (this.loginForm.invalid) {
      for (const i in this.loginForm.controls) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
      return;
    }

    this.isLoginInProgress = true;

    this.authService.userLogin(this.loginForm.value).subscribe(
      (response: UserToken) => {
        this.authService.storeEntry(TOKEN_KEY, response);
        this.router.navigate(['/dashboard/visas']);
      },
      (error) => {
        this.isLoginInProgress = false;
        if (error?.status === 422) {
          this.loginErrors = error?.error?.errors;
        } else if (error?.status === 400) {
          this.alertErrors = error?.error?.error_description;
        } else {
          this.alertErrors = 'Une erreur est survenue, veuillez réessayer svp !';
          this.notificationService.error();
        }
      }
    );
  }


}
