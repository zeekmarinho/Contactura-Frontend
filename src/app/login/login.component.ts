import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Authentication } from '../models/user';
import { UsuariosService } from '../service/usuarios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])  
  });
  authentication: Authentication;

  constructor(private router: Router, public usuariosService: UsuariosService) { }

  ngOnInit(): void {
  }

  login(){
    if (this.loginForm.valid){
      this.authentication = this.loginForm.value;
      this.usuariosService.authentication(this.authentication).subscribe(
        data => {
          console.log(data);
          localStorage.setItem('admin', 'true');
          localStorage.setItem('token', data);          
          localStorage.setItem('username', this.authentication.username);
          localStorage.setItem('password', this.authentication.password);
          this.router.navigate(['/lista-contatos']);
        }
      );      
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text:'Login ou senha inválidos.'
      })
    }
  }
}
