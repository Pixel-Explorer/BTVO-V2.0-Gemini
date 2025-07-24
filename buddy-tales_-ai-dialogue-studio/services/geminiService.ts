
import { GoogleGenAI } from '@google/genai';
import { Scene, VoicePreset } from '../types';
import { pcmToWav, generateSineWave } from '../utils/audioUtils';

// IMPORTANT NOTE: The public @google/genai SDK does not support Text-to-Speech.
// The following functions simulate the audio generation for scene EXPORT functionality
// as specified in the project brief. The output is a placeholder tone, not real speech.
// Real speech for PREVIEWS is handled separately using the browser's built-in TTS.

// The Gemini API key is provided via the GEMINI_API_KEY environment variable at
// runtime. The value is also embedded during build so the app works with `vite
// preview`.
if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key not found in environment variables.");
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const TEXT_MODEL = 'gemini-2.5-flash';

async function generatePlaceholderAudio(request: any): Promise<string> {
    const promptText = request.contents[0].parts[0].text;
    
    // This call simulates network latency and API usage validation by calling a real text model.
    try {
        await ai.models.generateContent({
            model: TEXT_MODEL,
            contents: `Simulate audio generation for this text (length: ${promptText.length}): "${promptText.substring(0, 50)}..."`
        });
    } catch (error) {
        console.error("Gemini API call for simulation failed. This might be due to API key issues or network problems.", error);
        // We can still proceed to generate the placeholder tone even if this fails.
    }
    
    // Make duration proportional to text length, with a minimum and maximum.
    const duration = Math.max(0.5, Math.min(5, promptText.length / 50));
    console.log(`SIMULATING EXPORT: Generating a ${duration.toFixed(1)}s tone for demonstration.`);

    const pcmData = generateSineWave(duration, 440); // 440Hz is the 'A' note
    const wavBlob = pcmToWav(pcmData);
    return URL.createObjectURL(wavBlob);
}

export async function generateSceneTTS(scene: Scene, presets: Record<string, VoicePreset>): Promise<string> {
    let promptText = `TTS the following scene with proper emotions:\n`;
    scene.dialogues.forEach(dl => {
        promptText += `${dl.character}: ${dl.text}\n`;
    });

    const uniqueCharacters = Array.from(new Set(scene.dialogues.map(d => d.character)));
    const speakerConfigs = uniqueCharacters.map(char => ({
        speaker: char,
        voiceConfig: {
            prebuiltVoiceConfig: { voiceName: presets[char]?.voiceName || 'Puck' }
        }
    }));
    
    const request = {
        model: TEXT_MODEL, // This is just for simulation
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
        config: {
            // This config is hypothetical and not used by the simulation.
            speechConfig: {
                multiSpeakerVoiceConfig: { speakerVoiceConfigs: speakerConfigs }
            }
        }
    };
    
    return generatePlaceholderAudio(request);
}
