import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Contacts } from '../models/contacts';
import { ContatosService } from '../service/contatos/contatos.service';

@Component({
  selector: 'app-form-contatos',
  templateUrl: './form-contatos.component.html',
  styleUrls: ['./form-contatos.component.scss']
})
export class FormContatosComponent implements OnInit {

  formContatos = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required])  
  })

  contact: Contacts;

  constructor(private router: Router, public contatosService: ContatosService) { }

  ngOnInit(): void {
    this.contatosService.botaoEdit.subscribe( edit => {
      if(edit !== null){
        this.formContatos.get('name').setValue(edit.name);
        this.formContatos.get('phone').setValue(edit.phone);
        this.formContatos.get('email').setValue(edit.email);
        //this.formContatos.get('id').setValue(edit.id);
      }
    });
  }

  validation(){
    if (this.formContatos.valid){
      if (this.contact){
        this.edit(this.contact);
      }else{
        this.create();
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Ooooops..',
        text: 'Cadastro não realizado,' +
        'preencha corretamente todos os campos'
      });
    }
  }

  edit(contact: Contacts){
    contact.name =  this.formContatos.get('name').value;
    contact.phone = this.formContatos.get('phone').value;
    contact.email =  this.formContatos.get('email').value;
    this.contatosService.updateContacts(contact).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Eeeeeba..',
          text: 'Contato editado com sucesso!'
        });
        this.router.navigate(['/lista-contatos']);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Ooops..',
            text: 'Erro ao editar contato!'
          });
        }
    );
  }

  create(){
    this.contatosService.createContacts(this.formContatos.value).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Eeeeeba..',
          text: 'Contato criado com sucesso!'
        });
        this.router.navigate(['/lista-contatos']);
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Ooops..',
            text: 'Erro ao criar contato!'
          });
        }
    );
  }
  

}
