import * as actions from './inventory.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

export interface Card {
    id: string;
    firstName: string;
    lastName: string;
    value: number;
    number: number;
    team: string;

}

export const inventoryAdapter = createEntityAdapter<Card>();

export interface State extends EntityState<Card> {}

const defaultCard = {
    ids: [],
    entities: {}
};


export const initialState: State = inventoryAdapter.getInitialState(defaultCard);

export function inventoryReducer(
    state: State = initialState,
    action: any = actions.CREATE
): any {
    switch (action.type) {
        case actions.CREATE:
            console.warn(action);
            return inventoryAdapter.addOne(action.card, state);
        // case actions.UPDATE:
        //     return inventoryAdapter.updateOne({
        //         id: action.id,
        //         changes: action.changes
        //     }, state);
        // case actions.DELETE:
        //     return inventoryAdapter.removeOne(action.id, state);

        default:
            return state;
    }
}

export const getInventoryState = createFeatureSelector<State>('inventory');

// export const {
//     selectIds,
//     selectEntities,
//     selectAll,
//     selectTotal
// } = inventoryAdapter.getSelectors(getInventoryState);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
  } = inventoryAdapter.getSelectors(getInventoryState);
