import { CREATE_TIMER, GAME_TIMER } from '../utils/actionTypes';
import PouchDB from 'pouchdb';
import { SubmissionError } from 'redux-form';
import _ from 'lodash';

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
    const { label, hour, minute, second } = values;
    if (!label) {
        throw new SubmissionError({
            label: 'Not Empty',
            _error: 'Not Empty'
        });
    }
    if (hour + minute + second === 0) {
        throw new SubmissionError({
            second: 'Not Zero',
            _error: 'Not Zero'
        });
    }
    return (dispatch) => {
        const id = new Date();
        timerTable.put({ _id: id, label, hour, minute, second }).then(result => {
            dispatch(
                {
                    type: CREATE_TIMER.REGISTER,
                    id,
                    label,
                    hour,
                    minute,
                    second
                });
            dispatch(createTimerClose());
        });
    };
};
export const timerDelete = (id) => {
    return (dispatch) => {
        timerTable.get(id).then(doc => timerTable.remove(doc)).then(dispatch({
            type: GAME_TIMER.DELETE,
            id
        }));
    };
};
export const loadGameTimer = () => {
    return function (dispatch) {
        timerTable.allDocs({ include_docs: true }).then(results => {
            console.log(results);
            _.forEach(results.rows, (row) => {
                dispatch({
                    type: CREATE_TIMER.REGISTER,
                    id: row.doc._id,
                    label: row.doc.label,
                    hour: row.doc.hour,
                    minute: row.doc.minute,
                    second: row.doc.second
                });
            });
        });
    }
}
export const showDrawer = () => { return { type: GAME_TIMER.SHOW_DRAWER }; }
export const hideDrawer = () => { return { type: GAME_TIMER.HIDE_DRAWER }; }
export const updateApp = () => { return { type: GAME_TIMER.UPDATE_APP }; }