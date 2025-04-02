import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const toastController = inject(ToastController);
  
    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const toastPosition = 'bottom'; // Default position, can be adjusted based on UX guidelines
        toastController.create({
          message: error.error?.message || 'Something went wrong.',
          duration: 3000,
          color: 'danger',
          position: toastPosition,
        }).then(toast => toast.present());
  
        return throwError(() => error);
      })
    );
  };
