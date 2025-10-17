import React from 'react';
import { motion } from 'framer-motion';

interface TitleProps {
    initialDuration: number;
    secondsRemaining: number;
}

const title = "ENCRYPTED TRUTH";
const chars = title.split('');

const Title: React.FC<TitleProps> = ({ initialDuration, secondsRemaining }) => {
    const progress = initialDuration > 0 ? 1 - (secondsRemaining / initialDuration) : 0;
    
    return (
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[0.3em] uppercase" aria-label={title}>
            {chars.map((char, index) => {
                const revealStartPoint = index / chars.length;
                const revealWindow = 0.1;

                let intensity = 0;
                if (progress >= revealStartPoint) {
                    intensity = Math.min(1, (progress - revealStartPoint) / revealWindow);
                }
                
                return (
                    <motion.span
                        key={index}
                        animate={{
                            opacity: intensity,
                            // Keyframe array creates a gentle pulsing effect for the glow
                            textShadow: [
                                `0 0 ${intensity * 15}px rgba(239, 68, 68, ${intensity * 0.7})`,
                                `0 0 ${intensity * 22}px rgba(239, 68, 68, ${intensity * 0.9})`,
                                `0 0 ${intensity * 15}px rgba(239, 68, 68, ${intensity * 0.7})`,
                            ],
                            y: (1 - intensity) * 10,
                        }}
                        transition={{
                            // Transitions for the initial reveal
                            opacity: { duration: 0.4, ease: "easeOut" },
                            y: { duration: 0.4, ease: "easeOut" },
                            // Looping transition for the pulsing glow
                            textShadow: {
                                duration: 2.5, // Duration of one pulse cycle
                                repeat: Infinity,
                                ease: "easeInOut",
                            },
                        }}
                        className="inline-block text-red-500"
                        style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                    >
                        {char}
                    </motion.span>
                );
            })}
        </h1>
    );
};

export default Title;