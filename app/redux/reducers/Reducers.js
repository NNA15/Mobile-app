import {
    ADD_TO_CART,
    //ADD_TO_WISHLIST,
    REMOVE_FROM_CART,
    //REMOVE_FROM_WISHLIST,
} from '../ActionTypes';

export const Reducers = (State = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [...State, action.payload];

        case REMOVE_FROM_CART:
            const deleteArray1 = State.filter((item, index) => {
                return index !== action.payload;
            });

            return deleteArray1;
        default:
            return State;
    }
};