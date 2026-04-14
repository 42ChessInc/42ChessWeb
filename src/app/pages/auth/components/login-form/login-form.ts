import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Component } from "@angular/core";
import { toast } from "ngx-sonner";
import { AuthService } from "../../../../services/auth-service";
import { tap } from "rxjs";

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

				this.authService.profile().subscribe({
					next: (user) => {
						console.log(this.authService.user);
						toast.success("sucesso");
					},
					error: (err) => console.error("Profile error", err)
				});
			},
			error: (err) => {
				console.error(err);
				toast.error("Invalid email or password");
			},
		});
	}
}
