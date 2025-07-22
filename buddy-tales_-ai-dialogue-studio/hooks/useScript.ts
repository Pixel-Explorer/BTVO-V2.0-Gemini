
import { useState, useCallback, useEffect } from 'react';
import { Scene, VoicePreset } from '../types';
import { parseScript } from '../utils/scriptParser';
import { masterCharacterList } from '../data/characters';

const DEFAULT_VOICE: VoicePreset = { voiceName: 'Puck', pitch: 0, speed: 1.0 };

const initialVoicePresets = masterCharacterList.reduce((acc, char) => {
    // Standardize to uppercase keys to match parser output
    acc[char.name.toUpperCase()] = char.voice;
    return acc;
}, {} as Record<string, VoicePreset>);


export function useScript() {
  const [scenes, setScenesState] = useState<Scene[]>([]);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [voicePresets, setVoicePresets] = useState<Record<string, VoicePreset>>(() => {
    try {
      const saved = localStorage.getItem("voicePresets");
      return saved ? { ...initialVoicePresets, ...JSON.parse(saved) } : initialVoicePresets;
    } catch {
      return initialVoicePresets;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("voicePresets", JSON.stringify(voicePresets));
    } catch (error) {
      console.error("Failed to save voice presets to localStorage:", error);
    }
  }, [voicePresets]);

  const setScenes = useCallback((scriptText: string) => {
    const parsedScenes = parseScript(scriptText);
    setScenesState(parsedScenes);
  }, []);

  const getCharactersInScript = useCallback((): string[] => {
    const allChars = new Set(scenes.flatMap(sc => sc.dialogues.filter(d => d.type === 'dialogue').map(d => d.character)));
    return Array.from(allChars);
  }, [scenes]);
  
  const initializePresetsForNewCharacters = useCallback(() => {
    const charactersInScript = getCharactersInScript();
    setVoicePresets(prev => {
        const newPresets = {...prev};
        let needsUpdate = false;
        charactersInScript.forEach(char => {
            // All character names from parser are uppercase
            if (!newPresets[char]) {
                newPresets[char] = { ...DEFAULT_VOICE };
                needsUpdate = true;
            }
        });
        return needsUpdate ? newPresets : prev;
    });
  }, [getCharactersInScript]);

  const updateVoicePreset = useCallback((character: string, changes: Partial<VoicePreset>) => {
    // Ensure character name is uppercase for consistency
    const upperChar = character.toUpperCase();
    setVoicePresets(prev => ({
      ...prev,
      [upperChar]: { ...(prev[upperChar] || DEFAULT_VOICE), ...changes },
    }));
  }, []);

  const updateDialogueText = useCallback((lineId: string, newText: string) => {
    setScenesState(prevScenes => {
        const newScenes = JSON.parse(JSON.stringify(prevScenes));
        const scene = newScenes[currentSceneIndex];
        if (!scene) return prevScenes;

        const lineIndex = scene.dialogues.findIndex((line: { id: string; }) => line.id === lineId);
        if (lineIndex !== -1) {
            scene.dialogues[lineIndex].text = newText;
        }
        
        return newScenes;
    });
  }, [currentSceneIndex]);

  return {
    scenes,
    setScenes,
    currentSceneIndex,
    setCurrentSceneIndex,
    voicePresets,
    setVoicePresets,
    updateVoicePreset,
    getCharactersInScript,
    updateDialogueText,
    initializePresetsForNewCharacters
  };
}