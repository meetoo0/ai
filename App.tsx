
import React, { useState, useCallback } from 'react';
import { generateSpeech } from './services/geminiService';
import { decode, decodeAudioData, bufferToWave } from './utils/audioUtils';
import { VOICES, EMOTIONS } from './constants';
import type { Voice, Emotion } from './types';
import { AudioIcon, DownloadIcon, LoadingSpinnerIcon, SparklesIcon } from './components/icons';

interface VoiceCardProps {
  voice: Voice;
  isSelected: boolean;
  onSelect: (voice: Voice) => void;
}

const VoiceCard: React.FC<VoiceCardProps> = ({ voice, isSelected, onSelect }) => (
  <div
    onClick={() => onSelect(voice)}
    className={`cursor-pointer p-4 border-2 rounded-lg transition-all duration-200 ${
      isSelected
        ? 'border-indigo-500 bg-indigo-900/50 shadow-lg shadow-indigo-500/20'
        : 'border-gray-700 bg-gray-800 hover:border-indigo-600 hover:bg-gray-700/50'
    }`}
  >
    <h3 className="text-lg font-semibold text-white">{voice.name}</h3>
    <p className="text-sm text-gray-400">{voice.description}</p>
  </div>
);

interface EmotionPillProps {
    emotion: Emotion;
    isSelected: boolean;
    onSelect: (emotion: Emotion) => void;
}

const EmotionPill: React.FC<EmotionPillProps> = ({ emotion, isSelected, onSelect }) => (
    <button
        onClick={() => onSelect(emotion)}
        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 ${
            isSelected
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
    >
        {emotion.name}
    </button>
);


export default function App() {
  const [text, setText] = useState<string>('Hello there! I am an AI voice, ready to bring your words to life with a touch of emotion.');
  const [selectedVoice, setSelectedVoice] = useState<Voice>(VOICES[0]);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>(EMOTIONS[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSpeech = useCallback(async () => {
    if (!text.trim()) {
      setError('Please enter some text to generate speech.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const base64Audio = await generateSpeech(text, selectedVoice.id, selectedEmotion.value);
      
      if (base64Audio) {
        const audioBytes = decode(base64Audio);
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const audioBuffer = await decodeAudioData(audioBytes, audioContext, 24000, 1);
        const wavBlob = bufferToWave(audioBuffer, audioBuffer.length);
        const url = URL.createObjectURL(wavBlob);
        setAudioUrl(url);
      } else {
          throw new Error('API returned no audio data.');
      }
    } catch (err) {
      console.error('Error generating speech:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [text, selectedVoice, selectedEmotion]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <AudioIcon className="w-10 h-10 text-indigo-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              AI Voice Over Studio
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Craft expressive voice-overs with Gemini. Type your script, choose a voice and emotion, and bring your text to life.
          </p>
        </header>

        <main className="bg-gray-800/50 rounded-2xl shadow-2xl shadow-black/20 p-6 md:p-8 backdrop-blur-sm border border-gray-700">
          <div className="space-y-8">
            <div>
              <label htmlFor="script" className="block text-lg font-semibold mb-2 text-gray-300">
                Your Script
              </label>
              <textarea
                id="script"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here..."
                className="w-full h-32 p-4 bg-gray-900 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-gray-200 resize-none"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3 text-gray-300">Choose a Voice</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {VOICES.map((voice) => (
                  <VoiceCard
                    key={voice.id}
                    voice={voice}
                    isSelected={selectedVoice.id === voice.id}
                    onSelect={setSelectedVoice}
                  />
                ))}
              </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-3 text-gray-300">Select an Emotion</h2>
                <div className="flex flex-wrap gap-3">
                    {EMOTIONS.map((emotion) => (
                        <EmotionPill
                            key={emotion.value}
                            emotion={emotion}
                            isSelected={selectedEmotion.value === emotion.value}
                            onSelect={setSelectedEmotion}
                        />
                    ))}
                </div>
            </div>
            
            <div className="pt-4">
              <button
                onClick={handleGenerateSpeech}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                {isLoading ? (
                    <>
                        <LoadingSpinnerIcon />
                        <span>Generating...</span>
                    </>
                ) : (
                    <>
                        <SparklesIcon />
                        <span>Generate Voice Over</span>
                    </>
                )}
              </button>
            </div>

            {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-lg text-center">{error}</div>}

            {audioUrl && (
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 space-y-4">
                <h2 className="text-lg font-semibold text-center text-gray-300">Your Audio is Ready!</h2>
                <audio controls src={audioUrl} className="w-full">
                  Your browser does not support the audio element.
                </audio>
                <a
                  href={audioUrl}
                  download="ai-voice-over.wav"
                  className="w-full mt-2 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  <DownloadIcon />
                  Download WAV
                </a>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
