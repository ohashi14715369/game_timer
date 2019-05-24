import { GAME_TIMER } from '../utils/actionTypes';
import _ from 'lodash';

const initialState = {
    timers: [],
    visibleDrawer: false
};
const gametimer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case GAME_TIMER.ADD_TIMER_INSTANCE:
            var temp = Object.assign({}, action);
            delete temp["type"];
            return {
                ...state,
                timers: _.concat(state.timers, {
                    ...temp,
                    audioBuffer: null
                })
            };
        case GAME_TIMER.REMOVE_TIMER_INSTANCE:
        case GAME_TIMER.DELETE_TIMER:
            return {
                ...state,
                timers: _.chain(state.timers).reject(timer => timer.instanceId === action.instanceId).value()
            };
        case GAME_TIMER.SHOW_DRAWER:
            return {
                ...state,
                visibleDrawer: true
            };
        case GAME_TIMER.HIDE_DRAWER:
            return {
                ...state,
                visibleDrawer: false
            };
        case GAME_TIMER.UPDATE_APP:
            return { ...state };
        case GAME_TIMER.NOTIFY_TIMER: {
            const { instanceId } = action.timer;
            var ret = {
                ...state,
                timers: _.chain(state.timers).map(timer => {
                    if (timer.instanceId === instanceId) {
                        return { ...timer, ringing: true }
                    } else {
                        return timer;
                    }
                }).value()
            };
            return ret;
        }
        case GAME_TIMER.STOP_RINGING: {
            const { instanceId } = action;
            return {
                ...state,
                timers: _.chain(state.timers).map(timer => {
                    if (timer.instanceId === instanceId) {
                        return { ...timer, ringing: false }
                    } else {
                        return timer;
                    }
                }).value()
            };
        }
        case GAME_TIMER.LOAD_AUDIO: {
            const { instanceId, soundSource } = action;
            return {
                ...state,
                timers: _.chain(state.timers).map(timer => {
                    if (timer.instanceId === instanceId) {
                        return { ...timer, soundSource }
                    } else {
                        return timer;
                    }
                }).value()
            };
        }
        default:
            return { ...state };
    }
};
export default gametimer;