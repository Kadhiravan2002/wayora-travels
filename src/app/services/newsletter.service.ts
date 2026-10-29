import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from './contact.service';

export interface NewsletterPayload {
  readonly email: string;
  readonly hp_company?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/newsletter.php`;

  subscribe(email: string, honeypot = ''): Observable<ApiResponse> {
    const payload: NewsletterPayload = {
      email,
      hp_company: honeypot,
    };
    return this.http.post<ApiResponse>(this.endpoint, payload);
  }
}
