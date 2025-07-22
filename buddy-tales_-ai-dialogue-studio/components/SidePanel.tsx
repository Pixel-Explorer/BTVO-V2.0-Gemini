
import React from 'react';
import { CharacterProfile, Scene, VoicePreset } from '../types';
import VoicePresetsEditor from './VoicePresetsEditor';
import PreviewAndExport from './PreviewAndExport';
import { SpeechSynthesisVoice } from '../hooks/useBrowserTTS';

interface SidePanelProps {
  activeCharacter: CharacterProfile | null;
  scene?: Scene;
  voicePresets: Record<string, VoicePreset>;
  onPresetChange: (character: string, changes: Partial<VoicePreset>) => void;
  setLoading: (loading: boolean) => void;
  setLoadingMessage: (message: string) => void;
  setToastMessage: (message: string) => void;
  browserVoices: SpeechSynthesisVoice[];
  isTTSSupported: boolean;
}

const SidePanel: React.FC<SidePanelProps> = ({ 
    activeCharacter,
    scene,
    voicePresets,
    onPresetChange,
    setLoading,
    setLoadingMessage,
    setToastMessage,
    browserVoices,
    isTTSSupported
}) => {
  return (
    <div className="flex flex-col h-full gap-6 p-4 overflow-y-auto">
        <div className="flex-shrink-0">
            <h2 className="text-xl font-bold mb-4 text-white">Voice Synthesizer</h2>
            {activeCharacter && voicePresets[activeCharacter.name] ? (
                 <VoicePresetsEditor 
                    character={activeCharacter}
                    preset={voicePresets[activeCharacter.name]}
                    onPresetChange={onPresetChange}
                    browserVoices={browserVoices}
                    isTTSSupported={isTTSSupported}
                 />
            ) : (
                <div className="flex items-center justify-center h-48 bg-black/20 rounded-lg text-[var(--text-secondary)] font-mono">
                    <p>Select Character to Activate</p>
                </div>
            )}
        </div>
      
      <div className="flex-grow">
        <PreviewAndExport 
            scene={scene}
            voicePresets={voicePresets}
            setLoading={setLoading}
            setLoadingMessage={setLoadingMessage}
            setToastMessage={setToastMessage}
        />
      </div>
    </div>
  );
};

export default SidePanel;
