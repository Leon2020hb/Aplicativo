import { Component, OnInit } from '@angular/core';

// 1) Importa dependÃªncias
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { AlertController } from '@ionic/angular';

// 6) ValidaÃ§Ã£o (filtro) personalizada
// NÃ£o permite campos somente com espaÃ§os
export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  // 3) Criar atributos
  public contactForm: FormGroup;  // Cria o formulÃ¡rio
  pipe = new DatePipe('en_US'); // Formatador de datas

  constructor(

    // 2) Injeta dependÃªncias
    public form: FormBuilder,
    public firestore: AngularFirestore,
    public alert: AlertController
  ) { }

  ngOnInit() {

    // 4) Cria os campos do formulário
    this.contactFormCreate();

  }

  // 5) Cria os campos do formulário
  contactFormCreate() {

    this.contactForm = this.form.group({

      // Data do envio (date)
      date: [''],

      // Nome (name)
      name: [
        '',   // Valor inicial
        Validators.compose([  // Valida campo
          Validators.required,  // Campo obrigatório
          Validators.minLength(3),  // Deve ter pelo menos 3 caracteres
          removeSpaces // Remove espaços duplicados
        ])
      ],

      // E-mail (email)
      email: [
        '',   // Valor inicial
        Validators.compose([  // Valida campo
          Validators.required,  // Campo obrigatório
          Validators.email,  // Deve ser um e-mail válido
          removeSpaces // Remove espaços duplicados
        ])
      ],

      // Assunto (subject)
      subject: [
        '',   // Valor inicial
        Validators.compose([  // Valida campo
          Validators.required,  // Campo obrigatório
          Validators.minLength(5),  // Deve ter 5 ou mais caracteres
          removeSpaces // Remove espaÃ§os duplicados
        ])
      ],

      // Mensagem (message)
      message: [
        '',   // Valor inicial
        Validators.compose([  // Valida campo
          Validators.required,  // Campo obrigatório
          Validators.minLength(5),  // Deve ter 5 ou mais caracteres
          removeSpaces // Remove espaÃ§os duplicados
        ])
      ]
    });
  }

  // 7) Processa envio do formulário
  contactSend() {

    // Gera e formata a data de envio
    this.contactForm.controls.date.setValue(
      this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss')
    );

    // Teste
    // console.log(this.contactForm.value);

    // Salva no Firestore
    this.firestore.collection('contacts').add(this.contactForm.value)

      // Se salvar
      .then(
        () => {

          // Feedback
          this.feedback();
        }
      )

      // Se falhar
      .catch(
        (error) => {
          alert(`Oooops! Algo deu errado! ${error}`);
        }
      );
  }

  // 8) Popup de feedback
  async feedback() {
    const alert = await this.alert.create({
      header: 'Oba!',  // TÃ­tulo do alert
      message: 'Seu contato foi enviado para o "Munecos".', // Mensagem do alert
      buttons: [

        // Botão [Ok] e sua aÃ§Ã£o
        {
          text: 'OK',  // Texto do botão
          handler: () => {  // AÃ§Ã£o do botão

            // Reset do formulário, mantendo nome e e-mail já usados
            this.contactForm.reset({
              date: '',
              name: this.contactForm.value.name.trim(),
              email: this.contactForm.value.email.trim(),
              subject: '',
              message: ''
            });
          }
        }
      ]
    });

    await alert.present();
  }
}