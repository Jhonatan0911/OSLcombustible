import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetService {

  constructor() { }

  public sweet(data: sweetData) {

    Swal.fire({
      position: 'center',
      icon: data.type,
      title: data.message,
      showConfirmButton: data.showButton ? true : false,
      timer: data.timer ? data.timer : 2000
    })
  }

}

export interface sweetData {
  type: any;
  message: string;
  timer?: number;
  showButton?: boolean;
}