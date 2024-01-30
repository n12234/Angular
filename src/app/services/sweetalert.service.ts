import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {


  // Display a success alert
  success(title: string, text: string): void {
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  // Display an error alert
  error(title: string, text: string): void {
    Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  // // Display an info alert
  // info(title: string, text: string): void {
  //   Swal.fire({
  //     title,
  //     text,
  //     icon: 'info',
  //     confirmButtonText: 'OK',
  //   });
  // }

  // // Display a warning alert
  // warning(title: string, text: string): void {
  //   Swal.fire({
  //     title,
  //     text,
  //     icon: 'warning',
  //     confirmButtonText: 'OK',
  //   });
  // }

  // Display a confirmation alert
  confirm(title: string, text: string): Promise<boolean> {
    return Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => result.isConfirmed);
  }
}

