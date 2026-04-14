import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, tap } from "rxjs";
import { apiUrl } from "../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private authUrl = apiUrl + "/auth";
	private userSubject = new BehaviorSubject<any | null>(null);
	user$ = this.userSubject.asObservable();
	user: any | null;

	constructor(private http: HttpClient) { }

	private parseToken(data: string) {
		try {
			const { access_token } = JSON.parse(data) as { access_token?: string };
			if (access_token) {
				return (access_token);
			}
		} catch {
			return (data);
		}

		return data;
	}

	login(data: any) {
		return this.http.post(`${this.authUrl}/login`, data, { responseType: "text" }).pipe(map((response) => this.parseToken(response)));
	}
	register(data: any) {
		return this.http.post(`${this.authUrl}/register`, data, { responseType: "text" }).pipe(map((response) => this.parseToken(response)));
	}
	profile() {
		return this.http.get(`${this.authUrl}/profile`).pipe(
			tap(userData => {
				this.user = userData;
				this.userSubject.next(userData);
			})
		);
	}
}
