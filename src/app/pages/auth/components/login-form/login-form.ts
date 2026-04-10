import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from "@angular/core";


@Component({
	selector: "app-login-form",
	imports: [],
	templateUrl: "./login-form.html",
})
export class LoginForm {
	loginForm: FormGroup;

	constructor(private fb: FormBuilder) {
		this.loginForm = this.fb.group({
			email: ['', Validators.required, Validators.email],
			password: ['', Validators.required, Validators.minLength(8)]
		})
	}

	onSubmit(e: Event) {
		e.preventDefault()
		if (this.loginForm.valid) {
			console.log(this.loginForm.value)
		}
	}
}
