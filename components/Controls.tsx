import React from 'react';
import { motion } from 'framer-motion';

interface ControlsProps {
    isActive: boolean;
    isPaused: boolean;
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
    onReset: () => void;
}

const GlassButton = ({ children, onClick, className = '' }: { children: React.ReactNode; onClick: () => void; className?: string }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`px-6 py-3 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-lg shadow-lg shadow-black/50 hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 text-lg ${className}`}
    >
        {children}
    </motion.button>
);

const Controls: React.FC<ControlsProps> = ({ isActive, isPaused, onStart, onPause, onResume, onReset }) => {
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {!isActive ? (
                <GlassButton onClick={onStart} className="bg-green-500/20 hover:bg-green-500/40 border-green-400/30">Start</GlassButton>
            ) : isPaused ? (
                <GlassButton onClick={onResume} className="bg-yellow-500/20 hover:bg-yellow-500/40 border-yellow-400/30">Resume</GlassButton>
            ) : (
                <GlassButton onClick={onPause} className="bg-orange-500/20 hover:bg-orange-500/40 border-orange-400/30">Pause</GlassButton>
            )}
            <GlassButton onClick={onReset} className="bg-red-500/20 hover:bg-red-500/40 border-red-400/30">Reset</GlassButton>
        </div>
    );
};

export default Controls;