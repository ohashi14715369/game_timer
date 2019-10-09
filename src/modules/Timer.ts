import { ActionCreator } from 'redux';

import { find } from 'lodash';

import { RootThunk } from '../store';


// Constants
const TICK_INTERVAL: number = 16;

export enum TimerActionType {
    CREATE = "Timer/CREATE",
    REMOVE = "Timer/REMOVE",
    START = "Timer/START",
    PAUSE = "Timer/PAUSE",
    RING = "Timer/RING",
    RESET = "Timer/RESET",
    TICK_START = "Timer/TICK_START",
    TICK = "Timer/TICK",
    TICK_END = "Timer/TICK_END",
};

// Types
export interface TimerCreateRequest {
    name: string,
    length: number
}

// Actions
export interface TimerCreateAction {
    type: TimerActionType.CREATE;
    request: TimerCreateRequest;
}

export interface TimerRemoveAction {
    type: TimerActionType.REMOVE;
    id: number;
}

export interface TimerStartAction {
    type: TimerActionType.START;
    id: number;
    timerId: NodeJS.Timeout;
}

export interface TimerRingAction {
    type: TimerActionType.RING;
    id: number;
}

export interface TimerPauseAction {
    type: TimerActionType.PAUSE;
    id: number;
}

export interface TimerResetAction {
    type: TimerActionType.RESET;
    id: number;
}

export interface TimerTickStartAction {
    type: TimerActionType.TICK_START,
    tickTimer: NodeJS.Timeout
};

export interface TimerTickAction {
    type: TimerActionType.TICK;
    now: number;
    pass: number;
}

export interface TimerTickEndAction {
    type: TimerActionType.TICK_END
};

export type TimerActionTypes =
    TimerCreateAction
    | TimerRemoveAction
    | TimerStartAction
    | TimerRingAction
    | TimerPauseAction
    | TimerResetAction
    | TimerTickStartAction
    | TimerTickAction
    | TimerTickEndAction
    ;


// ActionCreators
export const create: ActionCreator<TimerCreateAction> = (request: TimerCreateRequest) => {
    return { type: TimerActionType.CREATE, request }
};
export const remove: ActionCreator<TimerRemoveAction> = (id: number) => {
    return { type: TimerActionType.REMOVE, id }
};

export const start: ActionCreator<RootThunk<void>> = (id: number) => {
    return (dispatch, getState) => {
        const { timers, tickTimer } = getState().timer;
        const timer = findTimer(timers, id);
        const timerId = setTimeout(() => {
            dispatch(ring(id));
        }, timer.length);
        if (!tickTimer) {
            dispatch(tickStart());
        }
        dispatch({ type: TimerActionType.START, id, timerId });
    };
};

export const ring: ActionCreator<TimerRingAction> = (id: number) => {
    return { type: TimerActionType.RING, id };
};

export const pause: ActionCreator<TimerPauseAction> = (id: number) => {
    return { type: TimerActionType.PAUSE, id };
};

export const reset: ActionCreator<TimerResetAction> = (id: number) => {
    return { type: TimerActionType.RESET, id };
};

export const tickStart: ActionCreator<RootThunk<void>> = () => {
    return (dispatch) => {
        const tickTimer = setInterval(() => {
            dispatch(tick());
        }, TICK_INTERVAL);
        dispatch({ type: TimerActionType.TICK_START, tickTimer });
    };
};

export const tick: ActionCreator<RootThunk<void>> = () => {
    return (dispatch, getState) => {
        const now = new Date().getTime();
        const { timers, prevTick } = getState().timer;
        const pass = now - prevTick;
        timers.forEach(timer => {
            if (timer.live && !timer.ringing && timer.left <= pass) {
                dispatch(ring(timer.id));
            }
        });
        dispatch({ type: TimerActionType.TICK, now, pass });
    };
};

export const tickEnd: ActionCreator<RootThunk<void>> = () => {
    return (dispatch, getState) => {
        const { tickTimer } = getState().timer;
        if (tickTimer) {
            clearInterval(tickTimer);
        }
        dispatch({ type: TimerActionType.TICK_END });
    };
};

export interface TimerActions {
    create: typeof create;
    remove: typeof remove;
    start: typeof start;
    ring: typeof ring;
    pause: typeof pause;
    reset: typeof reset;
    tick: typeof tick;
    tickStart: typeof tickStart;
    tickEnd: typeof tickEnd;
};
// State
export interface Timer {
    id: number;
    name: string;
    length: number;
    left: number;
    live: boolean;
    ringing: boolean;
    soundName: string | null;
    soundSource: Blob | null;
}
export interface TimerState {
    timers: Timer[];
    tickTimer: NodeJS.Timeout | null;
    prevTick: number;
}
const initialState: TimerState = {
    timers: [],
    tickTimer: null,
    prevTick: 0
};

export const findTimer = (list: Timer[], id: number): Timer => {
    const ret = find<Timer>(list, { id });
    if (ret) {
        return ret;
    }
    throw new Error("Not found timer. id:" + id + " list:" + list);
}

// Reducer
export const reducer = (state: TimerState = initialState, action: TimerActionTypes): TimerState => {
    switch (action.type) {
        case TimerActionType.CREATE:
            const newInstance: Timer = {
                id: new Date().getTime(),
                name: action.request.name,
                length: action.request.length,
                left: action.request.length,
                live: false,
                ringing: false,
                soundName: null,
                soundSource: null,
            };
            return {
                ...state,
                timers: [...state.timers, newInstance]
            };
        case TimerActionType.REMOVE:
            return {
                ...state,
                timers: state.timers.filter(timer => timer.id !== action.id)
            }
        case TimerActionType.START:
            return {
                ...state,
                timers: state.timers.map(timer => {
                    if (timer.id === action.id) {
                        return {
                            ...timer,
                            live: true,
                        };
                    }
                    return timer;
                }),
            }
        case TimerActionType.PAUSE:
            return {
                ...state,
                timers: state.timers.map(timer => {
                    if (timer.id === action.id) {
                        return {
                            ...timer,
                            live: false
                        }
                    }
                    return timer;
                })
            }
        case TimerActionType.RING:
            return {
                ...state,
                timers: state.timers.map(timer => {
                    if (timer.id === action.id) {
                        return {
                            ...timer,
                            ringing: true
                        }
                    }
                    return timer;
                })
            };
        case TimerActionType.TICK_START:
            return {
                ...state,
                tickTimer: action.tickTimer,
                prevTick: new Date().getTime()
            }
        case TimerActionType.TICK:
            const { now, pass } = action;
            return {
                ...state,
                timers: state.timers.map(timer => {
                    if (timer.live) {
                        return {
                            ...timer,
                            left: timer.left - pass
                        }
                    }
                    return timer;
                }),
                prevTick: now
            };
        case TimerActionType.TICK_END:
            return {
                ...state,
                tickTimer: null,
                prevTick: 0
            }
        default:
            return state;
    }
}