import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactPayload {
  readonly fullName: string;
  readonly email: string;
  readonly phone?: string;
  readonly destination?: string;
  readonly message: string;
  readonly hp_company?: string;
}

export interface ApiResponse {
  readonly success: boolean;
  readonly message: string;
  readonly errors?: Record<string, string>;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/contact.php`;

  sendEnquiry(payload: ContactPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.endpoint, payload);
  }
}
