import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import createtimer from './createtimer';
import gametimer from './gametimer';

const reducer = combineReducers({
    form:formReducer,
    createtimer,
    gametimer
});

export default reducer;