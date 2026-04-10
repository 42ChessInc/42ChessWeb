import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private authUrl = (apiUrl + "/auth");

	constructor(private http: HttpClient) { }

	login(data: any) {
		return this.http.post(`${this.authUrl}/login`, data);
	}
}