
export function pcmToWav(pcmBuffer: ArrayBuffer, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Blob {
    const bytesPerSample = bitsPerSample / 8;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = pcmBuffer.byteLength;

    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    // RIFF header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeString(view, 8, 'WAVE');

    // fmt chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // Subchunk1Size
    view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);

    // data chunk
    writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);

    // Write PCM data
    const pcm = new Uint8Array(pcmBuffer);
    const data = new Uint8Array(buffer, 44);
    data.set(pcm);

    return new Blob([view], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

/**
 * Generates a PCM buffer for a sine wave.
 * @param durationSeconds The duration of the wave.
 * @param frequency The frequency of the wave in Hz.
 * @param sampleRate The sample rate of the audio.
 * @returns An ArrayBuffer containing the raw 16-bit PCM data.
 */
export function generateSineWave(durationSeconds: number, frequency = 440, sampleRate = 24000): ArrayBuffer {
    const numSamples = Math.floor(durationSeconds * sampleRate);
    const buffer = new ArrayBuffer(numSamples * 2); // 16-bit samples (2 bytes)
    const view = new DataView(buffer);
    const angularFrequency = 2 * Math.PI * frequency / sampleRate;

    for (let i = 0; i < numSamples; i++) {
        const sampleValue = Math.sin(i * angularFrequency);
        // Write 16-bit signed integer
        view.setInt16(i * 2, sampleValue * 32767, true);
    }
    return buffer;
}
