import { CREATE_TIMER } from '../utils/actionTypes';
import _ from 'lodash';

const initialState = {
    timers: []
};
const gametimer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TIMER.REGISTER:
            return {
                ...state,
                timers: _.concat(state.timers, { hour: action.hour, minute: action.minute, second: action.second })
            };
        default:
            return { ...state };
    }
};
export default gametimer;