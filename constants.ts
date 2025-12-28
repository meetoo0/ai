
import type { Voice, Emotion } from './types';

export const VOICES: Voice[] = [
    { id: 'Kore', name: 'Kore', description: 'A clear, standard female voice.' },
    { id: 'Puck', name: 'Puck', description: 'A deep, resonant male voice.' },
    { id: 'Zephyr', name: 'Zephyr', description: 'A friendly, approachable female voice.' },
    { id: 'Fenrir', name: 'Fenrir', description: 'A warm, authoritative male voice.' },
];

export const EMOTIONS: Emotion[] = [
    { name: 'Neutral', value: '' },
    { name: 'Cheerfully', value: 'cheerfully' },
    { name: 'Sadly', value: 'sadly' },
    { name: 'Angrily', value: 'angrily' },
    { name: 'Excitedly', value: 'excitedly' },
    { name: 'Whispering', value: 'whispering' },
    { name: 'Authoritatively', value: 'authoritatively' },
    { name: 'Playfully', value: 'playfully' },
];
