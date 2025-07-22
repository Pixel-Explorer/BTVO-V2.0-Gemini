
import React from 'react';
import { VoicePreset, CharacterProfile } from '../types';
import { SpeechSynthesisVoice } from '../hooks/useBrowserTTS';

interface VoicePresetsEditorProps {
  character: CharacterProfile;
  preset: VoicePreset;
  onPresetChange: (character: string, changes: Partial<VoicePreset>) => void;
  browserVoices: SpeechSynthesisVoice[];
  isTTSSupported: boolean;
}

const VoicePresetsEditor: React.FC<VoicePresetsEditorProps> = ({ character, preset, onPresetChange, browserVoices, isTTSSupported }) => {
  const handlePresetChange = (changes: Partial<VoicePreset>) => {
    onPresetChange(character.name, changes);
  };
  
  const Avatar = character.avatar;

  return (
    <div className="bg-black/20 p-4 rounded-lg border border-transparent hover:border-[var(--border-color)] transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--glow-primary)] shadow-[0_0_10px_var(--glow-primary)]">
          <Avatar className="w-6 h-6 text-white"/>
        </div>
        <h3 className="text-lg font-semibold text-white">{character.name}</h3>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Voice Model</label>
          <select
            value={preset.voiceName}
            onChange={(e) => handlePresetChange({ voiceName: e.target.value })}
            className="w-full bg-black/30 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--glow-primary)] disabled:opacity-50 appearance-none"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%23a78bfa\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
            disabled={!isTTSSupported || browserVoices.length === 0}
          >
             {browserVoices.length > 0 ? browserVoices.map(v => <option className="bg-[var(--bg-primary)]" key={v.name} value={v.name}>{v.name} ({v.lang})</option>) : <option>Loading...</option>}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Pitch</label>
          <div className="flex items-center gap-3">
            <input type="range" min="-5" max="5" step="1" value={preset.pitch} onChange={(e) => handlePresetChange({ pitch: Number(e.target.value) })} />
            <span className="font-mono text-sm bg-black/30 px-2 py-1 rounded w-12 text-center">{preset.pitch}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Speed</label>
          <div className="flex items-center gap-3">
            <input type="range" min="0.5" max="1.5" step="0.1" value={preset.speed} onChange={(e) => handlePresetChange({ speed: Number(e.target.value) })} />
            <span className="font-mono text-sm bg-black/30 px-2 py-1 rounded w-12 text-center">{preset.speed.toFixed(1)}x</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoicePresetsEditor;
