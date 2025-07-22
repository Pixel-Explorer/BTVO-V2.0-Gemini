
import { Scene, DialogueLine } from '../types';

// A character line is typically all caps. We'll be a bit lenient.
// It must not be a scene header. It should be relatively short.
const CHARACTER_REGEX = /^([A-Z0-9\s'()&-]{2,})$/;
const SCENE_HEADER_REGEX = /^(INT|EXT|I\/E|INT\.?\/EXT)\.?\s|^(SCENE\s+\d+)/i;
const PARENTHETICAL_REGEX = /^\(.*\)$/;

function isCharacterLine(line: string): boolean {
    const trimmedLine = line.replace(/\s*\(.*\)\s*$/i, '').trim(); // Remove parentheticals like (CONT'D)
    if (trimmedLine.length === 0 || trimmedLine.length > 50) return false;
    if (SCENE_HEADER_REGEX.test(trimmedLine)) return false;
    // A simple heuristic: if it contains mostly uppercase letters and spaces, it's likely a character.
    const upperCaseChars = (trimmedLine.match(/[A-Z]/g) || []).length;
    const totalChars = (trimmedLine.match(/[a-zA-Z]/g) || []).length;
    return totalChars > 0 && (upperCaseChars / totalChars) > 0.7;
}

export function parseScript(scriptText: string): Scene[] {
    const lines = scriptText.split(/\r?\n/).map(l => l.trim());
    const scenes: Scene[] = [];
    let currentScene: Scene | null = null;
    let i = 0;

    const createNewScene = (title: string) => {
        if (currentScene && currentScene.dialogues.length > 0) scenes.push(currentScene);
        const cleanedTitle = title.replace(/\s*\d+\.?\s*$/, '').trim();
        currentScene = { title: cleanedTitle || `Scene ${scenes.length + 1}`, dialogues: [] };
    };

    while (i < lines.length) {
        const line = lines[i];
        if (!line) {
            i++;
            continue;
        }

        if (SCENE_HEADER_REGEX.test(line)) {
            createNewScene(line);
             currentScene?.dialogues.push({
                id: `action-${i}`,
                character: 'NARRATOR',
                text: line,
                type: 'action'
            });
            i++;
            continue;
        }

        if (!currentScene) createNewScene('');
        
        const nextLine = lines[i + 1] || '';

        // Check for dialogue block
        if (isCharacterLine(line) && nextLine && !isCharacterLine(nextLine)) {
            const character = line.replace(/\s*\(.*\)\s*$/i, '').trim().toUpperCase();
            let dialogue = '';
            i++;

            // Consume subsequent lines as part of this character's dialogue
            while(i < lines.length && lines[i] && !isCharacterLine(lines[i]) && !SCENE_HEADER_REGEX.test(lines[i])) {
                dialogue += (dialogue ? ' ' : '') + lines[i];
                i++;
            }
            
            if (currentScene) {
                 currentScene.dialogues.push({
                    id: `dialogue-${i}`,
                    character: character,
                    text: dialogue,
                    type: 'dialogue'
                });
            }
            continue;
        }

        // Otherwise, it's an action line
        if (currentScene) {
            currentScene.dialogues.push({
                id: `action-${i}`,
                character: 'NARRATOR',
                text: line,
                type: 'action'
            });
        }
        i++;
    }

    if (currentScene && currentScene.dialogues.length > 0) {
        scenes.push(currentScene);
    }
    
    // Fallback for unparsable scripts to prevent crashes
    if (scenes.length === 0 && scriptText.trim().length > 0) {
        return [{ title: "Full Script", dialogues: [{ id: 'full-1', character: "NARRATOR", text: scriptText, type: 'action' }] }];
    }

    return scenes.filter(scene => scene.dialogues.length > 0);
}
