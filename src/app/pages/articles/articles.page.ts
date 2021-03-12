import { Component, OnInit } from '@angular/core';

// Importa dependencias
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {

  //3) Cria atributos
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;

  constructor(

    //2) Injeta dependencias
    private firestore: AngularFirestore
  ) { 
    // 4) Obtem dados de database
    this.itemsCollection = firestore.collection<any>('articles');
    this.items = this.itemsCollection.valueChanges({idField:"id"});
  }
 
  ngOnInit() {
  }

}
