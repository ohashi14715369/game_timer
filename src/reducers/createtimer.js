import * as actionTypes from '../utils/actionTypes';
const initialState = {
    show: false
};
const createtimer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_CREATE_TIMER:
            return {
                ...state,
                show: true
            };
        case actionTypes.CLOSE_CREATE_TIMER:
            return {
                ...state,
                show: false
            }
        default:
            return { ...state };
    }
};
export default createtimer;