import * as actions from './inventory.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

export interface Card {
    id: string;
    // firstName: string;
    // lastName: string;
}

export const inventoryAdapter = createEntityAdapter<Card>();
export interface State extends EntityState<Card> {}

const defaultCard = {
    ids: ['001'],
    entities: {
        '001': {
            firstName: 'Test',
            lastName: 'last'
        }
    }
}


export const initialState: State = inventoryAdapter.getInitialState(defaultCard);

export function inventoryReducer(
    state: State = initialState,
    action: actions.InventoryActions
) {
    switch (action.type) {
        case actions.CREATE:
            return inventoryAdapter.addOne(action.card, state)
        case actions.UPDATE:
            return inventoryAdapter.updateOne({
                id: action.id,
                changes: action.changes
            }, state)
        case actions.DELETE:
            return inventoryAdapter.removeOne(action.id, state)

        default:
            return state;
    }
};
export const getInventoryState = createFeatureSelector<State>('card')

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = inventoryAdapter.getSelectors();