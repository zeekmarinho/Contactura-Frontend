import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../models/user';
import { UsuariosService } from '../service/usuarios/usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  userList: User[];
  collection = {count: 10, data: []};
  constructor(public usuariosService:UsuariosService, private router: Router) { }

  ngOnInit(): void { 
    this.populateUser();   
  }

  //método para preencher os usuarios com dados mocados
  populateUser(){
    for (let i = 0; i < this.collection.count; i++) {
      this.collection.data.push({
        name: 'teste' + i,
        email: 'email' + i + '@contactura.com' ,
        phone: '(' + 0 + 8 + 1 + ')' + 9 + i + i + i + i + '-' + i + i + i + i
      });
    }
    this.userList = this.collection.data;
  }

  editUsuarios(usuarios: User){
    this.usuariosService.getUsersList(usuarios);
    this.router.navigate(['/cadastro-usuarios']);
  }

  deleteUser(usuarios: User){
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Deseja mesmo deletar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if(result.isConfirmed) {
        Swal.fire(
          'Usuario deletado com sucesso!',
        );
      }
    });
  }

}
