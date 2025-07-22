
import { useState, useEffect, useCallback } from 'react';

export interface SpeechSynthesisVoice extends globalThis.SpeechSynthesisVoice {}

export function useBrowserTTS() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
      const synth = window.speechSynthesis;

      const loadVoices = () => {
        const voiceList = synth.getVoices();
        setVoices(voiceList);
      };

      loadVoices();
      // Voices are loaded asynchronously in many browsers.
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
      }

      // Periodically check speaking state as `onend` can be unreliable.
      const interval = setInterval(() => {
        if (isSpeaking !== synth.speaking) {
            setIsSpeaking(synth.speaking);
        }
      }, 250);

      return () => {
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = null;
        }
        clearInterval(interval);
        synth.cancel(); // Clean up any lingering speech on unmount.
      };
    }
  }, [isSpeaking]);

  const speak = useCallback((text: string, { voiceName, pitch, speed }: { voiceName: string; pitch: number; speed: number; }) => {
    if (!isSupported) {
        console.warn("Browser TTS not supported.");
        return;
    }
    const synth = window.speechSynthesis;
    if (synth.speaking) {
        synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    const selectedVoice = voices.find(v => v.name === voiceName);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
        // Fallback to a default English voice if the saved one isn't found
        const fallbackVoice = voices.find(v => v.lang.startsWith('en') && v.default) || voices.find(v => v.lang.startsWith('en')) || voices[0];
        if(fallbackVoice) utterance.voice = fallbackVoice;
    }
    
    // The browser's range for pitch/rate is typically 0-2.
    // Our preset uses different ranges, so we map them.
    // Preset pitch: -5 to 5 -> Browser pitch: 0 to 2. (Center is 1)
    utterance.pitch = Math.max(0, Math.min(2, 1 + (pitch / 5)));
    
    // Preset speed: 0.5 to 1.5 -> Browser rate: 0.1 to 10 (0.5 to 2 is a safe range)
    utterance.rate = Math.max(0.5, Math.min(2, speed));
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
        console.error("SpeechSynthesis Error", e);
        setIsSpeaking(false);
    };
    
    synth.speak(utterance);
    setIsSpeaking(true);
  }, [voices, isSupported]);

  return { speak, voices, isSpeaking, isSupported };
}
