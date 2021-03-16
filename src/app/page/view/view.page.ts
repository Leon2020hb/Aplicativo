
import { Component, OnInit } from '@angular/core';

// 1) Importa dependÃªncias
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// 4) Importa componente de manipulaÃ§Ã£o de rotas
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  // 3) Atributos
  private itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
  id: string;

  constructor(

    // 2) Injeta dependÃªncias
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) {

    // 5) ObtÃ©m o id do artigo a ser exibido
    this.id = this.route.snapshot.paramMap.get('id');

    // 6) Consulta o banco de dados
    this.itemDoc = firestore.doc<any>(`articles/${this.id}`);
    this.item = this.itemDoc.valueChanges();
  }

  ngOnInit() {}

}
