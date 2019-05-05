import { combineReducers } from 'redux';
import createtimer from './createtimer';
import gametimer from './gametimer';

const reducer = combineReducers({
    createtimer,
    gametimer
});

export default reducer;