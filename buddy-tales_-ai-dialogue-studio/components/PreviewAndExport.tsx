
import React, { useState, useEffect } from 'react';
import { Scene, VoicePreset } from '../types';
import { generateSceneTTS } from '../services/geminiService';
import { Download, Zap } from 'lucide-react';

interface PreviewAndExportProps {
  scene?: Scene;
  voicePresets: Record<string, VoicePreset>;
  setLoading: (loading: boolean) => void;
  setLoadingMessage: (message: string) => void;
  setToastMessage: (message: string) => void;
}

const PreviewAndExport: React.FC<PreviewAndExportProps> = ({
  scene,
  voicePresets,
  setLoading,
  setLoadingMessage,
  setToastMessage,
}) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
    }
  }, [scene]);

  const handleGenerate = async () => {
    if (!scene) {
        setToastMessage("No active scene to generate.");
        return;
    }
    if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
    }
    setLoadingMessage(`Generating audio for: ${scene.title}`);
    setLoading(true);
    try {
      const url = await generateSceneTTS(scene, voicePresets);
      setAudioUrl(url);
      setToastMessage('Scene audio generated!');
    } catch (error) {
      console.error('Scene TTS Generation Error:', error);
      setToastMessage(`Error generating audio: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black/20 p-4 rounded-lg h-full flex flex-col">
       <h2 className="text-xl font-bold mb-4 text-white">Scene Export</h2>
      <button
        onClick={handleGenerate}
        disabled={!scene}
        className="w-full flex items-center justify-center gap-2 bg-[var(--glow-primary)] text-white font-bold py-3 px-4 rounded-lg hover:bg-[var(--glow-secondary)] transition-all duration-300 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed shadow-[0_0_15px_var(--glow-primary)]"
      >
        <Zap size={20} />
        Generate Scene Audio
      </button>

        <div className="text-xs text-[var(--text-secondary)] bg-black/20 p-2 rounded-md mt-4 font-mono text-center">
         Note: Line previews use real speech. This export generates a placeholder audio tone for demonstration.
        </div>

      {audioUrl && (
        <div className="mt-6 space-y-4">
          <audio controls src={audioUrl} className="w-full">
            Your browser does not support the audio element.
          </audio>
          <a
            href={audioUrl}
            download={`${scene?.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'scene'}.wav`}
            className="w-full flex items-center justify-center gap-2 bg-green-600/20 border border-green-600 text-green-300 font-bold py-3 px-4 rounded-lg hover:bg-green-600/40 transition-colors duration-200"
          >
            <Download size={18} />
            Download WAV
          </a>
        </div>
      )}
    </div>
  );
};

export default PreviewAndExport;
