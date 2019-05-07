import { CREATE_TIMER, GAME_TIMER } from '../utils/actionTypes';
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
    return (dispatch, getState) => {
        const { hour, minute, second } = getState().createtimer;
        const id = new Date();
        timerTable.put({ _id: id, hour, minute, second }).then(result => {
            dispatch(
                {
                    type: CREATE_TIMER.REGISTER,
                    id,
                    hour,
                    minute,
                    second
                });
            dispatch(createTimerClose());
        });
    };
};
export const timerDelete = (id) => {
    return (dispatch, getState) => {
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
                    hour: row.doc.hour,
                    minute: row.doc.minute,
                    second: row.doc.second
                });
            });
        });
    }
}