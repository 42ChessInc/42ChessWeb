import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Component } from "@angular/core";
import { toast } from "ngx-sonner";
import { AuthService } from "../../../../services/auth-service";

@Component({
	selector: "app-login-form",
	imports: [ReactiveFormsModule],
	templateUrl: "./login-form.html",
})
export class LoginForm {
	loginForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
	) {
		this.loginForm = this.fb.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required, Validators.minLength(8)]],
		});
	}

	onSubmit() {
		if (!this.loginForm.valid) return;
		this.authService.login(this.loginForm.value).subscribe({
			next: (token) => {
				localStorage.setItem("token", token);
				console.log("Success");
				toast.success("sucesso");
			},
			error: (err) => {
				console.error("Error", err);
				toast.error("Invalid email or password");
			},
		});
	}
}
