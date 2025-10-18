import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ControlsProps {
    isActive: boolean;
    isPaused: boolean;
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
    onReset: () => void;
    areControlsVisible: boolean;
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

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
};

const Controls: React.FC<ControlsProps> = ({ isActive, isPaused, onStart, onPause, onResume, onReset, areControlsVisible }) => {
    return (
        <div className="flex flex-wrap justify-center gap-4">
            <AnimatePresence>
                {!isActive && areControlsVisible && (
                    <motion.div key="start" variants={buttonVariants} initial="hidden" animate="visible" exit="hidden">
                        {/* FIX: Added "Start" text as a child to the GlassButton component. */}
                        <GlassButton onClick={onStart} className="bg-green-500/20 hover:bg-green-500/40 border-green-400/30">Start</GlassButton>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <AnimatePresence>
                {isActive && areControlsVisible && (
                    <motion.div key="pause-resume" variants={buttonVariants} initial="hidden" animate="visible" exit="hidden">
                        {isPaused ? (
                            // FIX: Added "Resume" text as a child to the GlassButton component.
                            <GlassButton onClick={onResume} className="bg-yellow-500/20 hover:bg-yellow-500/40 border-yellow-400/30">Resume</GlassButton>
                        ) : (
                            // FIX: Added "Pause" text as a child to the GlassButton component.
                            <GlassButton onClick={onPause} className="bg-orange-500/20 hover:bg-orange-500/40 border-orange-400/30">Pause</GlassButton>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {areControlsVisible && (
                    <motion.div key="reset" variants={buttonVariants} initial="hidden" animate="visible" exit="hidden">
                        {/* FIX: Added "Reset" text as a child to the GlassButton component. */}
                        <GlassButton onClick={onReset} className="bg-red-500/20 hover:bg-red-500/40 border-red-400/30">Reset</GlassButton>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Controls;