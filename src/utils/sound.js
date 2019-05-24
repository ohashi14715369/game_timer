import audioContextCreator from 'audio-context';
import { toArrayBuffer } from './dataConverter';
var audioContext = null;

export const initAudioContext = () => {
    if (audioContext == null) {
        audioContext = audioContextCreator();
    }
}
export const createSoundBuffer = (blob, callback) => {
    initAudioContext();
    toArrayBuffer(blob, (buffer) => {
        audioContext.decodeAudioData(buffer, (audioBuffer) => {
            var source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            callback(source);
        });

    });
}

export const playSound = (source) => {
    source.start(0);
};
export const stopSound = (source) => {
    source.stop();
}