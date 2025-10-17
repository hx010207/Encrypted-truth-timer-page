import { useRef, useCallback, useEffect } from 'react';

export const useAudio = (isMuted: boolean) => {
    const audioContextRef = useRef<AudioContext | null>(null);
    const masterGainRef = useRef<GainNode | null>(null);
    const ambientSourceRef = useRef<{
        noise: AudioBufferSourceNode;
        hum: OscillatorNode;
    } | null>(null);

    const getContext = useCallback(() => {
        if (!audioContextRef.current) {
            try {
                const context = new (window.AudioContext || (window as any).webkitAudioContext)();
                audioContextRef.current = context;
                masterGainRef.current = context.createGain();
                masterGainRef.current.connect(context.destination);
            } catch (e) {
                console.error("Web Audio API is not supported in this browser");
            }
        }
        return audioContextRef.current;
    }, []);
    
    useEffect(() => {
        const gainNode = masterGainRef.current;
        if (gainNode) {
            gainNode.gain.setValueAtTime(isMuted ? 0 : 1, gainNode.context.currentTime);
        }
    }, [isMuted]);

    const playSound = useCallback((type: 'tick' | 'alarm' | 'success') => {
        const context = getContext();
        const masterGain = masterGainRef.current;
        if (!context || !masterGain) return;

        if (context.state === 'suspended') {
            context.resume();
        }

        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(masterGain);

        const now = context.currentTime;

        if (type === 'tick') {
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(150, now);
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            oscillator.start(now);
            oscillator.stop(now + 0.1);
        } else if (type === 'alarm') {
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(800, now);
            gainNode.gain.setValueAtTime(0.2, now);
            oscillator.frequency.setValueAtTime(600, now + 0.1);
            oscillator.frequency.setValueAtTime(800, now + 0.2);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
            oscillator.start(now);
            oscillator.stop(now + 0.5);
        } else if (type === 'success') {
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, now);
            oscillator.frequency.linearRampToValueAtTime(880, now + 0.2);
            gainNode.gain.setValueAtTime(0.15, now);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            oscillator.start(now);
            oscillator.stop(now + 0.3);
        }
    }, [getContext]);

    const stopAmbient = useCallback(() => {
        if (ambientSourceRef.current) {
            ambientSourceRef.current.noise.stop();
            ambientSourceRef.current.hum.stop();
            ambientSourceRef.current = null;
        }
    }, []);

    const startAmbient = useCallback(() => {
        if (ambientSourceRef.current) return;

        const context = getContext();
        const masterGain = masterGainRef.current;
        if (!context || !masterGain) return;
        
        if (context.state === 'suspended') {
            context.resume();
        }

        // Create a low hum
        const hum = context.createOscillator();
        hum.type = 'sine';
        hum.frequency.setValueAtTime(40, context.currentTime);

        // Create brown noise for texture
        const bufferSize = 2 * context.sampleRate;
        const noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5; // (roughly) compensate for gain
        }
        const noise = context.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;

        // Filter the noise to make it less harsh
        const filter = context.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(150, context.currentTime);
        noise.connect(filter);

        // Control volume of ambient sounds
        const ambientGain = context.createGain();
        ambientGain.gain.setValueAtTime(0.03, context.currentTime);
        hum.connect(ambientGain);
        filter.connect(ambientGain);
        ambientGain.connect(masterGain);

        hum.start();
        noise.start();

        ambientSourceRef.current = { noise, hum };
    }, [getContext, stopAmbient]);
    
    return {
        playTick: useCallback(() => playSound('tick'), [playSound]),
        playAlarm: useCallback(() => playSound('alarm'), [playSound]),
        playSuccess: useCallback(() => playSound('success'), [playSound]),
        startAmbient,
        stopAmbient
    };
};