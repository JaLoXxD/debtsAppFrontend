import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _translationService: TranslationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');
    const currentPrefix = this._translationService.getCurrentPrefix();
    const headers: Record<string, string> = {
      'Accept-Language': currentPrefix,
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        ...headers
      }
    });
    return next.handle(request);
  }
}
