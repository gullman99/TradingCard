import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as actions from '../inventory.actions';
import * as fromInventory from '../inventory.reducer';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {

  cards: any = [];
  cardId = 0;
  form: FormGroup;
  fName: string;
  lName: string;
  estimatedValue: number;

  constructor(public store: Store<fromInventory.State>) {
    this.fName = '';
    this.lName = '';
    this.estimatedValue = 0;
    this.form = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
      ])
    })
   }

  ngOnInit(): void {
    this.cards = this.store.select(fromInventory.selectAll);
  }

  addCard(): void {
    this.cardId = this.cardId + 1;
    console.warn('add');
    const card: any = {
      id: this.cardId,
      firstName: this.fName,
      lastName: this.lName,
      value: this.estimatedValue
    };

    this.store.dispatch( new actions.Create(card));

    this.clearForm();
  }

  clearForm(): void {
    this.fName = '';
    this.lName = '';
    this.estimatedValue = 0;
  }

}
