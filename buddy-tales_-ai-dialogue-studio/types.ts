
export enum Tab {
  Script = 'script',
  Voices = 'voices',
  Preview = 'preview',
}

export interface DialogueLine {
  id: string;
  character: string;
  text: string;
  type: 'dialogue' | 'action';
}

export interface Scene {
  title: string;
  dialogues: DialogueLine[];
}

export interface VoicePreset {
  voiceName: string; 
  pitch: number;     
  speed: number;     
}

export interface CharacterProfile {
  id: string;
  name: string;
  persona: string;
  voice: VoicePreset;
  avatar: React.FC<React.SVGProps<SVGSVGElement>>;
}
