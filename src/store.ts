import { combineReducers } from "redux";
import { ThunkAction } from "redux-thunk";
import * as TimerModule from "./modules/Timer";
import * as SoundModule from "./modules/Sound";
const reducers = {
  timer: TimerModule.reducer,
  sound: SoundModule.reducer,
};
const reducer = combineReducers(reducers);
export type RootState = ReturnType<typeof reducer>;
export type RootActionTypes = TimerModule.TimerActionTypes | SoundModule.SoundActionTypes;
export type RootThunk<R> = ThunkAction<R, RootState, undefined, RootActionTypes>;
export default reducer;
