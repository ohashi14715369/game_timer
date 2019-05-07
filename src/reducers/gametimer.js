import { CREATE_TIMER, GAME_TIMER } from '../utils/actionTypes';
import _ from 'lodash';

const initialState = {
    timers: []
};
const gametimer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TIMER.REGISTER:
            return {
                ...state,
                timers: _.concat(state.timers, {
                    id: action.id,
                    hour: action.hour,
                    minute: action.minute,
                    second: action.second
                })
            };
        case GAME_TIMER.DELETE:
            return {
                ...state,
                timers: _.chain(state.timers).reject(timer => timer.id === action.id).value()
            };
        default:
            return { ...state };
    }
};
export default gametimer;