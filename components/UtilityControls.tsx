import React from 'react';
import { motion } from 'framer-motion';

interface UtilityControlsProps {
    isMuted: boolean;
    isFullscreen: boolean;
    onToggleMute: () => void;
    onToggleFullscreen: () => void;
}

const UtilityButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
    <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="p-3 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-full shadow-lg shadow-black/50 hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300"
    >
        {children}
    </motion.button>
);

const UtilityControls: React.FC<UtilityControlsProps> = ({ isMuted, isFullscreen, onToggleMute, onToggleFullscreen }) => {
    return (
        <div className="absolute bottom-4 right-4 z-20 flex gap-4">
            <UtilityButton onClick={onToggleMute}>
                {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l-4-4m0 4l4-4" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                )}
            </UtilityButton>
            <UtilityButton onClick={onToggleFullscreen}>
                {isFullscreen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1v4m0 0h-4m4 0l-5-5M4 16v4m0 0h4m-4 0l5-5m11 1v-4m0 0h-4m4 0l-5 5" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m7 7l5 5m0 0v-4m0 4h-4" />
                    </svg>
                )}
            </UtilityButton>
        </div>
    );
};

export default UtilityControls;