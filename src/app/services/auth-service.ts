import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient) { }

	login(data: any) {
		console.log(data);
		// return this.http.post(`${apiUrl}/login`, data);
	}
}