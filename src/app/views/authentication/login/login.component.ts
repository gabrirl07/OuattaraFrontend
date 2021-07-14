import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginErrors, User, UserToken} from "../../../models/auth";
import {PROFILE_KEY, TOKEN_KEY} from "../../../utils/constants";

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
        console.log("User login response: ", response);
        this.authService.storeEntry(TOKEN_KEY, response);
      },
      (error) => {
        console.log("User login error: ", error);
        this.isLoginInProgress = false;
        if (error?.status === 422) {
          this.loginErrors = error?.error?.errors;
        } else if (error?.status === 403) {
          this.alertErrors = error?.error?.errors?.email[0];
        } else {
          this.alertErrors = 'Une erreur est survenue, veuillez réessayer svp !';
        }
      }
    );

  }


}
