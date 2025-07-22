
import { VoicePreset, CharacterProfile } from '../types';
import { KrishnaAvatar, RadhaAvatar, RevaAvatar, SudAvatar, BalluAvatar, AaiAvatar, BabaAvatar, KalaiyaAvatar, KhannaAvatar, GopiAvatar, PutanaAvatar, SudamaGrandmaAvatar, ResidentsAvatar, HenchmenAvatar, PoliceAvatar, NarratorAvatar, AatmanAvatar } from '../components/avatars';

export const masterCharacterList: CharacterProfile[] = [
  { 
    id: 'krishna',
    name: 'KRISHNA', 
    persona: 'Protagonist; charismatic, witty, energetic, quick-thinking.', 
    voice: { voiceName: 'Puck', pitch: 1, speed: 1.1 },
    avatar: KrishnaAvatar
  },
  { 
    id: 'radha',
    name: 'RADHA', 
    persona: 'Krishna’s rival and friend; competitive, intelligent, sharp-tongued.', 
    voice: { voiceName: 'Kore', pitch: 0, speed: 1.1 },
    avatar: RadhaAvatar
  },
   { 
    id: 'gopi',
    name: 'GOPI', 
    persona: 'Sarcastic, witty, loyal digital friend who monitors and banters.',
    voice: { voiceName: 'Kore', pitch: 2, speed: 1.2 },
    avatar: GopiAvatar
  },
  { 
    id: 'the_screen',
    name: 'THE SCREEN',
    persona: 'AI storyteller & advisor (Guruji); omniscient, humorous, wise.',
    voice: { voiceName: 'Aura', pitch: 1, speed: 1.1 },
    avatar: AatmanAvatar
  },
  { 
    id: 'reva',
    name: 'REVA', 
    persona: 'Referee and peacemaker; sensible, objective, diplomatic.', 
    voice: { voiceName: 'Aura', pitch: -1, speed: 0.9 },
    avatar: RevaAvatar
  },
  { 
    id: 'sud',
    name: 'SUD', 
    persona: 'Team member; witty, somewhat skeptical, loyal to Krishna.', 
    voice: { voiceName: 'Puck', pitch: 2, speed: 1.2 },
    avatar: SudAvatar
  },
  { 
    id: 'ballu',
    name: 'BALLU', 
    persona: 'Krishna’s elder brother; playful antagonist, teases him but protects.', 
    voice: { voiceName: 'Puck', pitch: -2, speed: 1.0 },
    avatar: BalluAvatar
  },
  { 
    id: 'aai',
    name: 'AAI', 
    persona: 'Strict but loving mother; nurturing, traditional, upholds discipline.', 
    voice: { voiceName: 'Kore', pitch: -1, speed: 1.0 },
    avatar: AaiAvatar
  },
  { 
    id: 'baba',
    name: 'BABA', 
    persona: 'Wise, authoritative father; silent strength, resolves disputes.', 
    voice: { voiceName: 'Puck', pitch: -3, speed: 0.9 },
    avatar: BabaAvatar
  },
  { 
    id: 'kalaiya',
    name: 'KALAIYA', 
    persona: 'Eccentric but dependable security guard; proud, protective.', 
    voice: { voiceName: 'MALE_IN', pitch: 0, speed: 1.0 },
    avatar: KalaiyaAvatar
  },
  { 
    id: 'khanna',
    name: 'KHANNA', 
    persona: 'The antagonist/strict neighbour; suspicious, grumpy, rigid.', 
    voice: { voiceName: 'Puck', pitch: -2, speed: 0.8 },
    avatar: KhannaAvatar
  },
  { 
    id: 'aatman',
    name: 'AATMAN',
    persona: 'The final, true form of the AI guide.',
    voice: { voiceName: 'Aura', pitch: 1, speed: 1.1 },
    avatar: AatmanAvatar
  },
  { 
    id: 'miss_k',
    name: 'MISS K', 
    persona: 'Seemingly kind vaccination worker, transforms into the central antagonist.', 
    voice: { voiceName: 'FEMALE_AU', pitch: 0, speed: 1.0 },
    avatar: PutanaAvatar
  },
   { 
    id: 'putana',
    name: 'PUTANA', 
    persona: 'The sinister alter-ego of Miss K. Chilling and cold, with sudden shifts.', 
    voice: { voiceName: 'FEMALE_AU', pitch: -2, speed: 0.8 },
    avatar: PutanaAvatar
  },
  { 
    id: 'the_woman',
    name: 'THE WOMAN', 
    persona: 'Sudama\'s grandmother, an elder in distress.', 
    voice: { voiceName: 'Aura', pitch: -2, speed: 0.8 },
    avatar: SudamaGrandmaAvatar
  },
  {
    id: 'residents',
    name: 'RESIDENTS',
    persona: 'Various society members; provide comic relief and group suspicion.',
    voice: { voiceName: 'Puck', pitch: 0, speed: 1.0 },
    avatar: ResidentsAvatar
  },
  {
    id: 'henchmen',
    name: 'HENCHMEN',
    persona: 'Khanna’s muscle; intimidating and mostly silent.',
    voice: { voiceName: 'Puck', pitch: -4, speed: 0.7 },
    avatar: HenchmenAvatar
  },
  {
    id: 'police',
    name: 'POLICE',
    persona: 'Pragmatic and bureaucratic; a functional outside force.',
    voice: { voiceName: 'Puck', pitch: -1, speed: 0.9 },
    avatar: PoliceAvatar
  },
  { 
    id: 'narrator',
    name: 'NARRATOR', 
    persona: 'The storyteller guiding the audience through the narrative.', 
    voice: { voiceName: 'Aura', pitch: 0, speed: 1.0 },
    avatar: NarratorAvatar
  },
];