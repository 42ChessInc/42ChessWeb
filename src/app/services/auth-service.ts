import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { apiUrl } from "../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private authUrl = apiUrl + "/auth";

	constructor(private http: HttpClient) {}

	login(data: any) {
		return this.http.post(`${this.authUrl}/login`, data, { responseType: "text" }).pipe(
			map((response) => {
				try {
					const parsed = JSON.parse(response) as { access_token?: string };
					if (parsed.access_token) {
						return parsed.access_token;
					}
				} catch {
					return response;
				}

				return response;
			}),
		);
	}
}
