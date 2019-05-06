import { CREATE_TIMER } from '../utils/actionTypes';
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
        dispatch(
            {
                type: CREATE_TIMER.REGISTER,
                hour,
                minute,
                second
            });
        dispatch(createTimerClose());
    };
}