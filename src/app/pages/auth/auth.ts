import { Component } from "@angular/core";
import { EmailInput } from "./components/email-input/email-input";
import { PasswordInput } from "./components/password-input/password-input";
import { UsernameInput } from "./components/username-input/username-input";

@Component({
	selector: "app-auth",
	imports: [EmailInput, PasswordInput, UsernameInput],
	templateUrl: "./auth.html",
	styleUrl: "./auth.css",
})
export class Auth { }
