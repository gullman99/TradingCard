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
  totalEstimatedVal: number;

  constructor(public store: Store<fromInventory.State>) {
    this.totalEstimatedVal = 0;

    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      estimatedValue: new FormControl(null),
      playerNumber: new FormControl(null, [Validators.required]),
      teamName: new FormControl(null, [Validators.required]),
    })
   }

  ngOnInit(): void {
    this.cards = this.store.select(fromInventory.selectAll);
  }

  addCard(): void {
    this.cardId = this.cardId + 1;
    const card: any = {
      id: this.cardId,
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      estimatedValue: this.form.controls.estimatedValue.value,
      playerNumber: this.form.controls.playerNumber.value,
      teamName: this.form.controls.teamName.value
    };

    this.store.dispatch( new actions.Create(card));
    this.clearForm();
    this.totalEstimatedValue();
  }

  totalEstimatedValue(): void{
    let cards: any;
    let value: any = 0;
    this.store.select(fromInventory.selectAll).subscribe(data => cards = data);
    cards.forEach((val: any) => {
      value = value + val.estimatedValue
    });
    this.totalEstimatedVal = value
  }

  clearForm(): void {
    this.form.reset()
  }

}
