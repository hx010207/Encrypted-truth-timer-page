import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface SetTimeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSetTime: (totalSeconds: number) => void;
}

const SetTimeModal: React.FC<SetTimeModalProps> = ({ isOpen, onClose, onSetTime }) => {
    const [time, setTime] = useState({ hours: 0, minutes: 1, seconds: 0 });

    const handleInputChange = (unit: 'hours' | 'minutes' | 'seconds', value: string) => {
        const numValue = Math.max(0, parseInt(value, 10) || 0);
        setTime(prev => ({ ...prev, [unit]: numValue }));
    };

    const handleSubmit = () => {
        const totalSeconds = (time.hours * 3600) + (time.minutes * 60) + time.seconds;
        if (totalSeconds > 0) {
            onSetTime(totalSeconds);
        }
    };

    const backdropVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8, y: "-50%" },
        visible: { opacity: 1, scale: 1, y: "-50%", transition: { type: "spring", stiffness: 300, damping: 30 } },
        exit: { opacity: 0, scale: 0.8, y: "-40%" }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    onClick={onClose}
                >
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="bg-black/20 backdrop-blur-2xl border-2 border-white/20 p-8 rounded-xl shadow-2xl shadow-black/60 w-full max-w-md text-center"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-3xl font-bold mb-6 text-red-400 text-shadow-glow">Set Countdown</h2>
                        <div className="flex justify-center items-end gap-4">
                            <div className="flex flex-col items-center">
                                <label htmlFor="hours" className="text-sm uppercase tracking-widest mb-1 font-semibold">Hours</label>
                                <input id="hours" type="number" value={time.hours} onChange={(e) => handleInputChange('hours', e.target.value)} className="bg-white/10 border-2 border-white/20 rounded-md p-3 text-center text-2xl w-24 focus:outline-none focus:ring-2 focus:ring-red-500" autoFocus/>
                            </div>
                             <div className="flex flex-col items-center">
                                <label htmlFor="minutes" className="text-sm uppercase tracking-widest mb-1 font-semibold">Minutes</label>
                                <input id="minutes" type="number" value={time.minutes} onChange={(e) => handleInputChange('minutes', e.target.value)} className="bg-white/10 border-2 border-white/20 rounded-md p-3 text-center text-2xl w-24 focus:outline-none focus:ring-2 focus:ring-red-500"/>
                            </div>
                             <div className="flex flex-col items-center">
                                <label htmlFor="seconds" className="text-sm uppercase tracking-widest mb-1 font-semibold">Seconds</label>
                                <input id="seconds" type="number" value={time.seconds} onChange={(e) => handleInputChange('seconds', e.target.value)} className="bg-white/10 border-2 border-white/20 rounded-md p-3 text-center text-2xl w-24 focus:outline-none focus:ring-2 focus:ring-red-500"/>
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="w-full mt-8 px-6 py-3 bg-red-600/50 hover:bg-red-600/70 border-2 border-red-400/50 rounded-lg shadow-lg transition-colors duration-300 text-xl font-bold"
                        >
                            Set & Begin
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SetTimeModal;