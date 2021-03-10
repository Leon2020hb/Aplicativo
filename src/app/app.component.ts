import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Artigos', url: '/articles', icon: 'mail' },
    { title: 'Notícias', url: '/news', icon: 'paper-plane' },
    { title: 'Faça Contato', url: '/contacts', icon: 'heart' },
    { title: 'Sobre', url: '/about', icon: 'information-cicle' },
   
  ];

  constructor() {}
}
