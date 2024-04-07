import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
} from '../ActionTypes';

export const Reducers = (State = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const isItemExist = State.some(item => item.name === action.payload.name);
            if (!isItemExist) {
                // Nếu chưa tồn tại, thêm vào state
                return [...State, action.payload];
            } else {
                // Nếu đã tồn tại, không thêm vào và trả về state hiện tại
                return State;
            }

        case REMOVE_FROM_CART:
            const deleteArray1 = State.filter((item, index) => {
                return index !== action.payload;
            });

            return deleteArray1;
        default:
            return State;
    }
};