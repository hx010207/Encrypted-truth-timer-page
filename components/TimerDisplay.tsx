import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimerDisplayProps {
    hours: number;
    minutes: number;
    seconds: number;
    isFinished: boolean;
}

const formatTime = (time: number) => time.toString().padStart(2, '0');

const TimerDisplay: React.FC<TimerDisplayProps> = ({ hours, minutes, seconds, isFinished }) => {
    const baseTextStyle = `text-red-500`;
    
    return (
        <div className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-widest">
            <AnimatePresence mode="wait">
                {!isFinished ? (
                    <motion.div
                        key="timer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            textShadow: [
                                '0 0 8px rgba(239, 68, 68, 0.8), 0 0 20px rgba(239, 68, 68, 0.6)',
                                '0 0 12px rgba(239, 68, 68, 1), 0 0 30px rgba(239, 68, 68, 0.8)',
                                '0 0 8px rgba(239, 68, 68, 0.8), 0 0 20px rgba(239, 68, 68, 0.6)',
                            ]
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                            opacity: { duration: 0.5 },
                            scale: { duration: 0.5 },
                            textShadow: {
                                duration: 2.2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        className={baseTextStyle}
                    >
                        <span>{formatTime(hours)}</span>:
                        <span>{formatTime(minutes)}</span>:
                        <span>{formatTime(seconds)}</span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="finished"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: [1, 1.05, 1],
                        }}
                        transition={{ 
                            duration: 0.5,
                            scale: {
                                repeat: Infinity,
                                duration: 1.5,
                                ease: "easeInOut"
                            }
                        }}
                        className={`text-4xl md:text-6xl lg:text-7xl text-center uppercase ${baseTextStyle} text-shadow-glow`}
                    >
                        TIME'S UP!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TimerDisplay;