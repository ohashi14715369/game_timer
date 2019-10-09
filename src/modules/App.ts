import { ActionCreator } from 'redux';

import { initNotifications, notify } from 'browser-notification';
initNotifications();

// Constants
export enum AppActionType {
    INITIALIZE = 'App/INITIALIZE',
    RINGER = 'App/RINGER',
    ADD_SOUND_RESOURCE = 'App/ADD_SOUND_RESOURCE',
};

// Types

// Actions
export interface AppInitializeAction {
    type: AppActionType.INITIALIZE;
}
export interface AppRingerAction {
    type: AppActionType.RINGER,
    timerId: number;
}
export type AppActionTypes =
    AppInitializeAction
    | AppRingerAction
    ;


// ActionCreators
export const initialize: ActionCreator<AppInitializeAction> = () => {
    return { type: AppActionType.INITIALIZE };
};

export const ringer: ActionCreator<AppRingerAction> = (timerId: number) => {
    notify("", { body: "" });
    return { type: AppActionType.RINGER, timerId };
};

// State
export interface SoundResource {
    id: number;
    soundId: number;
    soundName: string;
    soundSource: Blob | null;
}
export interface SoundBind {
    timerId: number;
    soundResourceId: number;
}
export interface AppState {
    soundResourceList: SoundResource[];
    bindList: SoundBind[];
}
const initialState: AppState = {
    soundResourceList: [],
    bindList: [],
};

// Reducer
export const reducer = (state: AppState = initialState, action: AppActionTypes): AppState => {
    switch (action.type) {
        default:
            return state;
    }
}