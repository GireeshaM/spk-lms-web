import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private dialogRef: MatDialogRef<LoginComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  login(): void {
    if (this.username === 'admin' && this.password === 'password'||
      this.username === 'user' && this.password === 'password' ||
    this.username==='rajesh' && this.password==='password')  {
      Swal.fire({
        title: 'Success!',
        text: 'Login Successful',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,  
        customClass: {
          popup: 'swal-popup',
          title: 'swal-title',
          icon: 'swal-icon'
        }
      }).then(() => {
        this.dialogRef.close();
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Invalid Username or Password',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,  
        customClass: {
          popup: 'swal-popup',
          title: 'swal-title',
          icon: 'swal-icon'
        }
      });
    }
  }
}