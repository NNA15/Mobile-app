import {
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST,
} from '../ActionTypes';

export const Reducers2 = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_WISHLIST:
            const isItemExist = state.some(item => item.name === action.payload.name);
            if (!isItemExist) {
                // Nếu chưa tồn tại, thêm vào state
                return [...state, action.payload];
            } else {
                // Nếu đã tồn tại, không thêm vào và trả về state hiện tại
                return state;
            }

        case REMOVE_FROM_WISHLIST:
            const deleteArray2 = state.filter((item, index) => {
                return index !== action.payload;
            });

            return deleteArray2;
        default:
            return state;
    }
};