import { CREATE_TIMER } from '../utils/actionTypes';
import _ from 'lodash';

const initialState = {
    timers: [],
    currentTimerId: 0
};
const gametimer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TIMER.REGISTER:
            return {
                ...state,
                currentTimerId: state.currentTimerId + 1,
                timers: _.concat(state.timers, {
                    timerId: state.currentTimerId,
                    hour: action.hour,
                    minute: action.minute,
                    second: action.second
                })
            };
        default:
            return { ...state };
    }
};
export default gametimer;