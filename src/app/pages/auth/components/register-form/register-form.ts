import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../../../services/auth-service";
import { toast } from "ngx-sonner";

@Component({
	selector: "app-register-form",
	imports: [ReactiveFormsModule],
	templateUrl: "./register-form.html",
})
export class RegisterForm {
	registerForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
	) {
		this.registerForm = this.fb.group({
			name: ["", [Validators.required]],
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required, Validators.minLength(8)]],
		});
	}

	onSubmit() {
		if (!this.registerForm.valid) return;
		this.authService.register(this.registerForm.value).subscribe({
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
