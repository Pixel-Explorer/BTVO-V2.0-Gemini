
import React, { useRef } from 'react';
import { Scene, VoicePreset, CharacterProfile } from '../types';
import ChatBubble from './ChatBubble';
import ActionBlock from './ActionBlock';
import { masterCharacterList } from '../data/characters';

interface ScriptEditorProps {
  scenes: Scene[];
  currentSceneIndex: number;
  onSceneChange: (index: number) => void;
  onDialogueTextChange: (lineId: string, newText: string) => void;
  voicePresets: Record<string, VoicePreset>;
  setToastMessage: (message: string) => void;
  activeCharacterId: string | undefined;
  speak: (text: string, options: { voiceName: string; pitch: number; speed: number; }) => void;
  isTTSSpeaking: boolean;
  isTTSSupported: boolean;
}

const ScriptEditor: React.FC<ScriptEditorProps> = ({
  scenes,
  currentSceneIndex,
  onSceneChange,
  onDialogueTextChange,
  voicePresets,
  setToastMessage,
  activeCharacterId,
  speak,
  isTTSSpeaking,
  isTTSSupported
}) => {
  const dialogueContainerRef = useRef<HTMLDivElement>(null);
  
  const currentScene = scenes[currentSceneIndex];
  const charactersInScene = masterCharacterList.reduce((acc, char) => {
    acc[char.name] = char;
    return acc;
  }, {} as Record<string, CharacterProfile>);

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-[var(--border-color)] flex-shrink-0">
        <div className="flex items-center gap-4">
          <label htmlFor="scene-select" className="font-bold text-lg text-[var(--text-secondary)] whitespace-nowrap">Scene:</label>
          <select
            id="scene-select"
            value={currentSceneIndex}
            onChange={(e) => onSceneChange(Number(e.target.value))}
            className="bg-transparent text-white p-2 rounded-lg w-full focus:outline-none appearance-none"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236366f1\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
          >
            {scenes.map((scene, index) => (
              <option key={index} value={index} className="bg-[var(--bg-primary)]">{scene.title || `Scene ${index + 1}`}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div ref={dialogueContainerRef} className="flex-grow overflow-y-auto p-4 space-y-4">
        {!isTTSSupported && (
            <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-300 p-3 rounded-lg text-center font-mono">
                Browser TTS Not Supported. Line previews will be silent.
            </div>
        )}
        {currentScene?.dialogues.map((line) => {
          const characterProfile = charactersInScene[line.character];
          if (line.type === 'action') {
            return <ActionBlock key={line.id} line={line} />;
          }
          return (
            <ChatBubble
              key={line.id}
              line={line}
              onDialogueTextChange={onDialogueTextChange}
              voicePreset={voicePresets[line.character]}
              isHighlighted={characterProfile?.id === activeCharacterId}
              speak={speak}
              isTTSSpeaking={isTTSSpeaking}
              setToastMessage={setToastMessage}
              characterAvatar={characterProfile?.avatar}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScriptEditor;
