import { Action, ActionCreator, Dispatch } from 'redux';
import audioContextCreator from 'audio-context';
import { toArrayBuffer } from '../utils/dataConverter';

import { RootThunk } from '../store';

// Constants
enum SoundActionType {
    INITIALIZE = 'Sound/INITIALIZE',
    LOAD = 'Sound/LOAD',
    PLAY = 'Sound/PLAY',
    STOP = 'Sound/STOP',
};
class SoundError implements Error {
    public name = 'SoundError';
    constructor(public message: string) {
    }
    toString() {
        return this.name + ":" + this.message;
    }
}

// Actions
export interface SoundInitializeAction extends Action {
    type: SoundActionType.INITIALIZE;
    audioContext: AudioContext;
}
export interface SoundLoadAction extends Action {
    type: SoundActionType.LOAD;
    id: number;
    soundBuffer: AudioBufferSourceNode;
}

export interface SoundPlayAction extends Action {
    type: SoundActionType.PLAY;
    id: number;
}

export interface SoundStopAction extends Action {
    type: SoundActionType.STOP;
    id: number;
}

export type SoundActionTypes =
    SoundInitializeAction
    | SoundLoadAction
    | SoundPlayAction
    | SoundStopAction;

// ActionCreators

export const initialize: ActionCreator<SoundInitializeAction> = () => {
    const audioContext = audioContextCreator();
    if (audioContext) {
        return { type: SoundActionType.INITIALIZE, audioContext };
    }
    throw new SoundError('initialize failed');
}

export const load: ActionCreator<RootThunk<void>> = (name: string, blob: Blob) => {
    return async (dispatch: Dispatch, getState) => {
        const { audioContext } = getState().sound;
        if (audioContext) {
            toArrayBuffer(blob, (buffer) => {
                audioContext.decodeAudioData(buffer, (audioBuffer) => {
                    const source: AudioBufferSourceNode = audioContext.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(audioContext.destination);
                    const id = new Date().getTime();
                    dispatch({ type: SoundActionType.LOAD, id, source });
                });
            });
        }
    };
}

export const play: ActionCreator<RootThunk<void>> = (id: number) => {
    return (dispatch, getState) => {
        const { soundBuffers } = getState().sound;
        const soundBuffer = findSoundBuffer(soundBuffers, id);
        if (soundBuffer.source) {
            soundBuffer.source.start(0);
        }
    }
}

export const stop: ActionCreator<RootThunk<void>> = (id: number) => {
    return (dispatch, getState) => {
        const { soundBuffers } = getState().sound;
        const soundBuffer = findSoundBuffer(soundBuffers, id);
        if (soundBuffer.source) {
            soundBuffer.source.stop();
        }
    }
}

// State
export interface SoundBuffer {
    id: number;
    name: string;
    buffer: ArrayBuffer | null;
    source: AudioBufferSourceNode | null;
}
export interface SoundState {
    initialized: boolean;
    audioContext: AudioContext | null;
    soundBuffers: SoundBuffer[];
}

const initialState: SoundState = {
    initialized: false,
    audioContext: null,
    soundBuffers: [],
};
export const findSoundBuffer = (list: SoundBuffer[], id: number): SoundBuffer => {
    const soundBuffer = list.find(soundBuffer => soundBuffer.id === id);
    if (soundBuffer) {
        return soundBuffer;
    }
    throw new Error("Not found soundBuffer. id:" + id + " list:" + list);
}

// Reducer
export const reducer = (state: SoundState = initialState, action: SoundActionTypes): SoundState => {
    switch (action.type) {
        case SoundActionType.INITIALIZE:
            if (state.initialized) {
                return state;
            }
            return {
                ...state,
                initialized: true,
                audioContext: state.audioContext,
            };

        case SoundActionType.LOAD:
            return {
                ...state,
                soundBuffers: [...state.soundBuffers, { id: action.id, source: action.soundBuffer }]
            };

        default: {
            return state;
        }
    }
}