
import React, { useState, useRef, useEffect } from 'react';
import { DialogueLine, VoicePreset } from '../types';
import { Mic, Tag, X, Laugh, Drama, Angry, Siren, HelpCircle, BotMessageSquare, StopCircle } from 'lucide-react';

interface ChatBubbleProps {
  line: DialogueLine;
  onDialogueTextChange: (lineId: string, newText: string) => void;
  voicePreset: VoicePreset;
  isHighlighted: boolean;
  speak: (text: string, options: { voiceName: string; pitch: number; speed: number; }) => void;
  isTTSSpeaking: boolean;
  setToastMessage: (message: string) => void;
  characterAvatar?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const TagToolbar: React.FC<{ onTagInsert: (tag: string) => void, closeToolbar: () => void }> = ({ onTagInsert, closeToolbar }) => {
    const tags = [
        { label: 'Whisper', tag: 'whispering', icon: Mic },
        { label: 'Laughs', tag: 'laughs', icon: Laugh },
        { label: 'Sarcastic', tag: 'sarcastic', icon: Drama },
        { label: 'Angry', tag: 'angry', icon: Angry },
        { label: 'Shout', tag: 'shouting', icon: Siren },
        { label: 'Excited', tag: 'excited', icon: BotMessageSquare },
    ];
    const toolbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
                closeToolbar();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [closeToolbar]);

    return (
        <div ref={toolbarRef} className="absolute z-10 bottom-full mb-2 w-48 bg-[var(--bg-primary)] border border-[var(--border-color)] p-2 rounded-lg shadow-xl panel-holographic">
            <div className="grid grid-cols-3 gap-1">
                {tags.map(({ label, tag, icon: Icon }) => (
                    <button key={tag} onClick={() => onTagInsert(tag)} title={label} className="flex items-center justify-center gap-1.5 bg-white/5 text-gray-300 p-2 text-xs font-medium rounded-md hover:bg-[var(--glow-primary)] hover:text-white transition-all">
                        <Icon size={16} />
                    </button>
                ))}
            </div>
        </div>
    );
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ line, onDialogueTextChange, voicePreset, isHighlighted, speak, isTTSSpeaking, setToastMessage, characterAvatar: Avatar }) => {
  const [isTagToolbarOpen, setIsTagToolbarOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePreview = () => {
    if (isTTSSpeaking) {
      window.speechSynthesis.cancel();
      return;
    }
    if (!voicePreset) {
      setToastMessage(`No voice for ${line.character}.`);
      return;
    }
    try {
      speak(line.text.replace(/\[.*?\]/g, ''), { 
          voiceName: voicePreset.voiceName, 
          pitch: voicePreset.pitch, 
          speed: voicePreset.speed 
      });
    } catch(error) {
        console.error("Browser TTS Error:", error);
        setToastMessage(`Preview failed: ${(error as Error).message}`);
    }
  };

  const handleTagInsert = (tag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const { selectionStart, selectionEnd, value } = textarea;
    const tagText = ` [${tag}] `;
    const newText = value.slice(0, selectionStart) + tagText + value.slice(selectionEnd);
    
    onDialogueTextChange(line.id, newText);
    setIsTagToolbarOpen(false);

    setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = selectionStart + tagText.length;
    }, 0);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDialogueTextChange(line.id, e.target.value);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [line.text]);

  return (
    <div className={`flex items-start gap-3 transition-all duration-300 ${isHighlighted ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}>
       <div className={`mt-1 w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white transition-all duration-300 
         ${isHighlighted ? 'bg-[var(--glow-primary)] shadow-[0_0_10px_var(--glow-primary)]' : 'bg-white/10'}`}>
        {Avatar && <Avatar className="w-6 h-6" />}
      </div>
      <div className="relative flex-grow">
        <div className={`p-3 rounded-lg bg-black/20 relative group
            ${isHighlighted ? 'border border-[var(--glow-primary)]' : 'border border-transparent'}`}>
            <p className="font-bold text-[var(--glow-secondary)] mb-1 text-sm">{line.character}</p>
            <textarea
              ref={textareaRef}
              value={line.text}
              onChange={handleTextChange}
              className="w-full bg-transparent text-[var(--text-primary)] focus:outline-none resize-none overflow-hidden leading-relaxed"
              rows={1}
            />
            <div className="absolute top-1 right-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="relative">
                    <button onClick={() => setIsTagToolbarOpen(p => !p)} className="p-1.5 bg-black/20 rounded-full hover:bg-[var(--glow-primary)] transition-colors" title="Add emotion tag">
                        {isTagToolbarOpen ? <X size={14} /> : <Tag size={14} />}
                    </button>
                    {isTagToolbarOpen && <TagToolbar onTagInsert={handleTagInsert} closeToolbar={() => setIsTagToolbarOpen(false)} />}
                </div>
                <button onClick={handlePreview} className="p-1.5 bg-black/20 rounded-full hover:bg-[var(--glow-primary)] transition-colors" title={isTTSSpeaking ? 'Stop' : `Preview`}>
                  {isTTSSpeaking ? <StopCircle size={14} /> : <Mic size={14} />}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
