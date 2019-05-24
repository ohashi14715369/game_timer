import { CREATE_TIMER, GAME_TIMER } from '../utils/actionTypes';
import PouchDB from 'pouchdb';
import { SubmissionError } from 'redux-form';
import _ from 'lodash';
import { initAudioContext, createSoundBuffer, playSound, stopSound } from '../utils/sound';

const timerTable = new PouchDB("TIMER");

export const createTimerOpen = () => ({
    type: CREATE_TIMER.OPEN
});
export const createTimerClose = () => ({
    type: CREATE_TIMER.CLOSE
});
export const createTimerChange = (key, value) => ({
    type: CREATE_TIMER.CHANGE,
    key,
    value
});
export const createTimerRegister = (values) => {
    const { label, hour, minute, second, sound } = values;
    var errors = {};
    if (!label) {
        errors = { ...errors, second: 'Not empty' };
    }
    if (hour + minute + second === 0) {
        errors = { ...errors, second: 'Not zero' };
    }
    if (Object.keys(errors).length > 0) {
        throw new SubmissionError({ ...errors, _error: true });
    }
    return (dispatch) => {
        const instanceId = new Date();
        const _attachments = sound && {
            sound: { type: sound.type, data: sound }
        };
        const soundName = sound && sound.name;
        timerTable.put({
            _id: instanceId,
            _attachments,
            label, hour, minute, second, soundName
        }).then(result => {
            timerTable.get(result.id).then(doc => {
                readDbRow(dispatch, doc);
            });
        });
    };
};
export const deleteTimer = (instanceId) => {
    return (dispatch) => {
        timerTable.get(instanceId).then(doc => timerTable.remove(doc)).then(dispatch({
            type: GAME_TIMER.DELETE_TIMER,
            instanceId
        }));
    };
};
export const addTimerInstance = (timerInstance) => {
    return {
        type: GAME_TIMER.ADD_TIMER_INSTANCE,
        ...timerInstance
    };
};
export const loadGameTimer = () => {
    return function (dispatch) {
        timerTable.allDocs({ include_docs: true }).then(results => {
            console.log("load from db");
            _.forEach(results.rows, (row) => readDbRow(dispatch, row.doc));
        });
    }
}
const readDbRow = (dispatch, row) => {
    const { _id, label, hour, minute, second, soundName } = row;
    if (soundName) {
        timerTable.getAttachment(_id, 'sound').then(blob => {
            createSoundBuffer(blob, soundSource => {
                dispatch(addTimerInstance({
                    instanceId: _id,
                    label,
                    hour,
                    minute,
                    second,
                    soundName,
                    soundSource
                }));
                dispatch(createTimerClose());
            });
        });
    }
    else {
        dispatch(addTimerInstance({
            instanceId: _id,
            label,
            hour,
            minute,
            second,
            soundName,
            soundSource: null
        }));
        dispatch(createTimerClose());
    }
}
export const showDrawer = () => { return { type: GAME_TIMER.SHOW_DRAWER }; }
export const hideDrawer = () => { return { type: GAME_TIMER.HIDE_DRAWER }; }
export const updateApp = () => {
    return dispatch => {
        navigator.serviceWorker.getRegistration()
            .then(registration => {
                if (registration) {
                    registration.unregister();
                }
                window.location.reload(true);
                dispatch({ type: GAME_TIMER.UPDATE_APP });
            });
    };
}
export const startTimer = (instanceId) => {
    initAudioContext();
    return { type: GAME_TIMER.START_TIMER };
}
export const notifyTimer = (instanceId) => {
    return (dispatch, getStore) => {
        const { timers } = getStore().gametimer;
        var timer = _.find(timers, timer => timer.instanceId === instanceId);
        var silent = false;
        if (timer.soundSource) {
            silent = true;
            playSound(timer.soundSource);
        }
        new Notification(timer.label + " was done!", { silent });
        dispatch({ type: GAME_TIMER.NOTIFY_TIMER, timer });
    }
};
export const stopRinging = (instanceId) => {
    return (dispatch, getStore) => {
        const { timers } = getStore().gametimer;
        var timer = _.find(timers, timer => timer.instanceId === instanceId);
        if (timer.soundSource) {
            stopSound(timer.soundSource);
        }
        dispatch({ type: GAME_TIMER.STOP_RINGING, instanceId });
    }

}