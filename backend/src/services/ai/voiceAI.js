import { openai } from "../../config/aiConfig.js";

class VoiceAI {
  /**
   * Future Architecture Stub: Text-to-Speech (TTS)
   * Converts a wellness meditation script into an audio buffer.
   */
  async generateSpeech(text, voice = "nova") {
    // Has key check
    const hasKey = process.env.OPENAI_API_KEY && 
                   process.env.OPENAI_API_KEY.trim() !== "" && 
                   !process.env.OPENAI_API_KEY.startsWith("YOUR_");

    if (hasKey) {
      try {
        const mp3 = await openai.audio.speech.create({
          model: "tts-1",
          voice: voice,
          input: text,
        });
        const buffer = Buffer.from(await mp3.arrayBuffer());
        return buffer;
      } catch (error) {
        console.error("Voice AI TTS Error:", error);
      }
    }
    
    // Fallback stub
    console.warn("Returning empty buffer for Voice AI stub");
    return Buffer.alloc(0);
  }

  /**
   * Future Architecture Stub: Speech-to-Text (Whisper)
   * Converts audio stream into text for hands-free AI Coach interaction.
   */
  async transcribeAudio(audioStream) {
    // Has key check
    const hasKey = process.env.OPENAI_API_KEY && 
                   process.env.OPENAI_API_KEY.trim() !== "" && 
                   !process.env.OPENAI_API_KEY.startsWith("YOUR_");

    if (hasKey) {
      try {
        const transcription = await openai.audio.transcriptions.create({
          file: audioStream,
          model: "whisper-1",
        });
        return transcription.text;
      } catch (error) {
        console.error("Voice AI STT Error:", error);
      }
    }

    return "Audio transcription fallback";
  }
}

export default new VoiceAI();
