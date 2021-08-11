import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosService } from '../service/usuarios/usuarios.service';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.scss']
})
export class FormUsuariosComponent implements OnInit {

  formUsuarios = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    admin: new FormControl({value:false}, [])      
  })

  constructor(private router: Router, public usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.botaoEdit.subscribe( edit => {
      if(edit !== null){
        this.formUsuarios.get('name').setValue(edit.name);
        this.formUsuarios.get('username').setValue(edit.username);
        this.formUsuarios.get('password').setValue(edit.password);        
        this.formUsuarios.get('admin').setValue(edit.admin);
        //this.formContatos.get('id').setValue(edit.id);
      }
    });
  }

  save(){
    if(this.formUsuarios.valid){
      Swal.fire({
        icon: 'success',
        title: 'Eeeeeba..',
        text: 'Usuario criado com sucesso!'
      });
      this.router.navigate(['/lista-usuarios']);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Ooooops..',
        text: 'Cadastro não realizado, ' + 'preencha corretamente todos os campos'
      });
    }
  }

}
