import { CREATE_TIMER } from '../utils/actionTypes';
const initialState = {
    show: false,
    hour: 0,
    minute: 0,
    second: 0
};
const createtimer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TIMER.OPEN:
            return {
                ...state,
                show: true,
                hour: 0,
                minute: 0,
                second: 0
            };
        case CREATE_TIMER.CLOSE:
            return {
                ...state,
                show: false
            };
        case CREATE_TIMER.CHANGE:
            return {
                ...state,
                [action.key]: action.value
            };
        case CREATE_TIMER.REGISTER:
            return {
                ...state,
                show: false
            };
        default:
            return { ...state };
    }
};
export default createtimer;