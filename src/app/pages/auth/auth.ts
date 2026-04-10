import { Component } from "@angular/core";
import { LoginForm } from "./components/login-form/login-form";
import { RegisterForm } from "./components/register-form/register-form";

@Component({
	selector: "app-auth",
	imports: [LoginForm, RegisterForm],
	templateUrl: "./auth.html",
})
export class Auth {}
