import { Audio, AVPlaybackStatus } from 'expo-av';
import { Alert } from 'react-native';
import { seconds } from '../../../Config';

export const loadSong = async (sound: Audio.Sound, setSound: (val: Audio.Sound) => void, song: any, setPaused: (val: boolean) => void,
    setTime: (val: number) => void, setVolume: (val: number) => void, setCurrentSong: (val: any) => void, loadNextSong: (index: number) => void,
    volume: number) => {
    if (sound) await unLoad(sound, setSound)
    const loadedSound = await load(song.link, setTime, setVolume, setPaused, () => loadNextSong(song.index), volume)
    if (loadedSound) {
        const status: AVPlaybackStatus = await loadedSound.getStatusAsync()
        if (status && status.isLoaded) {
            //@ts-ignore
            setCurrentSong({ ...song, duration: Math.floor(status.durationMillis / 1000) })
        }
        setSound(loadedSound);
    }
}

export const load = async (link: any, setTime: (val: number) => void, setVolume: (val: number) => void, setPaused: (val: boolean) => void,
    loadNextSong: () => void, volume: number = 1) => {
    try {
        const { sound } = await Audio.Sound.createAsync(link, { shouldPlay: true, progressUpdateIntervalMillis: 1000, volume }, (status) => {
            //@ts-ignore
            if (status.didJustFinish === true) loadNextSong()
            //@ts-ignore
            setTime(seconds(status.positionMillis))
            //@ts-ignore
            setVolume(status.volume)
        })
        if (setPaused) setPaused(false)
        return sound
    } catch {
        return null
    }
}

export const unLoad = async (sound: any, setSound?: (val: any) => void) => {
    try {
        await sound.unloadAsync()
        if (setSound) setSound(null)
    } catch {
        Alert.alert("Error accessing the audio file")
    }
}

export const play = async (sound: any, setPaused?: (val: boolean) => void) => {
    try {
        await sound.playAsync()
        if (setPaused) setPaused(false)
    } catch {
        Alert.alert("Error playing sound")
        return null
    }
}

export const pause = async (sound: any, setPaused: (val: boolean) => void) => {
    try {
        await sound.pauseAsync()
        setPaused(true)
    } catch {
        Alert.alert("Error pausing sound")
    }
}

export const moveAudio = async (sound: any, value: number) => {
    if (!sound) return;
    try {
        await sound.setPositionAsync(value * 1000)
    } catch (error) {
        Alert.alert('Error changing the playing position',);
    }
};

export const changeVolume = async (sound: any, value: number) => {
    if (!sound) return;

    try {
        await sound.setVolumeAsync(value)
    } catch {

    }
}