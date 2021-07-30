import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as actions from '../inventory.actions'
import * as fromInventory from '../inventory.reducer'
@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {

  cards: any = []
  cardId = 0

  constructor(private store: Store<fromInventory.State>) { }

  ngOnInit(): void {
    this.cards = this.store.select(fromInventory.selectAll)
  }

  addCard() {
    const card: any = {
      id: this.cardId + 1,
      // firstName: 'test'
    }

    this.store.dispatch( new actions.Create(card))
  }

}
