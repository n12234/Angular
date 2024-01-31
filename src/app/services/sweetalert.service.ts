import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {


  // showAlert(title: string, message: string, type: 'success' | 'error' | 'warning' = 'success', timer = 2000) {
  //   Swal.fire({
  //     title: title,
  //     text: message,
  //     icon: type,
  //     timer: timer,
  //     showConfirmButton: false
  //   });
  // }

  // Display a success alert
  success(title: string, text: string, timer = 1000): void {
    Swal.fire({
      title,
      text,
      timer: timer,
      icon: 'success',
      showConfirmButton: false
    })
  }

  // Display an error alert
  error(title: string, text: string, timer = 1000): void {
    Swal.fire({
      title,
      text,
      timer: timer,
      icon: 'error',
      showConfirmButton: false
    });
  }

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

