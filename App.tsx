import React, { useState, useEffect, useCallback } from 'react';
import { useCountdown } from './hooks/useCountdown';
import { useAudio } from './hooks/useAudio';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import SetTimeModal from './components/SetTimeModal';
import UtilityControls from './components/UtilityControls';
import Title from './components/Title';
import { motion } from 'framer-motion';

const App: React.FC = () => {
    const [initialDuration, setInitialDuration] = useState(60); // Default 1 minute
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const { playTick, playAlarm, playSuccess, startAmbient, stopAmbient } = useAudio(isMuted);
    const { time, isActive, isPaused, start, pause, resume, reset } = useCountdown(initialDuration);

    useEffect(() => {
        if (isActive && !isPaused && time.total > 0) {
            playTick();
        }
        if (time.total === 0 && isActive) {
            playAlarm();
        }
    }, [time.seconds, isActive, isPaused, playTick, playAlarm, time.total]);
    
    useEffect(() => {
        // Start ambient sound only after the user has interacted and closed the modal.
        if (!isModalOpen) {
            startAmbient();
        }
        // Cleanup function to stop the sound when the component unmounts.
        return () => {
            stopAmbient();
        };
    }, [isModalOpen, startAmbient, stopAmbient]);

    const handleSetTime = (totalSeconds: number) => {
        setInitialDuration(totalSeconds);
        reset(totalSeconds);
        setIsModalOpen(false);
        playSuccess();
    };

    const handleReset = () => {
        reset(initialDuration);
    };

    const handleToggleMute = () => {
        setIsMuted(prev => !prev);
    };

    const handleToggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().then(() => setIsFullscreen(false));
            }
        }
    }, []);
    
    useEffect(() => {
        const onFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    }, []);


    return (
        <main className="relative h-screen w-screen text-white overflow-hidden font-mono flex flex-col items-center justify-center p-4">
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center -z-10"
                style={{ backgroundImage: `url('https://i.postimg.cc/mkNJszgY/image.png')` }}
            ></div>
            <div className="absolute inset-0 bg-black/50 -z-10"></div>
            
            {/* Logo Placeholders */}
            <div className="absolute top-4 left-4 h-20 w-20 z-20">
                <img src="https://i.postimg.cc/Xq53Cytg/image.png" alt="Top Left Logo" className="w-full h-full object-contain"/>
            </div>
            <div className="absolute top-4 right-4 h-20 w-20 z-20">
                 <img src="https://i.postimg.cc/MGfsxbB9/logo-jain-white.png" alt="Top Right Logo" className="w-full h-full object-contain"/>
            </div>

            <SetTimeModal
                isOpen={isModalOpen}
                onClose={() => initialDuration > 0 && setIsModalOpen(false)}
                onSetTime={handleSetTime}
            />

            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Title initialDuration={initialDuration} secondsRemaining={time.total} />
                </motion.div>

                <div className="my-8 md:my-12">
                    <TimerDisplay hours={time.hours} minutes={time.minutes} seconds={time.seconds} isFinished={time.total === 0} />
                </div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
                    <Controls
                        isActive={isActive}
                        isPaused={isPaused}
                        onStart={() => start()}
                        onPause={() => pause()}
                        onResume={() => resume()}
                        onReset={handleReset}
                    />
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-3 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-lg shadow-lg shadow-black/50 hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 text-lg"
                    >
                        Set Time
                    </button>
                </motion.div>
            </div>
            
            <UtilityControls 
                isMuted={isMuted}
                isFullscreen={isFullscreen}
                onToggleMute={handleToggleMute}
                onToggleFullscreen={handleToggleFullscreen}
            />
        </main>
    );
};

export default App;