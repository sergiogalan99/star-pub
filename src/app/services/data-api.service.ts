import { TabacoInterface } from './../models/tabacos';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, private auth: AngularFireAuth) { }
  private tabacosCollection: AngularFirestoreCollection<TabacoInterface>;
  private tabacos: Observable<TabacoInterface[]>;
  private tabacoDoc: AngularFirestoreDocument<TabacoInterface>;
  private tabaco: Observable<TabacoInterface>;
  public selectedTabaco: TabacoInterface = {
  };


  getAllTabacos() {
    const tabacosCollectionRef = this.afs.collection<TabacoInterface>('tabacos');

    return tabacosCollectionRef.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as TabacoInterface;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));

  }

  setTabaco(tabaco: TabacoInterface, image) {
    const id = this.afs.createId();
    const filePath = `tabacos/${id}`;

    this.storage.ref(filePath);
    this.storage.upload(filePath, image).then(() => {
      this.afs.collection('tabacos').doc(id).set(tabaco);
    });
  }


  deleteTabaco(idTabaco: string): Promise<any> {
    this.storage.ref('tabacos/' + idTabaco).delete();
    return this.afs.collection('tabacos').doc(idTabaco).delete();
  }

  getImageTabacos(imageName: string) {
    return this.storage.storage.ref('tabacos/' + imageName).getDownloadURL();
  }
}
