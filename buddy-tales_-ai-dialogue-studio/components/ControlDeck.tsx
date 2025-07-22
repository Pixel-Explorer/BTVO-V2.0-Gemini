
import React from 'react';
import { UploadCloud, Film } from 'lucide-react';
import { BuddyTalesLogo } from './avatars';

interface ControlDeckProps {
  onFileUpload: (file: File) => void;
  sceneCount: number;
}

const ControlDeck: React.FC<ControlDeckProps> = ({ onFileUpload, sceneCount }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
    event.target.value = '';
  };

  return (
    <header className="flex-shrink-0 panel-holographic p-3">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
            <BuddyTalesLogo className="h-10 w-auto text-[var(--glow-primary)]" />
            <h1 className="text-xl font-bold text-white tracking-wider hidden md:block">
                AI Dialogue Studio
            </h1>
        </div>
        
        <div className="flex items-center gap-4">
            {sceneCount > 0 && (
                 <div className="flex items-center gap-2 text-[var(--text-secondary)] font-mono text-sm">
                    <Film size={18} className="text-[var(--glow-secondary)]"/>
                    <span>{sceneCount} Scenes Loaded</span>
                 </div>
            )}
            <label className="bg-[var(--glow-primary)] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[var(--glow-secondary)] transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-[0_0_15px_var(--glow-primary)]">
              <UploadCloud size={18} />
              <span className="hidden sm:inline">Upload Script</span>
              <input
                type="file"
                className="hidden"
                accept=".txt,.pdf,.docx"
                onChange={handleFileChange}
              />
            </label>
        </div>
      </div>
    </header>
  );
};

export default ControlDeck;
