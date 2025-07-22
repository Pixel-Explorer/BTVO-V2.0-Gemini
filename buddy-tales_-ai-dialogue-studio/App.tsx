
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useScript } from './hooks/useScript';
import Loader from './components/Loader';
import { Toast, ToastContainer } from './components/Toast';
import { extractTextFromFile } from './utils/fileExtractor';
import { CharacterProfile } from './types';
import CharacterList from './components/CharacterList';
import ScriptEditor from './components/ScriptEditor';
import SidePanel from './components/SidePanel';
import { useBrowserTTS } from './hooks/useBrowserTTS';
import { TheEye } from './components/TheEye';
import ControlDeck from './components/ControlDeck';
import { masterCharacterList } from './data/characters';

export default function App() {
  const {
    scenes,
    setScenes,
    currentSceneIndex,
    setCurrentSceneIndex,
    voicePresets,
    setVoicePresets,
    updateVoicePreset,
    updateDialogueText,
    initializePresetsForNewCharacters,
  } = useScript();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeCharacter, setActiveCharacter] = useState<CharacterProfile | null>(null);
  const hasLoadedScript = useRef(false);

  const { speak, voices, isSpeaking, isSupported } = useBrowserTTS();

  const handleFileUpload = useCallback(async (file: File) => {
    setLoadingMessage('Parsing Script...');
    setIsLoading(true);
    hasLoadedScript.current = false; // Reset for new file
    try {
      const textContent = await extractTextFromFile(file);
      if (textContent) {
        setScenes(textContent);
        setCurrentSceneIndex(0);
        setToastMessage('Script Parsed & Loaded!');
      } else {
        throw new Error('Could not extract text from file.');
      }
    } catch (error) {
      console.error('File processing error:', error);
      setToastMessage(`Error: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  }, [setScenes, setCurrentSceneIndex]);

  // Validate voice presets against available browser voices once they load.
  useEffect(() => {
    if (voices.length > 0) {
        const availableVoiceNames = new Set(voices.map(v => v.name));
        const newPresets = { ...voicePresets };
        let needsUpdate = false;

        Object.entries(newPresets).forEach(([char, preset]) => {
          if (!availableVoiceNames.has(preset.voiceName)) {
            const fallbackVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
            if (fallbackVoice) {
              newPresets[char].voiceName = fallbackVoice.name;
              needsUpdate = true;
            }
          }
        });

        if (needsUpdate) {
            setVoicePresets(newPresets);
            console.log("Corrected voice presets with available browser voices.");
        }
    }
  }, [voices, voicePresets, setVoicePresets]);

  // When scenes are newly parsed, initialize presets and set the active character.
  useEffect(() => {
    if (scenes.length > 0 && !hasLoadedScript.current) {
      hasLoadedScript.current = true;
      initializePresetsForNewCharacters();
      
      const firstDialogue = scenes[0]?.dialogues.find(d => d.type === 'dialogue');
      if (firstDialogue) {
        const firstCharName = firstDialogue.character.toUpperCase();
        const charProfile = masterCharacterList.find(c => c.name.toUpperCase() === firstCharName);
        setActiveCharacter(charProfile || null);
      } else {
        setActiveCharacter(masterCharacterList[0] || null);
      }
    } else if (scenes.length === 0) {
      hasLoadedScript.current = false;
      setActiveCharacter(null);
    }
  }, [scenes, initializePresetsForNewCharacters]);

  return (
    <div className="h-screen w-screen flex flex-col p-4 md:p-6 lg:p-8 gap-4 overflow-hidden relative">
      <ToastContainer>
        {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      </ToastContainer>
      {isLoading && <Loader message={loadingMessage} />}

      <ControlDeck onFileUpload={handleFileUpload} sceneCount={scenes.length} />
      
      {scenes.length > 0 ? (
        <main className="flex-grow grid grid-cols-12 gap-6 min-h-0">
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 min-h-0">
            <div className="flex-grow panel-holographic relative min-h-0">
               <ScriptEditor
                scenes={scenes}
                currentSceneIndex={currentSceneIndex}
                onSceneChange={setCurrentSceneIndex}
                onDialogueTextChange={updateDialogueText}
                voicePresets={voicePresets}
                activeCharacterId={activeCharacter?.id}
                speak={speak}
                isTTSSpeaking={isSpeaking}
                isTTSSupported={isSupported}
                setToastMessage={setToastMessage}
              />
            </div>
            <div className="flex-shrink-0 h-40">
              <CharacterList 
                characters={masterCharacterList}
                activeCharacterId={activeCharacter?.id}
                onCharacterSelect={setActiveCharacter}
              />
            </div>
          </div>
          
          <div className="col-span-12 lg:col-span-4 flex flex-col panel-holographic">
            <SidePanel
                activeCharacter={activeCharacter}
                scene={scenes[currentSceneIndex]}
                voicePresets={voicePresets}
                onPresetChange={updateVoicePreset}
                setLoading={setIsLoading}
                setLoadingMessage={setLoadingMessage}
                setToastMessage={setToastMessage}
                browserVoices={voices}
                isTTSSupported={isSupported}
            />
          </div>
        </main>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center text-center text-[var(--text-secondary)]">
          <TheEye />
          <h2 className="text-3xl font-bold text-white mt-8">Buddy Tales: AI Dialogue Studio</h2>
          <p className="mt-2 text-lg">Upload a script to begin your audio adventure.</p>
        </div>
      )}
    </div>
  );
}