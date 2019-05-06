import { CREATE_TIMER } from '../utils/actionTypes';
import PouchDB from 'pouchdb';
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
export const createTimerRegister = () => {
    return function (dispatch, getState) {
        const { hour, minute, second } = getState().createtimer;
        timerTable.put({ _id: new Date(), hour, minute, second }).then(result => {
            dispatch(
                {
                    type: CREATE_TIMER.REGISTER,
                    hour,
                    minute,
                    second
                });
            dispatch(createTimerClose());
        });
    };
};
export const loadGameTimer = () => {
    return function (dispatch) {
        timerTable.allDocs({ include_docs: true }).then(results => {
            console.log(results);
            _.forEach(results.rows, (row) => {
                dispatch({
                    type: CREATE_TIMER.REGISTER,
                    hour: row.doc.hour,
                    minute: row.doc.minute,
                    second: row.doc.second
                });
            });
        });
    }
}