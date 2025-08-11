import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TranslateService } from "@ngx-translate/core";
import { GenericResponseModel } from "src/app/models";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  genericResponse: GenericResponseModel = {
    success: false,
    message: "",
    errors: [],
  };

  constructor(private _translateService: TranslateService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.error && this._hasSameKeys(error.error, this.genericResponse)) {
          throw error;
        }
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = this._translateService.instant("errors.client");
        } else {
          errorMsg = this._translateService.instant("errors.server");
        }
        this.setGenericResponse(errorMsg);
        return throwError(() => this.genericResponse);
      })
    )
  }

  setGenericResponse(errorMsg: string): void {
    this.genericResponse = {
      success: false,
      message: errorMsg,
      errors: [errorMsg],
    };
  }

  private _hasSameKeys(obj1: any, obj2: any): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if(keys1.length !== keys2.length) {
      return false;
    }
    for(let key of keys1) {
      if(!keys2.includes(key)) {
        return false;
      }
    }
    return true;
  }
}
