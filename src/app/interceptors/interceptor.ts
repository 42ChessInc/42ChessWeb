import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const token = localStorage.getItem("token");
	const isLoginRequest = req.url.includes("/auth/login");

	if (!token || isLoginRequest) {
		return next(req);
	}

	const cloned = req.clone({
		setHeaders: {
			Authorization: `Bearer ${token}`,
		},
	});

	return next(cloned);
};
