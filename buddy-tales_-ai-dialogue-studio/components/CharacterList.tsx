
import React from 'react';
import { CharacterProfile } from '../types';

interface CharacterListProps {
  characters: CharacterProfile[];
  activeCharacterId: string | undefined;
  onCharacterSelect: (character: CharacterProfile) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, activeCharacterId, onCharacterSelect }) => {
  return (
    <div className="h-full w-full panel-holographic p-3 flex flex-col">
      <h2 className="text-lg font-bold text-white mb-2 flex-shrink-0 px-2">Character Roster</h2>
      <div className="flex-grow overflow-x-auto overflow-y-hidden">
        <div className="flex h-full items-center gap-4 py-2 px-2">
          {characters.map((char) => {
            const isActive = activeCharacterId === char.id;
            const Avatar = char.avatar;
            return (
              <button
                key={char.id}
                onClick={() => onCharacterSelect(char)}
                title={char.name}
                className={`h-28 w-24 flex-shrink-0 p-3 rounded-lg transition-all duration-300 flex flex-col items-center justify-center gap-2 relative overflow-hidden
                  ${isActive
                    ? 'bg-[var(--glow-primary)] text-white shadow-[0_0_20px_var(--glow-primary)]'
                    : 'bg-white/5 hover:bg-white/10'
                  }`}
              >
                 <Avatar className={`w-10 h-10 transition-all duration-300 ${isActive ? 'text-white' : 'text-[var(--glow-secondary)]'}`} />
                 <span className="font-semibold text-xs text-center truncate w-full">{char.name}</span>
                 {isActive && <div className="absolute bottom-0 left-0 w-full h-1 bg-white/50"></div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CharacterList;
