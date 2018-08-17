import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../../node_modules/angularfire2/database';

@Injectable()
export class CategoryService {


  constructor(private db: AngularFireDatabase) { }

  getAll()  {
    return this.db.list('/categories',{
      query: {
        orderByChild:'name'
      }
    });
  }
}
